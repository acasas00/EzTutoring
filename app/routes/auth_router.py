from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.services.user_service import login_user
from app.utils.jwt_util import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    try:
        user = login_user(
            form_data.username,
            form_data.password,
        )

        token = create_access_token({
            "user_id": user["user_id"],
            "email": user["email"],
            "role": user["role"],}
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }

    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
