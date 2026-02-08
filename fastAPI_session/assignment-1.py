from fastapi import FastAPI

app= FastAPI()

@app.get("/")
def fixed():
    return {
            "message":"Evolve AI"
            }
