from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr

class UserResponse(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr
    role: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str