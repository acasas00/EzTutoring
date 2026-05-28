from typing import List
from fastapi import APIRouter, HTTPException
from app.models.tutor_profile import Tutor
from app.schemas.tutor_schema import TutorUpdate, TutorCreate, TutorResponse
from app.services.tutor_service import update_tutor_profile, display_tutor_profiles, search_tutor_by_email

router = APIRouter(
    prefix="/tutors",
    tags=["tutor"],
)

@router.put("/", response_model=TutorResponse)
def update_tutor(tutor: TutorUpdate):

    db_tutor = Tutor(
        tutor_id = tutor.tutor_id,
        tutor_bio = tutor.tutor_bio,
        experience = tutor.experience
    )

    try:
        return update_tutor_profile(db_tutor)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[TutorResponse])
def find_tutors():
    try:
        return display_tutor_profiles()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search", response_model=TutorResponse)
def search_tutors(email: str):
    try:
        return search_tutor_by_email(email)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
