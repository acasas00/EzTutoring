from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.tutor_profile import Tutor
from app.schemas.tutor_schema import TutorResponse, TutorCreate
from app.schemas.user_schema import UserResponse, UserCreate
from app.dependencies.auth_dependency import require_admin
from app.models.user import User
from app.services.admin_service import (
    create_tutor_account,
    delete_tutor_account,
    view_all_users,
    create_new_admin,
    delete_admin_account,
)


router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)

@router.post("/tutors", response_model=TutorResponse)
def admin_create_tutor(tutor: TutorCreate,current_user=Depends(require_admin)
):

    db_tutor = Tutor(
        first_name=tutor.first_name,
        last_name=tutor.last_name,
        tutor_bio=tutor.tutor_bio,
        experience=tutor.experience,
        profile_image=tutor.profile_image
    )

    try:
        return create_tutor_account(db_tutor)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.delete("/tutors/{tutor_id}", response_model=dict)
def admin_delete_tutor(tutor_id: int, current_user = Depends(require_admin)):

    try:
        return delete_tutor_account(tutor_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))



@router.get("/users", response_model=List[UserResponse])
def admin_view_all_users(current_user=Depends(require_admin)):

    try:
        return view_all_users()
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/admins", response_model=UserResponse)
def create_admin(user: UserCreate, current_user=Depends(require_admin)):

    db_admin_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password_hash=user.password
    )

    try:
        return create_new_admin(db_admin_user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/admins/{user_id}")
def admin_account_deletion(user_id: int, current_user = Depends(require_admin)):

    try:
        if user_id == current_user["user_id"]:
            raise HTTPException(status_code=403, detail="Unable to delete self")

        return delete_admin_account(user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))