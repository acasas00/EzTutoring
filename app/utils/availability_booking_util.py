from datetime import datetime,timedelta


def time_overlap(slot_start, slot_end, booking_start, booking_end):
    return slot_start < booking_end and slot_end > booking_start

def generate_slots(availability, bookings, selected_date: str, duration_hours):
    available_slots = []

    duration = timedelta(hours=duration_hours)
    for block in availability:

        requested_date = datetime.strptime(selected_date,"%Y-%m-%d").date()
        current = datetime.combine(requested_date,block["start_time"])
        availability_end = datetime.combine(requested_date,block["end_time"])

        while current + duration <= availability_end:
            slot_end = current + duration

            conflict = False

            for booking in bookings:

                if time_overlap(current, slot_end, booking["start_time"], booking["end_time"]):
                    conflict = True
                    break

            if not conflict:
                available_slots.append({
                "start_time": current,
                "end_time": slot_end,
                })

            current += timedelta(hours=1)

    return available_slots