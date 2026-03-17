from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class UserBase(SQLModel):
    name: str
    email: str = Field(unique=True, index=True)
    role: str = Field(default="user") # 'admin', 'worker', 'user'
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str
    
    # Relationships
    worker_profile: Optional["WorkerProfile"] = Relationship(back_populates="user")
    job_requests: List["JobRequest"] = Relationship(back_populates="requester")

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
