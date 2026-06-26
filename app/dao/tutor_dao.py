from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.tutor_profile import Tutor

def create_tutor(tutor:Tutor):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            INSERT INTO tutors(first_name, last_name, tutor_bio, experience)
            VALUES(%s, %s, %s, %s)
            RETURNING *
            """

    values = (
              tutor.first_name,
              tutor.last_name,
              tutor.tutor_bio,
              tutor.experience)

    cursor.execute(query, values)
    created = cursor.fetchone()

    conn.commit()
    cursor.close()
    conn.close()

    return created

def update_tutor(tutor: Tutor):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        UPDATE tutors
        SET
            first_name = %s,
            last_name = %s,
            tutor_bio = %s,
            experience = %s
        WHERE tutor_id = %s
        RETURNING *
    """

    values = (
        tutor.first_name,
        tutor.last_name,
        tutor.tutor_bio,
        tutor.experience,
        tutor.tutor_id
    )

    cursor.execute(query, values)

    updated = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    return updated

def delete_tutor(tutor_id:int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        DELETE FROM tutors 
        WHERE tutor_id = %s
        RETURNING *
        """

    values = (tutor_id,)
    cursor.execute(query, values)

    deleted = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    return deleted

def display_tutors():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            SELECT
                tutors.tutor_id,
                tutors.first_name,
                tutors.last_name,
                tutors.tutor_bio,
                tutors.experience,
                tutors.profile_image
            FROM tutors
            """
    cursor.execute(query)
    tutors = cursor.fetchall()

    cursor.close()
    conn.close()

    return tutors

def upload_tutor_profile_photo(tutor_id:int, profile_image: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            UPDATE tutors
            SET profile_image = %s
            WHERE tutor_id = %s 
            RETURNING *
            """

    values = (profile_image, tutor_id)
    cursor.execute(query, values)

    uploaded = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    return uploaded


