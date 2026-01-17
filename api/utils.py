from os import getenv
from dotenv import load_dotenv
from pymongo import MongoClient
from supabase import create_client, Client

load_dotenv("./config.env")
url = getenv("URL")
key = getenv("API_KEY")
host = getenv("DB_URL")

s_client: Client = create_client(url, key)
db_conn = MongoClient(host, 27017)

db = db_conn['eventium']