from pydantic import BaseModel
from datetime import datetime

class ContactMessageCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    interests: str
    message: str

class ContactMessageResponse(ContactMessageCreate):
    message_id: int
    created_at: datetime
    status: str
    is_read: bool