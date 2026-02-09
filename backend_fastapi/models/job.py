from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from .utils import PyObjectId
from bson import ObjectId

class Applicant(BaseModel):
    user: Optional[PyObjectId] = Field(default=None) # user_id
    bid_amount: Optional[float] = Field(alias="bidAmount", default=None)
    cover_letter: Optional[str] = Field(alias="coverLetter", default=None)
    applied_at: datetime = Field(alias="appliedAt", default_factory=datetime.now)

class JobBase(BaseModel):
    user: PyObjectId # user_id
    title: str
    company: Optional[str] = None
    location: str
    salary: Optional[str] = None
    job_type: Optional[str] = Field(alias="jobType", default=None) # enum: ['Full-Time', 'Part-Time', 'Internship', 'Freelance']
    description: str
    requirements: Optional[str] = None
    contact_email: Optional[str] = Field(alias="contactEmail", default=None)
    category: Optional[str] = None
    budget: Optional[float] = None
    posted_date: datetime = Field(alias="postedDate", default_factory=datetime.now)
    deadline: Optional[datetime] = None
    applicants: List[Applicant] = []

class JobCreate(JobBase):
    pass

class JobInDB(JobBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class JobResponse(JobBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
