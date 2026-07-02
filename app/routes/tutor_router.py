from typing import List
from fastapi import APIRouter, HTTPException
from fastapi import UploadFile, File
import cloudinary.uploader
import app.config.cloudinary
from app.models.tutor_profile import Tutor
from app.schemas.tutor_schema import TutorUpdate, TutorResponse, TutorProfileImageResponse
from app.services.tutor_service import update_tutor_profile, display_tutor_profiles, upload_picture

router = APIRouter(
    prefix="/tutors",
    tags=["tutor"],
)

@router.put("/", response_model=TutorResponse)
def update_tutor(tutor: TutorUpdate):

    db_tutor = Tutor(
        tutor_id=tutor.tutor_id,
        first_name=tutor.first_name,
        last_name=tutor.last_name,
        tutor_bio = tutor.tutor_bio,
        experience = tutor.experience,
    )

    try:
        return update_tutor_profile(db_tutor)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[TutorResponse])
def find_tutors():
    try:
        return display_tutor_profiles()
    except ValueError as e:
        print("ERROR:", e)
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/profile_image", response_model=TutorProfileImageResponse)
async def upload_tutor_profile_image(tutor_id: int,file: UploadFile = File(...)
):
    result = cloudinary.uploader.upload(
        await file.read(),
        folder="ez_tutoring/profile_pictures",
        public_id=f"tutor_{tutor_id}",
        overwrite=True
    )

    profile_image = result["secure_url"]
    db_tutor = Tutor(
        tutor_id=tutor_id,
        profile_image=profile_image
    )

    try:
        return upload_picture(db_tutor)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
