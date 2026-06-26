from app.models.tutor_profile import Tutor
from app.models.user import User
from app.services.user_service import create_new_user, delete_user_profile
from app.services.tutor_service import create_tutor_profile, delete_tutor_profile
from app.services.user_service import display_all_users

def create_tutor_account(tutor: Tutor):
    created = create_tutor_profile(tutor)

    if not created:
        raise ValueError("Tutor already exists")

    return created

def delete_tutor_account(tutor_id: int):
    deleted = delete_tutor_profile(tutor_id)

    if not deleted:
        raise ValueError("Tutor does not exist")

    return deleted

def view_all_users():
    users = display_all_users()

    return users

def create_new_admin(user: User):
    user.role = "admin"

    created = create_new_user(user)

    if not created:
        raise ValueError("Admin already exists")

    return created

def delete_admin_account(user_id: int):
    deleted = delete_user_profile(user_id)

    if not deleted:
        raise ValueError("User does not exist")

    return deleted
