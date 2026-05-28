from datetime import time
from app.models.availability import Availability
from app.dao.availability_dao import create_availability, update_availability, delete_availability, search_availability

DAYS_OF_WEEK = ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')

def normalize_day(day: str) -> str:
    return (day or "").strip().lower()

def validate_day(day: str):
    if day not in DAYS_OF_WEEK:
        raise ValueError(f"Invalid day: {day}")

def validate_availability(start_time: time, end_time: time):
    if start_time >= end_time:
        raise ValueError(f"Start time must be less than end time: {start_time}")

def create_new_schedule(availability: Availability):
    availability.day_of_week = normalize_day(availability.day_of_week)
    validate_day(availability.day_of_week)

    validate_availability(availability.start_time, availability.end_time)

    schedule = create_availability(availability)

    if not schedule:
        raise ValueError("Schedule not created")

    return schedule

def update_tutor_schedule(availability: Availability):
    availability.day_of_week = normalize_day(availability.day_of_week)
    validate_day(availability.day_of_week)

    validate_availability(availability.start_time, availability.end_time)

    update = update_availability(availability)

    if not update:
        raise ValueError("Tutor schedule not updated")

    return update

def delete_tutor_schedule(availability_id: int):
    delete = delete_availability(availability_id)

    if not delete:
        raise ValueError("Tutor schedule not deleted")

    return delete

def search_tutor_schedule(search_term: str):

    search = search_availability(search_term)
    if search is None:
        raise ValueError("Tutor schedule not searched")

    return search


