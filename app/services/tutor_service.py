from app.models.tutor_profile import Tutor
from app.dao.tutor_dao import create_tutor, update_tutor, delete_tutor, display_tutors, upload_tutor_profile_photo

TUTOR_BIO_MAX_LENGTH = 250

def normalize_tutor_bio(tutor_bio: str) -> str:
    return (tutor_bio or "").strip()

def validate_tutor_bio(tutor_bio: str) -> None:
    if len(tutor_bio) > TUTOR_BIO_MAX_LENGTH:
        raise ValueError("Bio too long")

def validate_tutor_experience(experience: int):

    if experience < 0:
        raise ValueError("Experience cannot be negative")

    if experience > 70:
        raise ValueError("Experience too high")

def create_tutor_profile(tutor: Tutor):
    tutor.tutor_bio = normalize_tutor_bio(tutor.tutor_bio)

    validate_tutor_bio(tutor.tutor_bio)
    validate_tutor_experience(tutor.experience)

    tutor = create_tutor(tutor)

    if not tutor:
        raise ValueError("Tutor not created")

    return tutor

def update_tutor_profile(tutor: Tutor):
    tutor.tutor_bio = normalize_tutor_bio(tutor.tutor_bio)

    validate_tutor_bio(tutor.tutor_bio)
    validate_tutor_experience(tutor.experience)

    updated = update_tutor(tutor)
    if not updated:
        raise ValueError("Tutor not updated")

    return updated

def delete_tutor_profile(tutor_id: int):
    delete_tutor(tutor_id)
    return {"success": True}

def display_tutor_profiles():
    tutors = display_tutors()

    if not tutors:
        raise ValueError("Tutor not found")

    return tutors

def search_tutor_by_email(email: str):
    user = get_tutor_by_email(email)

    if not user:
        raise ValueError("No users found")

    return user

def upload_picture(tutor: Tutor):
    upload = upload_tutor_profile_photo(tutor.tutor_id, tutor.profile_image)

    if not upload:
        raise ValueError("Tutor picture not found")

    return upload
