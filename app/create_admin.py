from app.db.db_connection import get_connection
from app.utils.password_util import hash_password

conn = get_connection()
cursor = conn.cursor()

cursor.execute("""
    INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        role
    )
    VALUES (%s, %s, %s, %s, %s)
""", (
    "Test",
    "Admin",
    "tester@tester.com",
    hash_password("tester"),
    "admin"
))

conn.commit()

cursor.close()
conn.close()

print("Admin created successfully")