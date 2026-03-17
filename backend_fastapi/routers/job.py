from fastapi import APIRouter, HTTPException, status, Depends
from sqlmodel import Session, select, col
from typing import List, Optional
from models.user import User
from models.job import JobRequest, JobRequestCreate, JobRequestResponse
from config.database import get_session
from dependencies import get_current_active_user, role_required

router = APIRouter(
    prefix="/api/jobs",
    tags=["Jobs"]
)

@router.post("/", response_model=JobRequestResponse)
def create_job(
    job_data: JobRequestCreate,
    current_user: User = Depends(role_required(["user"])),
    session: Session = Depends(get_session)
):
    new_job = JobRequest(
        **job_data.model_dump(),
        requester_id=current_user.id
    )
    session.add(new_job)
    session.commit()
    session.refresh(new_job)
    return new_job

@router.get("/", response_model=List[JobRequestResponse])
def get_jobs(session: Session = Depends(get_session)):
    statement = select(JobRequest)
    results = session.exec(statement).all()
    return results

@router.get("/my-requests", response_model=List[JobRequestResponse])
def get_my_requests(
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    statement = select(JobRequest).where(JobRequest.requester_id == current_user.id)
    return session.exec(statement).all()

@router.put("/{job_id}/accept")
def accept_job(
    job_id: int,
    current_user: User = Depends(role_required(["worker"])),
    session: Session = Depends(get_session)
):
    job = session.get(JobRequest, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status != "pending":
        raise HTTPException(status_code=400, detail="Job is already accepted or completed")
    
    job.worker_id = current_user.id
    job.status = "accepted"
    session.add(job)
    session.commit()
    return {"message": "Job accepted successfully"}

@router.put("/{job_id}/complete")
def complete_job(
    job_id: int,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    job = session.get(JobRequest, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if current_user.id not in [job.requester_id, job.worker_id]:
        raise HTTPException(status_code=403, detail="Not authorized to complete this job")
    
    job.status = "completed"
    session.add(job)
    session.commit()
    return {"message": "Job marked as completed"}
