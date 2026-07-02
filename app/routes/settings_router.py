from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from app.dependencies.auth_dependency import require_admin
from app.services.settings_service import (
    display_settings,
    change_setting
)

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


class SettingUpdate(BaseModel):
    setting_name: str
    setting_value: bool


@router.get("/")
def get_settings():
    return display_settings()


@router.put("/")
def update_settings(
    setting: SettingUpdate,
    current_user=Depends(require_admin)
):
    try:
        return change_setting(
            setting.setting_name,
            setting.setting_value
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )