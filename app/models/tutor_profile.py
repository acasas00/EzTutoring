from pydantic import BaseModel
from typing import Optional

class Tutor(BaseModel):
    tutor_id: Optional[int] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    tutor_bio: Optional[str] = None
    experience: Optional[int] = None
    profile_image: Optional[str] = None