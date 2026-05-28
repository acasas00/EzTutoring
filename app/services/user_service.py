from app.models.user import User
from app.utils.password_util import hash_password, verify_password
from app.dao.user_dao import create_user, update_user, delete_user, search_user, get_user_by_email, get_all_users
import re

USERNAME_MAX_LENGTH = 25
USERNAME_MIN_LENGTH = 5

PASSWORD_MAX_LENGTH = 15
PASSWORD_MIN_LENGTH = 5

NAME_REGEX = r"^[A-Za-z'-]+$"
EMAIL_REGEX = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
PHONE_REGEX = r"^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"

def normalize_password(password: str) -> str:
    return (password or "").strip()

def validate_password(password: str) -> None:

    if not password:
        raise ValueError("Password field cannot be empty")

    if len(password) < PASSWORD_MIN_LENGTH:
        raise ValueError("Password field must be at least 5 characters")

    if len(password) > PASSWORD_MAX_LENGTH:
        raise ValueError("Password field must be at most 15 characters")

def normalize_email(email: str) -> str:
    return (email or "").strip().lower()

def validate_email(email: str) -> None:

    if not re.fullmatch(EMAIL_REGEX, email):
        raise ValueError("Email field must match regular expression")

def normalize_phone_number(phone_number: str) -> str:
    return (phone_number or "").strip()

def validate_phone_number(phone_number: str) -> None:

    if not re.fullmatch(PHONE_REGEX, phone_number):
        raise ValueError("Phone number must match regular expression")

def normalize_name(name: str) -> str:
    return (name or "").strip()

#checks for numerical values in name
def validate_name(name: str)-> None:

    if not name:
        raise ValueError("Name cannot be empty")

    if not re.fullmatch(NAME_REGEX, name):
        raise ValueError("Name contains invalid characters")

def create_new_user(user: User):
    user.first_name = normalize_name(user.first_name)
    user.last_name = normalize_name(user.last_name)
    user.phone_number = normalize_phone_number(user.phone_number)
    user.email = normalize_email(user.email)
    password = normalize_password(user.password_hash)

    validate_name(user.first_name)
    validate_name(user.last_name)
    validate_phone_number(user.phone_number)
    validate_email(user.email)
    validate_password(password)

    user.password_hash = hash_password(password)

    created = create_user(user)

    if not created:
        raise ValueError("User already exists")

    return created

def update_user_profile(user: User, user_id: int):
    user.first_name = normalize_name(user.first_name)
    user.last_name = normalize_name(user.last_name)
    user.phone_number = normalize_phone_number(user.phone_number)
    user.email = normalize_email(user.email)

    validate_name(user.first_name)
    validate_name(user.last_name)
    validate_phone_number(user.phone_number)
    validate_email(user.email)

    updated = update_user(user, user_id)

    if not updated:
        raise ValueError("User does not exist")

def delete_user_profile(user_id: int):

    deleted = delete_user(user_id)

    if not deleted:
        raise ValueError("User does not exist")

    return deleted

def search_user_profile(search_term: str):

    users = search_user(search_term)

    if not users:
        raise ValueError("No users found")

    return users

def display_all_users():
    users = get_all_users()

    if not users:
        raise ValueError("No users found")
    return users

def login_user(email, password):

    email = normalize_email(email)
    validate_email(email)

    password = normalize_password(password)

    user = get_user_by_email(email)

    if not user:
        raise ValueError("User does not exist")

    stored_hash = user["password_hash"]

    if not verify_password(password, stored_hash):
        raise ValueError("Invalid password")

    return user


