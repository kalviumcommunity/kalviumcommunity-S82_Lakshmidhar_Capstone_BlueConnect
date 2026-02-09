from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import connect_db, close_db
from dotenv import load_dotenv
from routers import auth, worker, job, gemini
import os

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(worker.router)
app.include_router(job.router)
app.include_router(gemini.router)

@app.on_event("startup")
async def startup_db_client():
    await connect_db()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_db()

@app.get("/")
async def root():
    return {"message": "API is running..."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
