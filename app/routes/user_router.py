from typing import List
from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse, UserUpdate
from app.services.user_service import create_new_user, update_user_profile, delete_user_profile, search_user_profile, display_all_users

router = APIRouter(
    prefix="/users",
    tags=["user"]
)

@router.post("/", response_model=UserResponse)
def register_user(user: UserCreate):

    db_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,
        email=user.email,
        password_hash=user.password
    )

    try:
        return create_new_user(db_user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{user_id}/profile", response_model=UserResponse)
def update_profile(user: UserUpdate, user_id: int):

    db_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,
        email=user.email
    )

    try:
        return update_user_profile(db_user, user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{user_id}", response_model=bool)
def delete_profile(user_id: int):
    try:
        return delete_user_profile(user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/search", response_model=List[UserResponse])
def get_user_profile(search_term: str):
    try:
        return search_user_profile(search_term)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[UserResponse])
def search_users():
    try:
        return display_all_users()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))