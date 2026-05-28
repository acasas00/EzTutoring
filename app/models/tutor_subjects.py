from pydantic import BaseModel

class TutorSubject(BaseModel):
    tutor_id: int
    subject_id: int