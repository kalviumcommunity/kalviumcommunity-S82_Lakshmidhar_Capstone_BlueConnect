from pydantic import BaseModel, Field
from typing import Optional, List
from .utils import PyObjectId
from bson import ObjectId

class WorkerProfileBase(BaseModel):
    user_id: PyObjectId = Field(alias="userId")
    skills: List[str] = []
    experience: str
    company: Optional[str] = None
    hourly_rate: float = Field(alias="hourlyRate")

class WorkerProfileCreate(WorkerProfileBase):
    pass

class WorkerProfileInDB(WorkerProfileBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class WorkerProfileResponse(WorkerProfileBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
