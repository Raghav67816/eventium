from utils import db

from fastapi.responses import JSONResponse
from fastapi import APIRouter, Request, HTTPException

events_router = APIRouter(prefix="/event")

event_cursor = db.get_collection("events")
p_cursor = db.get_collection("participants")

@events_router.post("/my-events")
async def get_events(request: Request):
    json = await request.json()
    email = json['email']

    if not email:
        raise HTTPException(status_code=400, detail="email required")

    try:
        events = event_cursor.find({"organisers.email": email}).to_list()
        
        for event in events:
            event['_id'] = str(event['_id'])
            event['startDate'] = str(event['startDate'])

        print(events)

        return JSONResponse(content=list(events))
    
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"unexpected error: {str(e)}")


@events_router.post("/get-participants")
async def get_participants(request: Request):
    json = await request.json()
    event_id = json.get('event_id')

    if not event_id:
        raise HTTPException(status_code=400, detail="event_id required")
    
    try:
        participants = p_cursor.find({'event_id': event_id}).to_list()
        
        for p in participants:
            p['_id'] = str(p['_id'])
        
        return JSONResponse(participants)

    except Exception as e:
        raise HTTPException(500, detail='unexpected error')
    