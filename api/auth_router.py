import requests
from os import getenv
from typing import Annotated
from os import getenv
from dotenv import load_dotenv
from supabase import Client, create_client

from fastapi.responses import JSONResponse
from fastapi import APIRouter, Request
from fastapi.exceptions import HTTPException


auth_router = APIRouter(prefix="/auth")

load_dotenv("./config.env")
url = getenv("URL")
key = getenv("API_KEY")

s_client: Client = create_client(url, key)


@auth_router.post("/get-magic-link")
async def get_magic_link(request: Request):
    data = await request.json()
    email = data['email']
    if not email:
        return HTTPException(
            status_code=401, detail="email required"
        )
    else:
        s_client.auth.sign_in_with_otp({"email": email})
        return JSONResponse(
            status_code=200, content={'msg': 'sent'}
        )
    
@auth_router.post("/verify-otp")
async def verify_otp(request: Request):
    req = await request.json()
    res = s_client.auth.verify_otp(params={
        "email": req['email'],
        "token": req['token'],
        "type": "email"
    })

    if res:
        return JSONResponse(
            status_code=200, content={
                "msg": "success",
                "access_token": str(res.session.access_token)
            }
        )

    else:
        return JSONResponse(
            status_code=200, content={
                "msg": "failed"
            }
        )