from app.models.contact_messages import ContactMessage
from app.dao.contact_messages_dao import create_message, display_messages, display_messages_by_interests, update_message_status, mark_message_as_read, display_message_by_id, delete_message
import re

MESSAGE_MAX_LENGTH = 1000
full_name_REGEX = r"^[A-Za-z\s'-]+$"
EMAIL_REGEX = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
PHONE_REGEX = r"^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
INTERESTS = {"a", "b", "c", "d", "e", "f"}
STATUS = {"new","contacted","closed"}

def normalize_message(message: str) -> str:
    return (message or "").strip()

def validate_message(message: str) -> None:
    if len(message) > MESSAGE_MAX_LENGTH:
        raise ValueError("Message too long")
    
def normalize_full_name(full_name: str) -> str:
    return (full_name or "").strip()

def validate_interests(interests: str) -> None:
    if interests not in INTERESTS:
        raise ValueError("Search term must be one of {}".format(INTERESTS))

#checks for numerical values in full_name
def validate_full_name(full_name: str)-> None:

    if not full_name:
        raise ValueError("full_name cannot be empty")

    if not re.fullmatch(full_name_REGEX, full_name):
        raise ValueError("full name contains invalid characters")

def normalize_email(email: str) -> str:
    return (email or "").strip().lower()

def validate_email(email: str) -> None:

    if not re.fullmatch(EMAIL_REGEX, email):
        raise ValueError("Email field must match regular expression")

def normalize_phone_number(phone: str) -> str:
    return (phone or "").strip()

def validate_phone_number(phone: str) -> None:

    if not re.fullmatch(PHONE_REGEX, phone):
        raise ValueError("Phone number must match regular expression")

def create_contact_message(contact_message: ContactMessage):
    normalized_full_name = normalize_full_name(contact_message.full_name)
    normalized_email = normalize_email(contact_message.email)
    normalized_phone = normalize_phone_number(contact_message.phone)
    normalized_message = normalize_message(contact_message.message)

    validate_full_name(normalized_full_name)
    validate_email(normalized_email)
    validate_phone_number(normalized_phone)
    validate_message(normalized_message)
    validate_interests(contact_message.interests)

    contact_message.full_name = normalized_full_name
    contact_message.email = normalized_email
    contact_message.phone = normalized_phone
    contact_message.message = normalized_message

    created = create_message(contact_message)

    if not created:
        raise ValueError("Contact message was not created")

    return created

def display_all_messages():
    return display_messages()

def display_all_messages_by_interests(search_term: str):
    if search_term not in INTERESTS:
        raise ValueError("Search term must be one of {}".format(INTERESTS))

    return display_messages_by_interests(search_term)

def update_status(contact_message: ContactMessage, status: str):
    if status not in STATUS:
        raise ValueError("Status must be one of {}".format(STATUS))

    update = update_message_status(contact_message.message_id, status)
    if not update:
        raise ValueError("Contact message was not updated")

    return update

def mark_msg_as_read(contact_message: ContactMessage):
    marked = mark_message_as_read(contact_message.message_id)

    if not marked:
        raise ValueError("Contact message was not marked for read")

    return marked

def display_all_msgs_by_id(message_id: int):
    return display_message_by_id(message_id)

def delete_msg(message_id: int):
    delete = delete_message(message_id)

    if not delete:
        raise ValueError("Contact message was not deleted")

    return delete




