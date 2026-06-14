from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection
from app.models.contact_messages import ContactMessage

def create_message(contact_message: ContactMessage):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            INSERT INTO contact_messages(full_name, email, phone, interests, message)
            VALUES(%s, %s, %s, %s, %s)
            RETURNING *
            """

    cursor.execute(query, (contact_message.full_name,
                           contact_message.email,
                           contact_message.phone,
                           contact_message.interests,
                           contact_message.message))

    created = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    return created

def display_messages():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            SELECT 
             message_id,
             full_name,
             email,
             phone,
             interests,
             message,
             created_at,
             status,
             is_read
            FROM contact_messages
            ORDER BY created_at DESC
            """

    cursor.execute(query)
    display_list = cursor.fetchall()

    cursor.close()
    conn.close()
    return display_list

def display_messages_by_interests(search_term: str):

    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """SELECT
                 message_id,
                full_name,
                email,
                phone,
                interests,
                message,
                created_at,
                status,
                is_read
                FROM contact_messages
                WHERE contact_messages.interests = %s
                ORDER BY created_at DESC
            """

    cursor.execute(query, (search_term,))
    display_list = cursor.fetchall()

    cursor.close()
    conn.close()

    return display_list

def update_message_status(message_id: int, status: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        UPDATE contact_messages
        SET status = %s
        WHERE message_id = %s
        RETURNING *
        """

    cursor.execute(query, (status, message_id))
    updated = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()
    return updated

def mark_message_as_read(message_id: int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        UPDATE contact_messages
        SET is_read = TRUE
        WHERE message_id = %s
        RETURNING *
        """

    cursor.execute(query, (message_id,))
    updated = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()
    return updated

def display_message_by_id(message_id: int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
            SELECT *
            FROM contact_messages
            WHERE message_id = %s
            """
    cursor.execute(query, (message_id,))
    result = cursor.fetchone()

    cursor.close()
    conn.close()
    return result


def delete_message(message_id: int):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        DELETE FROM contact_messages
        WHERE message_id = %s
        RETURNING *
        """

    cursor.execute(query, (message_id,))
    deleted = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return deleted

