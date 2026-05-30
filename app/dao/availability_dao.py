from app.db.db_connection import get_connection
from app.models.availability import Availability
from psycopg2.extras import RealDictCursor

def create_availability(availability:Availability):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query =("""
                      INSERT INTO availability (tutor_id, day_of_week, start_time, end_time, is_recurring)
                      VALUES (%s, %s, %s, %s, %s)
                      RETURNING *
                   """)

    values = (availability.tutor_id,
              availability.day_of_week,
              availability.start_time,
              availability.end_time,
              availability.is_recurring
              )

    cursor.execute(query, values)
    created_availability = cursor.fetchone()

    conn.commit()
    cursor.close()

    conn.close()
    return created_availability


def update_availability(availability:Availability):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
                UPDATE availability
                SET tutor_id = %s, day_of_week = %s, start_time = %s, end_time = %s, is_recurring = %s
                WHERE availability_id = %s
                RETURNING *
            """)

    values = (availability.tutor_id,
              availability.day_of_week,
              availability.start_time,
              availability.end_time,
              availability.is_recurring,
              availability.availability_id,
              )

    cursor.execute(query, values)
    updated_availability = cursor.fetchone()

    conn.commit()
    cursor.close()

    conn.close()
    return updated_availability

def delete_availability(availability_id : int):
    conn = get_connection()
    cursor = conn.cursor()

    query = ("""
                DELETE FROM availability
                WHERE availability_id = %s
            """)

    values = (availability_id,)
    cursor.execute(query, values)
    conn.commit()

    deleted = cursor.rowcount > 0
    cursor.close()
    conn.close()

    return deleted

def search_availability(search_term: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    like_term = f"%{search_term}%"

    query = ("""
            SELECT DISTINCT 
            availability.availability_id,
            availability.tutor_id,
            availability.day_of_week,
            availability.start_time,
            availability.end_time,
            availability.is_recurring,
            users.first_name,
            users.last_name
            FROM availability
            JOIN tutors ON tutors.tutor_id = availability.tutor_id
            JOIN users ON users.user_id = tutors.user_id
            JOIN tutor_subjects ON tutor_subjects.tutor_id = tutors.tutor_id
            JOIN subjects ON subjects.subject_id = tutor_subjects.subject_id
            WHERE subjects.subject_name ILIKE %s
            OR users.first_name ILIKE %s OR users.last_name ILIKE %s
            OR availability.day_of_week ILIKE %s
    """)

    cursor.execute(query, (like_term, like_term, like_term, like_term))

    availability = cursor.fetchall()

    cursor.close()
    conn.close()

    return availability

def get_availability_by_tutor(tutor_id: int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)


    query = ("""
            SELECT *
            FROM availability
            WHERE tutor_id = %s
    """)

    cursor.execute(query, (tutor_id,))

    availability = cursor.fetchall()

    cursor.close()
    conn.close()

    return availability