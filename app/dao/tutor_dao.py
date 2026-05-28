from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.tutor_profile import Tutor

def create_tutor(tutor:Tutor):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            INSERT INTO tutors(user_id, tutor_bio, experience)
            VALUES(%s, %s, %s)
            RETURNING *
            """

    values = (tutor.user_id,
              tutor.tutor_bio,
              tutor.experience)

    cursor.execute(query, values)
    created = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()
    return created

def update_tutor(tutor:Tutor):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            UPDATE tutors
            SET tutor_bio = %s, experience = %s
            WHERE user_id = %s
            RETURNING *
            """

    values = (tutor.tutor_bio, tutor.experience, tutor.user_id)
    cursor.execute(query, values)

    updated = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    return updated


def delete_tutor(tutor_id:int):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
        DELETE FROM tutors 
        WHERE user_id = %s
        """

    values = (tutor_id,)
    cursor.execute(query, values)

    conn.commit()
    deleted = cursor.rowcount > 0

    cursor.close()
    conn.close()

    return deleted

def display_tutors():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            SELECT
                tutors.tutor_id,
                users.user_id,
                users.first_name,
                users.last_name,
                users.email,
                tutors.tutor_bio,
                tutors.experience
            FROM tutors
            JOIN users ON tutors.user_id = users.user_id
            WHERE users.role = 'tutor'
            """
    cursor.execute(query)
    tutors = cursor.fetchall()

    cursor.close()
    conn.close()

    return tutors

def get_tutor_by_email(email: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            SELECT
            users.first_name,
            users.last_name,
            users.email,
            tutors.tutor_bio,
            tutors.experience
            FROM tutors
            JOIN users ON tutors.user_id = users.user_id
            WHERE email = %s
            """

    values = (email,)
    cursor.execute(query, values)

    tutor = cursor.fetchone()

    cursor.close()
    conn.close()

    return tutor


