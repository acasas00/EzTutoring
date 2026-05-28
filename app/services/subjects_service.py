from app.models.subjects import Subject
from app.dao.subjects_dao import create_subject, update_subject, delete_subject, get_subjects
import re

SUBJECT_NAME_MAX_LENGTH = 100
NAME_REGEX = r"^[A-Za-z0-9_.\- ]+$"


def normalize_subject_name(subject_name: str) -> str:
    return (subject_name or "").strip().lower()

def validate_subject_name(subject_name: str) -> None:
    if not subject_name:
        raise ValueError("Subject name cannot be empty")

    if len(subject_name) > SUBJECT_NAME_MAX_LENGTH:
        raise ValueError("Subject name too long")

    if not(re.fullmatch(NAME_REGEX, subject_name)):
        raise ValueError("Invalid subject name")

def create_new_subject(subject: Subject):
    subject.subject_name = normalize_subject_name(subject.subject_name)
    validate_subject_name(subject.subject_name)

    subject = create_subject(subject)

    if not subject:
        raise ValueError("Subject not created")

    return subject

def update_subject_details(subject: Subject):
    subject.subject_name = normalize_subject_name(subject.subject_name)
    validate_subject_name(subject.subject_name)

    updated = update_subject(subject)

    if not updated:
        raise ValueError("Subject not updated")

    return updated

def delete_subject_record(subject_id: int):
    deleted = delete_subject(subject_id)

    if not deleted:
        raise ValueError("Subject not deleted")

    return deleted

def search_subjects(search_term: str):
    subjects = get_subjects(search_term)

    if not subjects:
        raise ValueError("No subjects found")

    return subjects

