from psycopg2.extras import RealDictCursor
from app.db.db_connection import get_connection


def update_homepage_image(section: str, image_url: str):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        UPDATE homepage_images
        SET image_url = %s
        WHERE section = %s
        RETURNING *
    """

    cursor.execute(query, (image_url, section))

    updated = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    return updated


def get_homepage_images():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute("""
        SELECT section,image_url
        FROM homepage_images
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows