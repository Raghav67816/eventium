from utils import db
from bson.objectid import ObjectId
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Request, HTTPException

items_router = APIRouter(prefix='/items')
p_cursor = db.get_collection("participants")

@items_router.post("/issued")
async def get_items(request: Request):
    json = await request.json()
    if not json['_id']:
        raise HTTPException(400, detail="_id is required")
    
    try:
        issued_items = p_cursor.find_one({"_id": ObjectId(json['_id'])}, {"_id": 0, "items": 1})
        return JSONResponse(content=issued_items['items'])

    except Exception as e:
        print(str(e))
        raise HTTPException(500, detail='unexpected error')
    
@items_router.post("/issue")
async def issue_item(request: Request):
    data = await request.json()

    if not data['items'] and not data['_id']:
        raise HTTPException(400, detail="_id and item_name is required")
    
    try:
        print(f"items to add: {data.get("items")}")
        p_cursor.update_one({'_id': ObjectId(data['_id'])}, {"$addToSet": {"items": {"$each": data['items']}}})
        return JSONResponse(content="success")

    except Exception as e:
        print(str(e))
        raise HTTPException(500, detail='unexpected error')
