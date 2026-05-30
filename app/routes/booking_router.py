from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.booking_schema import BookingCreate, BookingUpdate, BookingResponse, BookingStatusResponse
from app.services.booking_service import create_tutoring_booking, update_tutoring_booking, delete_tutoring_booking, search_tutoring_booking, find_bookings_by_tutor, change_booking_status
from app.models.booking import Booking

router = APIRouter(
    prefix="/bookings",
    tags=["booking"],
)

@router.post("/", response_model=BookingResponse)
def create_booking(booking: BookingCreate):

    db_booking = Booking(
        tutor_id=booking.tutor_id,
        client_id=booking.client_id,
        start_time=booking.start_time,
        end_time=booking.end_time,
        subject_id=booking.subject_id,
        session_type=booking.session_type,
        status=booking.status,
        meeting_link=booking.meeting_link,
        notes=booking.notes,
    )

    try:
        return create_tutoring_booking(db_booking)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking: BookingUpdate, booking_id: int):

    db_booking = Booking(
        booking_id=booking_id,
        tutor_id=booking.tutor_id,
        client_id=booking.client_id,
        start_time=booking.start_time,
        end_time=booking.end_time,
        subject_id=booking.subject_id,
        session_type=booking.session_type,
        status=booking.status,
        meeting_link=booking.meeting_link,
        notes=booking.notes,
    )

    try:
        return update_tutoring_booking(db_booking)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{booking_id}/", response_model= bool)
def delete_booking(booking_id: int):
    try:
        return delete_tutoring_booking(booking_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search", response_model=List[BookingResponse])
def search_booking(search_term: str):
    try:
        return search_tutoring_booking(search_term)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/tutor_bookings", response_model=List[BookingResponse])
def tutor_bookings(tutor_id: int):
    try:
        return find_bookings_by_tutor(tutor_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{booking_id}/status", response_model=BookingStatusResponse)
def booking_status(booking_id: int, status: str):
    try:
        return change_booking_status(booking_id,status)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
