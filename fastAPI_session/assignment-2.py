from fastapi import FastAPI, Query, HTTPException

app= FastAPI()

@app.get("/")
def hello():
    return {"Welcome to Calculator"}

@app.get("/calculate")
def calculate(a:int =Query(...,description="Enter the first number"), b:int =Query(...,description="Enter the second number"),
operation:str = Query('add' , description="Choose operation from add/ subtract/ divide/ multiply ")):
    
    operators= ['add', 'subtract', 'divide', 'multiply']

    if operation in operators:
        if operation=='add':
            result= a+b
        elif operation=='subtract':
            result= a-b
        elif operation== 'divide':
            result= a/b
        elif operation== 'multiply':
            result= a*b
    else:
        raise HTTPException(status_code=400, detail="Wrong Operation Entered")
    
    return {
        'a':a,
        'b':b,
        'operation':operation,
        'result':result
        }

    