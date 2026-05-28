from fastapi import APIRouter, HTTPException
from app.models.tutor_subjects import TutorSubject
from app.schemas.tutor_subject_schema import TutorSubjectCreate, TutorSubjectResponse
from app.services.tutor_subjects_service import assign_subject_to_tutor, remove_subject_from_tutor, get_subjects_by_tutor
from typing import List

router = APIRouter(
    prefix="/tutor-subjects",
    tags=["tutor_subjects"],
)

@router.post("/", response_model = TutorSubjectResponse)
def assign_tutor_subjects(tutor_subject: TutorSubjectCreate):

    db_tutor_subject = TutorSubject(
        tutor_id=tutor_subject.tutor_id,
        subject_id=tutor_subject.subject_id,
    )

    try:
        return assign_subject_to_tutor(db_tutor_subject)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/", response_model = bool)
def remove_tutor_subject(tutor_id: int, subject_id: int):
    try:
        return remove_subject_from_tutor(tutor_id, subject_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search", response_model = List[TutorSubjectResponse])
def search_tutor_subjects(search_term: str):
    try:
        return get_subjects_by_tutor(search_term)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))