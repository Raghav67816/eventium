from fastapi import FastAPI
from fastapi.responses import JSONResponse
from auth_router import auth_router
from items_router import items_router
from events_router import events_router

app = FastAPI()

@app.get("/")
def home():
    return JSONResponse(status_code=200, content={})

app.include_router(auth_router)
app.include_router(events_router)
app.include_router(items_router)
