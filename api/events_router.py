from client import s_client
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse

events_router = APIRouter(prefix="/event")
valid_fields = [
    'organisers',
    'participants',
    'current_participants',
    'venue',
    'country_city',
    'max_participants'
]

@events_router.post("/my-events")
async def get_my_events(request: Request):
    data = await request.json()
    events = s_client.table("events").select("*").contains(
        "organisers", [data['email']]
    ).execute()
    if events:
        return JSONResponse(
            status_code=200, content={
                "msg": "success",
                "events": events.data
            }
        )
   
@events_router.post("/query/general")
async def general_query(request: Request):
    data = await request.json()
    if data['field'] in valid_fields:
        query = s_client.table("events").select(data['field']).eq("id", data['id']).maybe_single().execute()
        if query:
            return JSONResponse(
                status_code=200,
                content={
                    "msg": "success",
                    "data": query.data                    
                }
            )
        
    else:
        raise HTTPException(400, detail="not a valid field")
    