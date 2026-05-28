from pydantic import BaseModel
from datetime import datetime

class BookingCreate(BaseModel):
    tutor_id: int
    client_id: int
    start_time: datetime
    end_time: datetime
    subject_id: int
    status: str
    meeting_link: str | None = None
    notes: str | None = None

class BookingUpdate(BaseModel):
    booking_id: int
    tutor_id: int
    client_id: int
    start_time: datetime
    end_time: datetime
    subject_id: int
    status: str
    meeting_link: str | None = None
    notes: str | None = None

class BookingResponse(BaseModel):
    booking_id: int
    tutor_id: int
    client_id: int
    start_time: datetime
    end_time: datetime
    subject_id: int
    status: str
    meeting_link: str | None = None
    notes: str | None = None