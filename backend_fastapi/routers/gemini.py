import os
import google.generativeai as genai
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import asyncio
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

router = APIRouter(
    prefix="/api/google",
    tags=["Gemini"]
)

class AutocompleteRequest(BaseModel):
    prompt: str

async def generate_content_with_retry(prompt: str, retries: int = 3, delay: int = 58):
    for i in range(retries):
        try:
            response = await model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            if "429" in str(e): # Rate limit
                wait_time = delay * (2 ** i)
                print(f"Rate limit exceeded, retrying in {wait_time} seconds...")
                await asyncio.sleep(wait_time)
            else:
                raise e
    raise HTTPException(status_code=429, detail="Gemini API Rate Limit Exceeded after retries")

@router.post("/autocomplete")
async def autocomplete(req: AutocompleteRequest):
    try:
        text = await generate_content_with_retry(req.prompt)
        return {"suggestion": text.strip()}
    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail="Gemini API Error")
