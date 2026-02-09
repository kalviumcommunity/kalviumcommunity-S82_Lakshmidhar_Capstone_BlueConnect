from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from .utils import PyObjectId
from bson import ObjectId

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str = Field(..., pattern="^(user|worker)$") # enum: ['user', 'worker']
    company: Optional[str] = None
    skills: List[str] = []

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UserResponse(UserBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
