from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from .user import User

class JobRequestBase(SQLModel):
    title: str
    description: str
    location: str
    status: str = Field(default="pending") # 'pending', 'accepted', 'completed', 'cancelled'
    requirements: Optional[str] = None
    budget: Optional[float] = 0.0

class JobRequest(JobRequestBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    requester_id: int = Field(foreign_key="user.id")
    worker_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    requester: User = Relationship(back_populates="job_requests", sa_relationship_kwargs={"foreign_keys": "JobRequest.requester_id"})

class JobRequestCreate(JobRequestBase):
    pass

class JobRequestResponse(JobRequestBase):
    id: int
    requester_id: int
    worker_id: Optional[int]
    created_at: datetime
