import cloudinary.uploader
import app.config.cloudinary
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.homepage_service import (
    upload_homepage_picture,
    display_homepage_images
)

router = APIRouter(
    prefix="/homepage",
    tags=["Homepage"]
)

UPLOAD_FOLDER = "uploads/homepage"

IMAGES = {
    "about": "about.jpg",
    "what_we_do": "what_we_do.jpg",
    "why": "why_ez_tutoring.jpg"
}


@router.put("/image/{section}")
async def upload_homepage_image(
    section: str,
    file: UploadFile = File(...)
):
    if section not in IMAGES:
        raise HTTPException(
            status_code=400,
            detail="Invalid homepage section."
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image."
        )

    result = cloudinary.uploader.upload(
        await file.read(),
        folder="ez_tutoring/homepage",
        public_id=section,
        overwrite=True
    )

    image_url = result["secure_url"]

    return upload_homepage_picture(
        section,
        image_url
    )

@router.get("/images")
def get_images():
    return display_homepage_images()