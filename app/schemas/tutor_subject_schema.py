from pydantic import BaseModel

class TutorSubjectCreate(BaseModel):
    tutor_id: int
    subject_id: int

class TutorSubjectResponse(BaseModel):
    tutor_id: int
    subject_id: int
    first_name: str
    last_name: str
    subject_name: str