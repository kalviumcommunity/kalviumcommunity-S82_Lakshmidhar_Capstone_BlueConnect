from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from .user import User

class WorkerProfileBase(SQLModel):
    profession: str
    location: str
    bio: Optional[str] = None
    contact: str
    experience_years: Optional[int] = 0

class WorkerProfile(WorkerProfileBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    
    user: User = Relationship(back_populates="worker_profile")

class WorkerProfileCreate(WorkerProfileBase):
    user_id: int

class WorkerProfileResponse(WorkerProfileBase):
    id: int
    user_id: int
