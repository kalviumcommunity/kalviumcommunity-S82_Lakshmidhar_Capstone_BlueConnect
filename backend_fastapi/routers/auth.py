from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from sqlmodel import Session, select
from models.user import User, UserCreate, UserResponse
from models.worker import WorkerProfile, WorkerProfileCreate
from utils.auth import get_password_hash, verify_password, create_access_token
from config.database import get_session
from dependencies import get_current_active_user

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str # 'user', 'worker'
    extraFields: Optional[dict] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup", response_model=dict)
def signup(user_data: SignupRequest, session: Session = Depends(get_session)):
    # Check if user exists
    statement = select(User).where(User.email == user_data.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )
    
    # Create user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        role=user_data.role,
        password=get_password_hash(user_data.password)
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Handle WorkerProfile if role is worker
    if user_data.role == "worker":
        skills = []
        if user_data.extraFields and "skills" in user_data.extraFields:
            raw_skills = user_data.extraFields["skills"]
            if isinstance(raw_skills, list):
                skills = [s.get("value", s) if isinstance(s, dict) else s for s in raw_skills]
        
        worker_profile = WorkerProfile(
            user_id=new_user.id,
            profession=", ".join(skills) if skills else "General Laborer",
            location=user_data.extraFields.get("location", "Not specified") if user_data.extraFields else "Not specified",
            contact=new_user.email # Default for now
        )
        session.add(worker_profile)
        session.commit()
    
    # Create token
    access_token = create_access_token(data={"id": str(new_user.id)})
    
    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role,
        "token": access_token
    }

@router.post("/login", response_model=dict)
def login(login_data: LoginRequest, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == login_data.email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    if not verify_password(login_data.password, user.password):
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    access_token = create_access_token(data={"id": str(user.id)})
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "token": access_token
    }

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
