from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    user_id: Optional[int] = None
    first_name: str
    last_name: str
    email: str
    password_hash: Optional[str] = None
    role:str = "admin"

