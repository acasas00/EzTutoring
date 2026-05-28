from app.models.tutor_subjects import TutorSubject
from app.dao.tutor_subjects_dao import create_tutor_subjects, delete_tutor_subjects, search_tutor_subjects

def validate_id(_id: int):
    if not isinstance(_id, int) or _id <= 0:
        raise ValueError("Invalid ID")

def assign_subject_to_tutor(tutor_subject: TutorSubject):
    validate_id(tutor_subject.tutor_id)
    validate_id(tutor_subject.subject_id)

    assigned = create_tutor_subjects(tutor_subject)

    if not assigned:
        raise ValueError("Subject not assigned to tutor")

    return assigned

def remove_subject_from_tutor(tutor_id: int, subject_id: int):
    validate_id(tutor_id)
    validate_id(subject_id)

    removed = delete_tutor_subjects(tutor_id, subject_id)
    if not removed:
        raise ValueError("Subject not removed from tutor")

    return removed

def get_subjects_by_tutor(search_term:str):

    results = search_tutor_subjects(search_term)

    if not results:
        raise ValueError("Subject not found")

    return results

