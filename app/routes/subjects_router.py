from fastapi import APIRouter, HTTPException
from app.models.subjects import Subject
from app.schemas.subject_schema import SubjectUpdate,SubjectResponse
from app.services.subjects_service import update_subject_details, search_subjects
from typing import List

router = APIRouter(
    prefix="/subjects",
    tags=["subjects"],
)

@router.put("/", response_model=SubjectResponse)
def update_subject(subject: SubjectUpdate):

    db_subject = Subject(
        subject_id=subject.subject_id,
        subject_name=subject.subject_name,
    )
    try:
        return update_subject_details(db_subject)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[SubjectResponse])
def find_subjects(search_term: str):
    try:
        return search_subjects(search_term)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

