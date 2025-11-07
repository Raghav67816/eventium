from client import s_client
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse

events_router = APIRouter(prefix="/event")

@events_router.post("/my-events")
async def get_my_events(request: Request):
    email = await request.json()
    events = s_client.table("events").select("*").contains(
        "organisers", [email]
    ).execute()
    if events:
        return JSONResponse(
            status_code=200, content={
                "msg": "success",
                "events": events
            }
        )
