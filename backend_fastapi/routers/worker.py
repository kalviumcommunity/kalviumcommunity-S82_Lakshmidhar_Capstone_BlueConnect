from fastapi import APIRouter, HTTPException, status, Depends
from sqlmodel import Session, select, col
from typing import List, Optional
from models.user import User
from models.worker import WorkerProfile, WorkerProfileResponse
from config.database import get_session
from dependencies import get_current_active_user, role_required

router = APIRouter(
    prefix="/api/workers",
    tags=["Workers"]
)

@router.get("/", response_model=List[WorkerProfileResponse])
def get_workers(
    profession: Optional[str] = None,
    location: Optional[str] = None,
    session: Session = Depends(get_session)
):
    statement = select(WorkerProfile)
    if profession:
        statement = statement.where(col(WorkerProfile.profession).ilike(f"%{profession}%"))
    if location:
        statement = statement.where(col(WorkerProfile.location).ilike(f"%{location}%"))
    
    results = session.exec(statement).all()
    return results

@router.get("/{worker_id}", response_model=WorkerProfileResponse)
def get_worker(worker_id: int, session: Session = Depends(get_session)):
    worker = session.get(WorkerProfile, worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker

@router.put("/me", response_model=WorkerProfileResponse)
def update_my_profile(
    profile_data: dict,
    current_user: User = Depends(role_required(["worker"])),
    session: Session = Depends(get_session)
):
    statement = select(WorkerProfile).where(WorkerProfile.user_id == current_user.id)
    profile = session.exec(statement).first()
    if not profile:
        profile = WorkerProfile(user_id=current_user.id, **profile_data)
        session.add(profile)
    else:
        for key, value in profile_data.items():
            setattr(profile, key, value)
    
    session.commit()
    session.refresh(profile)
    return profile
