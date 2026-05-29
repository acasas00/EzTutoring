from psycopg2.extras import RealDictCursor
from psycopg2.errors import UniqueViolation
from app.db.db_connection import get_connection
from app.models.tutor_subjects import TutorSubject

def create_tutor_subjects(tutor_subject: TutorSubject):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = ("""
            INSERT INTO tutor_subjects (tutor_id, subject_id)
            VALUES (%s, %s)
            RETURNING *
            """)

    values = (tutor_subject.tutor_id, tutor_subject.subject_id)

    try:
        cursor.execute(query, values)
        created = cursor.fetchone()

        cursor.execute("""
                       SELECT tutors.tutor_id,
                              subjects.subject_id,
                              users.first_name,
                              users.last_name,
                              subjects.subject_name
                       FROM tutor_subjects
                                JOIN tutors ON tutor_subjects.tutor_id = tutors.tutor_id
                                JOIN subjects ON tutor_subjects.subject_id = subjects.subject_id
                                JOIN users ON tutors.user_id = users.user_id
                       WHERE tutor_subjects.tutor_id = %s
                         AND tutor_subjects.subject_id = %s
                       """, (created["tutor_id"], created["subject_id"]))

        created = cursor.fetchone()
        conn.commit()

    except UniqueViolation:
        conn.rollback()

        cursor.close()
        conn.close()

        return None

    cursor.close()
    conn.close()
    return created

def delete_tutor_subjects(tutor_id: int, subject_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    query = ("""
            DELETE FROM tutor_subjects 
            WHERE tutor_id = %s 
            AND subject_id = %s
            """)

    cursor.execute(query, (tutor_id, subject_id))
    conn.commit()

    deleted = cursor.rowcount > 0

    cursor.close()
    conn.close()
    return deleted

def search_tutor_subjects(search_term: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    like_term = f"%{search_term}%"

    query = ("""
            SELECT
            tutors.tutor_id,
            subjects.subject_id,
            users.first_name,
            users.last_name,
            subjects.subject_name
            FROM tutor_subjects
            JOIN tutors ON tutor_subjects.tutor_id = tutors.tutor_id
            JOIN subjects ON tutor_subjects.subject_id = subjects.subject_id
            JOIN users ON tutors.user_id = users.user_id
            WHERE subjects.subject_name ILIKE %s
            OR users.first_name ILIKE %s OR users.last_name ILIKE %s
            """)

    cursor.execute(query, (like_term, like_term, like_term))

    tutor_subjects = cursor.fetchall()

    cursor.close()
    conn.close()

    return tutor_subjects


