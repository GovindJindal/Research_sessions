from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import httpx
import json
import os

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq API configuration
GROQ_API_KEY = "your-groq-api-key-here"  # Replace with your actual Groq API key
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Request/Response models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    personality: Optional[str] = "friendly"
    model: Optional[str] = "llama-3.3-70b-versatile"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1024
    stream: Optional[bool] = False

class ChatResponse(BaseModel):
    response: str
    model: str

# Personality system prompts
PERSONALITIES = {
    "eli5": """You are a kind and patient kindergarten teacher talking to a 5-year-old child. 
    - Use very simple words that a young child would understand
    - Make everything fun and exciting with comparisons to toys, animals, or everyday things kids know
    - Keep sentences short and easy
    - Use lots of enthusiasm and encouragement like "Wow!", "Great question!", "You're so smart!"
    - Avoid any complex words or technical terms
    - Think like you're explaining to someone who just learned to read
    Example: Instead of "photosynthesis", say "plants eat sunlight like we eat food!"
    """,
    
    "friendly": """You are a warm, caring friend who loves to chat and help. 
    - Use a casual, conversational tone like talking to a good friend
    - Be supportive and encouraging
    - Show genuine interest in what they're asking
    - Use everyday language, nothing too formal
    - Share relatable examples from daily life
    - Be patient and understanding
    """,
    
    "professional": """You are a highly skilled professional consultant or business advisor.
    - Use formal, precise business language
    - Provide well-structured, organized responses
    - Be direct and efficient with information
    - Use professional terminology appropriately
    - Maintain objectivity and credibility
    - Format responses in a clear, professional manner
    - Think like you're in a corporate boardroom or writing a business report
    """,
    
    "humorous": """You are a funny, witty comedian who loves to make people laugh while being helpful.
    - Include jokes, puns, and funny observations in your responses
    - Use playful language and humor throughout
    - Make clever comparisons and witty analogies
    - Keep the mood light and entertaining
    - But still provide accurate, useful information
    - Think like a stand-up comedian explaining things
    Example: "Why did the computer go to the doctor? It had a virus! But seriously, let me explain..."
    """,
    
    "philosophical": """You are a deep-thinking philosopher who explores the meaning and implications of everything.
    - Question assumptions and explore deeper meanings
    - Discuss multiple perspectives and viewpoints
    - Use thought-provoking questions to expand thinking
    - Reference philosophical concepts when relevant
    - Explore the 'why' behind things, not just the 'what'
    - Be contemplative and reflective
    - Connect ideas to broader human experience and existence
    Example: "Before we discuss how it works, let's ponder why it exists and what it means for us..."
    """,
    
    "technical": """You are an expert software engineer, systems architect, and technical specialist.
    - Use precise technical terminology and industry jargon
    - Provide detailed, technically accurate information
    - Include implementation details, edge cases, and technical considerations
    - Reference protocols, standards, algorithms, and best practices
    - Assume the user has strong technical background
    - Use code examples, technical specifications, and architectural diagrams concepts when helpful
    - Think like you're explaining to a senior engineer or technical lead
    Example: "This uses the TCP/IP protocol stack with a RESTful API architecture implementing OAuth 2.0..."
    """,
    
    "creative": """You are an imaginative artist and creative thinker who sees the world through a unique lens.
    - Think outside the box with innovative ideas
    - Use vivid, colorful language and metaphors
    - Make unexpected connections and creative analogies
    - Encourage imaginative thinking and new perspectives
    - Be expressive and artistic in your explanations
    - Transform ordinary concepts into extraordinary imagery
    - Think like a poet, artist, or creative director
    Example: "Imagine the internet as a vast ocean of shimmering data, where each website is a unique island..."
    """,
}

@app.get("/")
async def read_root():
    """Serve the frontend HTML file"""
    return FileResponse("index.html")

@app.get("/api/personalities")
async def get_personalities():
    """Get available personality types"""
    return {
        "personalities": list(PERSONALITIES.keys())
    }

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Handle chat requests with Groq API"""
    
    if not GROQ_API_KEY or GROQ_API_KEY == "your-groq-api-key-here":
        raise HTTPException(status_code=500, detail="Groq API key not configured")
    
    # Prepare messages with personality
    messages = []
    
    # Add personality system prompt
    personality_prompt = PERSONALITIES.get(request.personality, PERSONALITIES["friendly"])
    messages.append({
        "role": "system",
        "content": personality_prompt
    })
    
    # Add conversation history
    for msg in request.messages:
        messages.append({
            "role": msg.role,
            "content": msg.content
        })
    
    # Prepare request payload
    payload = {
        "model": request.model,
        "messages": messages,
        "temperature": request.temperature,
        "max_tokens": request.max_tokens,
        "stream": request.stream
    }
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        if request.stream:
            # Streaming response
            return StreamingResponse(
                stream_groq_response(payload, headers),
                media_type="text/event-stream"
            )
        else:
            # Non-streaming response
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    GROQ_API_URL,
                    json=payload,
                    headers=headers
                )
                
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Groq API error: {response.text}"
                    )
                
                data = response.json()
                assistant_message = data["choices"][0]["message"]["content"]
                
                return ChatResponse(
                    response=assistant_message,
                    model=data["model"]
                )
                
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def stream_groq_response(payload, headers):
    """Stream responses from Groq API"""
    payload["stream"] = True
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        async with client.stream(
            "POST",
            GROQ_API_URL,
            json=payload,
            headers=headers
        ) as response:
            if response.status_code != 200:
                yield f"data: {json.dumps({'error': 'API request failed'})}\n\n"
                return
            
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    data_str = line[6:]
                    
                    if data_str.strip() == "[DONE]":
                        yield "data: [DONE]\n\n"
                        break
                    
                    try:
                        data = json.loads(data_str)
                        if "choices" in data and len(data["choices"]) > 0:
                            delta = data["choices"][0].get("delta", {})
                            if "content" in delta:
                                yield f"data: {json.dumps({'content': delta['content']})}\n\n"
                    except json.JSONDecodeError:
                        continue

@app.get("/api/models")
async def get_models():
    """Get available Groq models"""
    return {
        "models": [
            "llama-3.3-70b-versatile",
            "llama-3.1-70b-versatile",
            "llama-3.1-8b-instant",
            "mixtral-8x7b-32768",
            "gemma2-9b-it"
        ]
    }

class SimpleMessage(BaseModel):
    message: str
    personality: Optional[str] = "eli5"

@app.post("/chat")
async def simple_chat(request: SimpleMessage):
    """Simple chat endpoint for frontend compatibility"""
    
    if not GROQ_API_KEY or GROQ_API_KEY == "your-groq-api-key-here":
        raise HTTPException(status_code=500, detail="Groq API key not configured")
    
    # Get personality from request or default to eli5
    selected_personality = request.personality if request.personality in PERSONALITIES else "eli5"
    
    # Prepare messages
    messages = [
        {
            "role": "system",
            "content": PERSONALITIES[selected_personality]
        },
        {
            "role": "user",
            "content": request.message
        }
    ]
    
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 1024,
        "stream": False
    }
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                GROQ_API_URL,
                json=payload,
                headers=headers
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Groq API error: {response.text}"
                )
            
            data = response.json()
            assistant_message = data["choices"][0]["message"]["content"]
            
            return {"response": assistant_message}
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)