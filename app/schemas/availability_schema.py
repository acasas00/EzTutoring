from pydantic import BaseModel
from datetime import time

class AvailabilityCreate(BaseModel):
    tutor_id: int
    day_of_week: str
    start_time: time
    end_time: time
    is_recurring: bool

class AvailabilityUpdate(BaseModel):
    availability_id: int
    tutor_id: int
    day_of_week: str
    start_time: time
    end_time: time
    is_recurring: bool

class AvailabilityResponse(BaseModel):
    availability_id: int
    tutor_id: int
    day_of_week: str
    start_time: time
    end_time: time
    is_recurring: bool
    first_name: str
    last_name: str