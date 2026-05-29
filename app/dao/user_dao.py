from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.user import User

def create_user(user: User):

    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        INSERT INTO users (first_name, last_name, phone_number, email, password_hash,role)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *
    """

    values = (
        user.first_name,
        user.last_name,
        user.phone_number,
        user.email,
        user.password_hash,
        user.role
    )

    cursor.execute(query, values)
    created = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()
    return created

def update_user(user: User, user_id: int):

    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        UPDATE users
        SET first_name=%s, last_name=%s, phone_number=%s, email=%s
        WHERE user_id = %s
        RETURNING *
        """

    values = (
        user.first_name,
        user.last_name,
        user.phone_number,
        user.email,
        user_id
    )

    cursor.execute(query, values)
    updated = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()
    return updated

def delete_user(user_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    query = """
        DELETE FROM users
        WHERE user_id = %s
            """

    values = (user_id,)
    cursor.execute(query, values)
    conn.commit()

    deleted = cursor.rowcount > 0

    cursor.close()
    conn.close()
    return deleted

def search_user(search_term: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    like_term = f"%{search_term}%"

    query = """
        SELECT
        users.user_id,
        users.first_name,
        users.last_name,
        users.phone_number,
        users.email,
        users.role
        FROM users
        WHERE email ILIKE %s
        OR phone_number ILIKE %s
        OR first_name ILIKE %s
        OR last_name ILIKE %s
        """

    values = (like_term, like_term,like_term,like_term)
    cursor.execute(query, values)

    user = cursor.fetchall()

    cursor.close()
    conn.close()

    return user

def get_user_by_email(email: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = """
            SELECT
            users.user_id,
            users.email,
            users.password_hash,
            users.role
            FROM users
            WHERE email = %s
            """

    values = (email,)
    cursor.execute(query, values)

    user = cursor.fetchone()
    cursor.close()
    conn.close()

    return user

def get_all_users():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = """
            SELECT
            users.user_id,
            users.first_name,
            users.last_name,
            users.phone_number,
            users.email,
            users.role
            FROM users
            """
    cursor.execute(query)
    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return users
