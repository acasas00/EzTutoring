from typing import Optional
from pydantic import BaseModel, EmailStr

class TutorCreate(BaseModel):
    first_name: str
    last_name: str
    tutor_bio: str
    experience: int
    profile_image: Optional[str] = None

class TutorUpdate(BaseModel):
    first_name: str
    last_name: str
    tutor_bio: str
    experience: int

class TutorUpdateProfile(BaseModel):
    tutor_id: int
    profile_image:str


class TutorResponse(BaseModel):
    tutor_id: int
    first_name: str
    last_name: str
    tutor_bio: str
    experience: int
    profile_image: Optional[str] = None

class TutorProfileImageResponse(BaseModel):
    tutor_id: int
    profile_image: Optional[str] = None