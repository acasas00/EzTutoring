from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.booking import Booking

def create_booking(booking:Booking):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
                INSERT INTO bookings (tutor_id, client_id, start_time, end_time, subject_id, status, meeting_link, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
             """)


    values = (
        booking.tutor_id,
        booking.client_id,
        booking.start_time,
        booking.end_time,
        booking.subject_id,
        booking.status,
        booking.meeting_link,
        booking.notes
    )
    cursor.execute(query, values)
    created = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    return created

def update_booking(booking:Booking):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
             UPDATE bookings 
             SET tutor_id = %s, client_id = %s, start_time = %s, end_time = %s, subject_id = %s, status = %s, meeting_link = %s, notes = %s 
             WHERE booking_id = %s
             RETURNING *
             """)

    values = (
        booking.tutor_id,
        booking.client_id,
        booking.start_time,
        booking.end_time,
        booking.subject_id,
        booking.status,
        booking.meeting_link,
        booking.notes,
        booking.booking_id
    )

    cursor.execute(query, values)
    updated = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    return updated

def delete_booking(booking_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    query = ("""
             DELETE FROM bookings 
             WHERE booking_id = %s
             """)

    values = (booking_id,)

    cursor.execute(query, values)
    conn.commit()

    deleted = cursor.rowcount > 0

    cursor.close()
    conn.close()

    return deleted

def search_booking(search_term: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    like_term = f"%{search_term}%"

    query = ("""
                SELECT
                bookings.booking_id,
                bookings.client_id,
                bookings.tutor_id,
                bookings.start_time,
                bookings.end_time,
                bookings.subject_id,
                bookings.status,
                bookings.meeting_link,
                bookings.notes,
                users.first_name,
                users.last_name,
                subjects.subject_name
                FROM bookings
                JOIN users ON bookings.client_id = users.user_id
                JOIN tutors ON bookings.tutor_id = tutors.tutor_id
                JOIN subjects ON bookings.subject_id = subjects.subject_id
                WHERE users.email ILIKE %s 
                OR users.phone_number ILIKE %s 
                OR users.first_name ILIKE %s OR users.last_name ILIKE %s
            """)

    cursor.execute(query, (like_term, like_term, like_term , like_term))
    booking = cursor.fetchall()

    cursor.close()
    conn.close()

    return booking