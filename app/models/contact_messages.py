from pydantic import BaseModel
from datetime import datetime

class ContactMessage(BaseModel):
    message_id: int
    full_name: str
    email: str
    phone: str
    interests: str
    message: str
    created_at: datetime
    status: str
    is_read: bool