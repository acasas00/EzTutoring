from fastapi import APIRouter, HTTPException
from typing import List
from app.models.contact_messages import ContactMessage
from app.services.contact_messages_service import create_contact_message, display_all_messages, display_all_messages_by_interests, update_status, mark_msg_as_read, display_all_msgs_by_id, delete_msg
from app.schemas.contact_messages_schema import ContactMessageCreate, ContactMessageResponse

router = APIRouter(
    prefix="/contact-messages",
    tags=["contact-messages"],
)

@router.post("/", response_model=ContactMessageResponse)
def create_new_contact_message(contact_message: ContactMessageCreate):

    db_contact_message = ContactMessage(
        full_name=contact_message.full_name,
        email=contact_message.email,
        phone=contact_message.phone,
        interests=contact_message.interests,
        message=contact_message.message
    )

    try:
        return create_contact_message(db_contact_message)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search/all", response_model=List[ContactMessageResponse])
def get_all_messages():

    try:
        return display_all_messages()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search/interests", response_model=List[ContactMessageResponse])
def get_all_messages_by_interests(search_term: str):

    try:
        return display_all_messages_by_interests(search_term)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{contact_message_id}/status", response_model=ContactMessageResponse)
def change_message_status(contact_message_id: int, status: str):
    try:
        return update_status(contact_message_id, status)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{contact_message_id}/is-read", response_model=ContactMessageResponse)
def mark_as_read(contact_message_id: int):
    try:
        return mark_msg_as_read(contact_message_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{contact_message_id}", response_model=ContactMessageResponse)
def get_all_messages_by_id(contact_message_id: int):
    try:
        return display_all_msgs_by_id(contact_message_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{contact_message_id}", response_model=ContactMessageResponse)
def delete_message(contact_message_id: int):
    try:
        return delete_msg(contact_message_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))