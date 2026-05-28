from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    subject_id: Optional[int] = None
    subject_name: str