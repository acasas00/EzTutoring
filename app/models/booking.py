from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Booking(BaseModel):
    tutor_id: int
    client_id: int
    booking_id: Optional[int] = None
    start_time: datetime
    end_time: datetime
    subject_id: int
    session_type: str
    status: str = "Pending"
    meeting_link: Optional[str] = None
    notes: str = ""