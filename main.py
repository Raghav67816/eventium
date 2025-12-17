from fastapi import FastAPI
from auth_router import auth_router
from events_router import events_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(events_router)
