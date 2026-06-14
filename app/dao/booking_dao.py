from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.booking import Booking

def create_booking(booking:Booking):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
                INSERT INTO bookings (tutor_id, client_id, start_time, end_time, subject_id, session_type, status, meeting_link, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
             """)


    values = (
        booking.tutor_id,
        booking.client_id,
        booking.start_time,
        booking.end_time,
        booking.subject_id,
        booking.session_type,
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
             SET tutor_id = %s, client_id = %s, start_time = %s, end_time = %s, subject_id = %s, session_type = %s, status = %s, meeting_link = %s, notes = %s 
             WHERE booking_id = %s
             RETURNING *
             """)

    values = (
        booking.tutor_id,
        booking.client_id,
        booking.start_time,
        booking.end_time,
        booking.subject_id,
        booking.session_type,
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
                bookings.session_type,
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

def get_booking_by_tutor(tutor_id: int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = ("""
             SELECT
             bookings.start_time,
             bookings.end_time
             FROM bookings
             WHERE tutor_id = %s
             AND status IN ('Pending', 'Confirmed')
             """)
    cursor.execute(query, (tutor_id,))
    bookings = cursor.fetchall()

    cursor.close()
    conn.close()
    return bookings

def update_booking_status(booking_id:int, status:str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
             UPDATE bookings
             SET status = %s
             WHERE booking_id = %s
             RETURNING booking_id, status
             """)

    values = (status, booking_id)
    cursor.execute(query, values)
    updated = cursor.fetchone()

    conn.commit()
    cursor.close()
    conn.close()
    return updated

def get_bookings():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
           SELECT
                b.*,
                client.first_name AS client_first_name,
                client.last_name AS client_last_name,
                tutor_user.first_name AS tutor_first_name,
                tutor_user.last_name AS tutor_last_name,
                s.subject_name
            FROM bookings b
            JOIN users client
                ON b.client_id = client.user_id
            JOIN tutors t
                ON b.tutor_id = t.tutor_id
            JOIN users tutor_user
                ON t.user_id = tutor_user.user_id
            JOIN subjects s
                ON b.subject_id = s.subject_id
            """)

    cursor.execute(query)
    bookings = cursor.fetchall()

    cursor.close()
    conn.close()
    return bookings

def get_booking_by_client(client_id: int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = ("""
             SELECT
                b.*,
                s.subject_name,
                tutor_user.first_name AS tutor_first_name,
                tutor_user.last_name AS tutor_last_name
             FROM bookings b
             JOIN tutors t
                 ON b.tutor_id = t.tutor_id
             JOIN users tutor_user
                 ON t.user_id = tutor_user.user_id
             JOIN subjects s
                 ON b.subject_id = s.subject_id
             WHERE b.client_id = %s
             """)
    cursor.execute(query, (client_id,))
    bookings = cursor.fetchall()

    cursor.close()
    conn.close()
    return bookings

#admin change of booking type in future