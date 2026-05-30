from pydantic import BaseModel, EmailStr

class TutorCreate(BaseModel):
    user_id: int
    tutor_bio: str
    experience: int
    profile_image: str

class TutorUpdate(BaseModel):
    tutor_id: int
    tutor_bio: str
    experience: int

class TutorUpdateProfile(BaseModel):
    tutor_id: int
    profile_image:str


class TutorResponse(BaseModel):
    tutor_id: int
    first_name: str
    last_name: str
    email: EmailStr
    tutor_bio: str
    experience: int
    profile_image: str

class TutorProfileImageResponse(BaseModel):
    tutor_id: int
    profile_image: str