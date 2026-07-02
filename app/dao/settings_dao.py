from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection


def get_settings():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute("""
        SELECT *
        FROM site_settings
    """)

    settings = cursor.fetchall()

    cursor.close()
    conn.close()

    return settings


def update_setting(setting_name: str, setting_value: bool):

    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        UPDATE site_settings
        SET setting_value = %s
        WHERE setting_name = %s
        RETURNING *
    """

    cursor.execute(
        query,
        (
            setting_value,
            setting_name
        )
    )

    updated = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    return updated