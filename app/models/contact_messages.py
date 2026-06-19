from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ContactMessage(BaseModel):
    message_id: Optional[int] = None
    full_name: str
    email: str
    phone: str
    interests: str
    message: str

    created_at: Optional[datetime] = None
    status: str = "new"
    is_read: bool = False