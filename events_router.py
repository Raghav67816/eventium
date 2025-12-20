from utils import db

from fastapi.responses import JSONResponse
from fastapi import APIRouter, Request, HTTPException

events_router = APIRouter(prefix="/event")

event_cursor = db.get_collection("events")
p_cursor = db.get_collection("participants")

@events_router.post("/events")
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

        return JSONResponse(content=list(events), status_code=200)
    
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"unexpected error: {str(e)}")


@events_router.post("/participants")
async def get_participants(request: Request):
    json = await request.json()
    event_id = json.get('event_id')

    if not event_id:
        raise HTTPException(status_code=400, detail="event_id required")
    
    try:
        participants = p_cursor.find({'event_id': int(event_id)}).to_list()
        print(participants)
        
        for p in participants:
            p['_id'] = str(p['_id'])

        return JSONResponse(participants)

    except Exception as e:
        print(str(e))
        raise HTTPException(500, detail='unexpected error')
    
@events_router.post("/items")
async def get_items(request: Request):
    data = await request.json()
    if not data['event_id']:
        raise HTTPException(status_code=400, detail="event_id required")

    try:
        items = event_cursor.find_one({"event_id": int(data['event_id'])}, {"_id": 0, "items": 1})

        return JSONResponse(content=items['items'])

    except Exception as e:
        print(str(e))
        raise HTTPException(500, detail='unexpected error')
    
@events_router.post("/add_items")
async def add_items(request: Request):
    data = await request.json()
    if not data['items'] and not data['event_id']:
        raise HTTPException(status_code=400, detail="event_id required")
    
    try:
        event_cursor.update_one({"event_id": data['event_id']}, {"$addToSet": {"items": data['items']}})
        return JSONResponse(content="success")

    except Exception as e:
        print(str(e))
        raise HTTPException(500, detail='unexpected error')
    