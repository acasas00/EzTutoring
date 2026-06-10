from datetime import datetime
from app.models.booking import Booking
from app.dao.booking_dao import create_booking, update_booking, delete_booking, search_booking, get_booking_by_tutor, update_booking_status, get_bookings

NOTES_MAX_LENGTH = 250
MEETING_LINK_MAX_LENGTH = 400
STATUS = ("pending", "confirmed", "rejected")

def normalize_notes(notes: str) -> str:
    return (notes or "").strip()

def validate_notes(notes: str) -> None:
    if notes and  len(notes) > NOTES_MAX_LENGTH:
        raise ValueError("notes is too long")

def validate_availability(start_time: datetime, end_time: datetime):
    if start_time >= end_time:
        raise ValueError(f"Start time must be less than end time: {start_time}")

def normalize_status(status: str) -> str:
    return (status or "").strip().lower()

def validate_status(status: str):
    if status not in STATUS:
        raise ValueError(f"Invalid status: {status}")

def normalize_meeting_link(meeting_link: str) -> str:
    return (meeting_link or "").strip()

def validate_meeting_link(meeting_link: str):
    if meeting_link and len(meeting_link) > MEETING_LINK_MAX_LENGTH:
        raise ValueError("Meeting link is too long")

def create_tutoring_booking(booking: Booking):

    prepare_tutoring_data(booking)
    created = create_booking(booking)

    if not created:
        raise ValueError("Booking creation failed")

    return created

def update_tutoring_booking(booking: Booking):

    prepare_tutoring_data(booking)
    updated = update_booking(booking)

    if not updated:
        raise ValueError("Booking update failed")

    return updated

def delete_tutoring_booking(booking_id: int):

    deleted = delete_booking(booking_id)

    if not deleted:
        raise ValueError("Booking deletion failed")

    return deleted

def search_tutoring_booking(search_term: str):

    booking = search_booking(search_term)

    if booking is None:
        raise ValueError("Booking search failed")

    return booking


def prepare_tutoring_data(booking: Booking):
    validate_availability(booking.start_time, booking.end_time)

    booking.notes = normalize_notes(booking.notes)
    validate_notes(booking.notes)

    booking.meeting_link = normalize_meeting_link(booking.meeting_link)
    validate_meeting_link(booking.meeting_link)

    booking.status = normalize_status(booking.status)
    validate_status(booking.status)

def find_bookings_by_tutor(tutor_id: int):
    bookings = get_booking_by_tutor(tutor_id)

    if bookings is None:
        raise ValueError("Booking search failed")

    return bookings

def change_booking_status(booking_id: int, status: str):
    status = normalize_status(status)
    validate_status(status)

    updated_status = update_booking_status(booking_id, status)

    if not updated_status:
        raise ValueError("Booking status change failed")

    return updated_status

def display_bookings():
    bookings = get_bookings()

    if bookings is None:
        raise ValueError("Booking search failed")

    return bookings





