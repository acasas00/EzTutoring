from fastapi import APIRouter, HTTPException
from app.schemas.availability_schema import AvailabilityCreate, AvailabilityUpdate, AvailabilityResponse, AvailabilityResponseSlots
from app.services.availability_service import create_new_schedule, update_tutor_schedule, delete_tutor_schedule, search_tutor_schedule, get_availability_slots, find_tutor_availability
from typing import List
from app.models.availability import Availability

router = APIRouter(
    prefix="/availability",
    tags=["availability"],
)

@router.post("/", response_model=AvailabilityResponse)
def create_schedule(availability: AvailabilityCreate):

    db_availability = Availability(
        tutor_id=availability.tutor_id,
        day_of_week=availability.day_of_week,
        start_time=availability.start_time,
        end_time=availability.end_time,
        is_recurring=availability.is_recurring
    )

    try:
        return create_new_schedule(db_availability)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/", response_model=AvailabilityResponse)
def update_schedule(availability: AvailabilityUpdate):

    db_availability = Availability(
        availability_id=availability.availability_id,
        tutor_id=availability.tutor_id,
        day_of_week=availability.day_of_week,
        start_time=availability.start_time,
        end_time=availability.end_time,
        is_recurring=availability.is_recurring
    )

    try:
        return update_tutor_schedule(db_availability)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{availability_id}", response_model=bool)
def delete_schedule(availability_id: int):
    try:
        return delete_tutor_schedule(availability_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search", response_model=List[AvailabilityResponse])
def search_tutor_availability(search_term: str):
    try:
        return search_tutor_schedule(search_term)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/slots", response_model=List[AvailabilityResponseSlots])
def find_availability_slots(tutor_id: int, selected_date:str, duration_hours: int):
    try:
        return get_availability_slots(tutor_id, selected_date, duration_hours)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))