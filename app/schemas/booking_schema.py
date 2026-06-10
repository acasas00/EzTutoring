from pydantic import BaseModel
from datetime import datetime

class BookingCreate(BaseModel):
    tutor_id: int
    client_id: int
    start_time: datetime
    end_time: datetime
    subject_id: int
    session_type: str
    status: str = "Pending"
    meeting_link: str | None = None
    notes: str | None = None

class BookingUpdate(BaseModel):
    tutor_id: int
    client_id: int
    start_time: datetime
    end_time: datetime
    subject_id: int
    session_type: str
    status: str
    meeting_link: str | None = None
    notes: str | None = None

class BookingResponse(BookingUpdate):
    booking_id: int
    pass

class BookingStatusResponse(BaseModel):
    booking_id: int
    status: str

class BookingAdminResponse(BaseModel):
    booking_id: int
    tutor_id: int
    client_id: int
    start_time: datetime
    end_time: datetime
    subject_id: int
    session_type: str
    status: str
    meeting_link: str | None = None
    notes: str | None = None
    client_first_name: str
    client_last_name: str
    tutor_first_name: str
    tutor_last_name: str
    subject_name: str