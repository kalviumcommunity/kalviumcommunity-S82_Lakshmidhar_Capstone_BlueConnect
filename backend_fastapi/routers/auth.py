from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from models.user import UserCreate, UserResponse, UserInDB
from utils.auth import get_password_hash, verify_password, create_access_token
from config.database import get_db
from dependencies import get_current_active_user
from bson import ObjectId

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str
    extraFields: Optional[dict] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup", response_model=dict)
async def signup(user_data: SignupRequest):
    db = get_db()
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )
    
    # Create user dict
    user_dict = {
        "name": user_data.name,
        "email": user_data.email,
        "role": user_data.role,
        "password": get_password_hash(user_data.password),
        "company": None,
        "skills": []
    }

    # Handle extraFields
    if user_data.role == "worker" and user_data.extraFields and "skills" in user_data.extraFields:
         # skills can be list of strings or list of objects with value? Frontend sends list of {value: string} based on original code
         # "skills": extraFields.skills.map((s) => s.value || s);
         raw_skills = user_data.extraFields["skills"]
         if isinstance(raw_skills, list):
             user_dict["skills"] = [s.get("value", s) if isinstance(s, dict) else s for s in raw_skills]

    if user_data.role == "user" and user_data.extraFields and "company" in user_data.extraFields:
        user_dict["company"] = user_data.extraFields["company"]
    
    # Insert into DB
    result = await db.users.insert_one(user_dict)
    
    # Create token
    access_token = create_access_token(data={"id": str(result.inserted_id)})
    
    return {
        "_id": str(result.inserted_id),
        "name": user_dict["name"],
        "email": user_dict["email"],
        "role": user_dict["role"],
        "token": access_token
    }

@router.post("/login", response_model=dict)
async def login(login_data: LoginRequest):
    email = login_data.email
    password = login_data.password
    
    db = get_db()
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    if not verify_password(password, user["password"]):
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    access_token = create_access_token(data={"id": str(user["_id"])})
    
    return {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "token": access_token
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return current_user
