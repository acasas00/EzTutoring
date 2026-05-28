from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.subjects import Subject

def create_subject(subject: Subject):
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    query = ("""
             INSERT INTO subjects (subject_name)
             VALUES (%s)
             RETURNING *
             """)

    values = (subject.subject_name,)
    cursor.execute(query, values)

    created = cursor.fetchone()
    connection.commit()

    cursor.close()
    connection.close()

    return created

#pass subject_id
def update_subject(subject: Subject):
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    query = ("""
             UPDATE subjects
             SET subject_name = %s
             WHERE subject_id = %s
             RETURNING *
             """)

    values = (subject.subject_name, subject.subject_id)
    cursor.execute(query, values)

    updated = cursor.fetchone()
    connection.commit()

    cursor.close()
    connection.close()

    return updated

def delete_subject(subject_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    query = ("""
             DELETE FROM subjects
             WHERE subject_id = %s
             """)

    values = (subject_id,)
    cursor.execute(query, values)

    connection.commit()
    deleted = cursor.rowcount > 0

    cursor.close()
    connection.close()

    return deleted

def get_subjects(search_term: str):
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    like_term = f"%{search_term}%"

    query = ("""
            SELECT
            subjects.subject_id,
            subjects.subject_name
            FROM subjects
            WHERE subjects.subject_name ILIKE %s
    """)

    values = (like_term,)
    cursor.execute(query, values)

    subjects = cursor.fetchall()

    cursor.close()
    connection.close()

    return subjects
