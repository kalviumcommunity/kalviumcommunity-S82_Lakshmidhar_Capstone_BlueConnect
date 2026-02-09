from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "blueconnect" # Assuming this is the db name, will verify later

client = None
db = None

async def connect_db():
    global client
    global db
    if not MONGO_URI:
         print("MONGO_URI is not defined in .env")
         return
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    print("MongoDB connected")

async def close_db():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")

def get_db():
    return db
