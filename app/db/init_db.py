from db_connection import get_connection

def create_users_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS users(
                    user_id SERIAL PRIMARY KEY,
                    first_name VARCHAR(30) NOT NULL,
                    last_name VARCHAR (30) NOT NULL,
                    email VARCHAR (50) UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    role VARCHAR(20) DEFAULT 'admin',
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );            
    """)

    conn.commit()
    cursor.close()
    conn.close()

def create_tutors_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS tutors(
                    tutor_id SERIAL PRIMARY KEY,
                    first_name VARCHAR(30) NOT NULL,
                    last_name VARCHAR (30) NOT NULL,
                    tutor_bio TEXT NOT NULL,
                    experience INTEGER NOT NULL,
                    profile_image VARCHAR(255)
        );            
    """)

    conn.commit()
    cursor.close()
    conn.close()

def create_contacts_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS contact_messages
                      (
                          message_id SERIAL PRIMARY KEY,
                          full_name VARCHAR(100) NOT NULL,
                          email VARCHAR(100) NOT NULL,
                          phone VARCHAR(20)  NOT NULL,
                          interests VARCHAR(100) NOT NULL,
                          message TEXT NOT NULL DEFAULT '',
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          status VARCHAR(20) DEFAULT 'new',
                          is_read BOOLEAN DEFAULT FALSE
                      );
                    """)

    conn.commit()
    cursor.close()
    conn.close()


if __name__ == "__main__":
    create_users_table()
    create_tutors_table()
    create_contacts_table()