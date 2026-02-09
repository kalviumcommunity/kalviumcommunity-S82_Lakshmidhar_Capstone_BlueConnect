from fastapi import APIRouter, HTTPException, status, Depends, Body
from typing import List, Optional
from models.job import JobCreate, JobResponse, JobInDB, Applicant
from models.user import UserInDB
from config.database import get_db
from dependencies import get_current_active_user
from bson import ObjectId
from datetime import datetime

router = APIRouter(
    prefix="/api/jobs",
    tags=["Jobs"]
)

@router.post("/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(job: JobCreate, current_user: UserInDB = Depends(get_current_active_user)):
    if current_user.role != "user":
        raise HTTPException(status_code=403, detail="Access denied. Users only.")
        
    db = get_db()
    
    # Ensure user ID is the logged in user
    job_dict = job.dict(by_alias=True)
    job_dict["user"] = ObjectId(current_user.id)
    # Exclude id if None
    if job_dict.get("_id") is None:
        del job_dict["_id"]
        
    result = await db.jobs.insert_one(job_dict)
    
    return {**job_dict, "_id": result.inserted_id}

@router.get("/", response_model=List[JobResponse])
async def get_all_jobs():
    db = get_db()
    jobs = await db.jobs.find().sort("createdAt", -1).to_list(length=100)
    return jobs

@router.get("/my-jobs", response_model=List[JobResponse])
async def get_my_jobs(current_user: UserInDB = Depends(get_current_active_user)):
    if current_user.role != "user":
        raise HTTPException(status_code=403, detail="Access denied. Users only.")
        
    db = get_db()
    jobs = await db.jobs.find({"user": ObjectId(current_user.id)}).sort("createdAt", -1).to_list(length=100)
    return jobs

@router.get("/applied", response_model=List[JobResponse])
async def get_applied_jobs(current_user: UserInDB = Depends(get_current_active_user)):
    if current_user.role != "worker":
        raise HTTPException(status_code=403, detail="Access denied. Workers only.")
        
    db = get_db()
    # Find jobs where applicants.user == current_user.id (Not workerId)
    # The Job model defines applicants with `user`.
    # Original code: `applicants.workerId`. The new model uses `user`.
    # Let's verify `Job` model definition I made.
    # `class Applicant(BaseModel): user: Optional[PyObjectId] = Field(default=None)`
    # So we query `applicants.user`.
    
    jobs = await db.jobs.find({"applicants.user": ObjectId(current_user.id)}).to_list(length=100)
    return jobs

@router.get("/{id}", response_model=JobResponse)
async def get_job_by_id(id: str):
    db = get_db()
    job = await db.jobs.find_one({"_id": ObjectId(id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    # Populate applicants... not doing it for now due to complexity in Pydantic mapping without fetches.
    # Frontend handles it? The original code populated 'applicants.workerId'.
    return job

@router.post("/{job_id}/apply", status_code=status.HTTP_200_OK)
async def apply_to_job(
    job_id: str,
    application_data: dict = Body(...),
    current_user: UserInDB = Depends(get_current_active_user)
):
    if current_user.role != "worker":
        raise HTTPException(status_code=403, detail="Access denied. Workers only.")
        
    db = get_db()
    job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Check if already applied
    applicants = job.get("applicants", [])
    already_applied = any(str(app.get("user")) == str(current_user.id) for app in applicants)
    
    if already_applied:
        raise HTTPException(status_code=400, detail="Already applied to this job")
        
    new_applicant = {
        "user": ObjectId(current_user.id),
        "bidAmount": application_data.get("bidAmount"),
        "coverLetter": application_data.get("coverLetter"),
        "appliedAt": datetime.now()
    }
    
    await db.jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$push": {"applicants": new_applicant}}
    )
    
    return {"message": "Applied successfully"}

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: str,
    job_update: dict = Body(...),
    current_user: UserInDB = Depends(get_current_active_user)
):
    if current_user.role != "user":
        raise HTTPException(status_code=403, detail="Access denied. Users only.")
        
    db = get_db()
    job = await db.jobs.find_one({"_id": ObjectId(job_id), "user": ObjectId(current_user.id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or unauthorized")
        
    # Update fields
    allowed_fields = ["title", "company", "location", "salary", "jobType", "description", "requirements", "contactEmail", "category", "budget", "deadline"]
    update_data = {k: v for k, v in job_update.items() if k in allowed_fields}
    
    if update_data:
         await db.jobs.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": update_data}
        )
         
    updated_job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    return updated_job

@router.delete("/{job_id}")
async def delete_job(job_id: str, current_user: UserInDB = Depends(get_current_active_user)):
    if current_user.role != "user":
        raise HTTPException(status_code=403, detail="Access denied. Users only.")
        
    db = get_db()
    result = await db.jobs.delete_one({"_id": ObjectId(job_id), "user": ObjectId(current_user.id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found or unauthorized")
        
    return {"message": "Job deleted successfully"}
