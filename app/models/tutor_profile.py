from pydantic import BaseModel
from typing import Optional

class Tutor(BaseModel):
    tutor_id: Optional[int] = None
    user_id: Optional[int] = None
    tutor_bio: Optional[str] = None
    experience: Optional[int] = None
    profile_image: Optional[str] = None