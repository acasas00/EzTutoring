from pydantic import BaseModel, EmailStr

class TutorCreate(BaseModel):
    user_id: int
    tutor_bio: str
    experience: int

class TutorUpdate(BaseModel):
    tutor_id: int
    tutor_bio: str
    experience: int

class TutorResponse(BaseModel):
    tutor_id: int
    first_name: str
    last_name: str
    email: EmailStr
    tutor_bio: str
    experience: int