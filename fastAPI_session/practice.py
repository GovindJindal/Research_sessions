from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message":"Hello Backend"}

@app.get("/")
async def root():
    return {"message":"Hello Backend"}

@app.get("/evolve")
async def root():
    return {"message":"Evolve AI"}

@app.get("/")
async def root():
    return {"message":"G"}

@app. get ("/greet/{name}")
async def greet (name: str):
    return {"message": f"Hello {name}!"}