from fastapi import APIRouter, HTTPException
from app.services.user_service import login_user
from app.utils.jwt_util import create_access_token
from app.schemas.user_schema import LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/login")
def login(login_data: LoginRequest):

    try:
        user = login_user(
            login_data.email,
            login_data.password,
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
