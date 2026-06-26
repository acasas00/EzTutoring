import os
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

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

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    filepath = os.path.join(
        UPLOAD_FOLDER,
        IMAGES[section]
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Homepage image updated successfully."
    }