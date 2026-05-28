from pydantic import BaseModel
from typing import Optional
from datetime import time

class Availability(BaseModel):
    availability_id: Optional[int] = None
    tutor_id: int
    day_of_week: str
    start_time: time
    end_time: time
    is_recurring: bool