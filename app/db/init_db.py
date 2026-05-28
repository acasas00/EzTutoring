from db_connection import get_connection

def create_users_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS users(
                    user_id SERIAL PRIMARY KEY,
                    first_name VARCHAR(30) NOT NULL,
                    last_name VARCHAR (30) NOT NULL,
                    email VARCHAR (50) UNIQUE NOT NULL,
                    phone_number VARCHAR (20) NOT NULL,
                    password_hash TEXT NOT NULL,
                    role VARCHAR(20) DEFAULT 'client',
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
                    user_id INTEGER UNIQUE NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(user_id),
                    tutor_bio TEXT NOT NULL,
                    experience INTEGER NOT NULL
        );            
    """)

    conn.commit()
    cursor.close()
    conn.close()


def create_subjects_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS subjects
                      (
                          subject_id   SERIAL PRIMARY KEY,
                          subject_name VARCHAR(30) UNIQUE NOT NULL
                      );
                   """)

    conn.commit()
    cursor.close()
    conn.close()


def create_tutor_subjects_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS tutor_subjects
                      (
                          tutor_id   INTEGER NOT NULL,
                          subject_id INTEGER NOT NULL,

                          FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id),
                          FOREIGN KEY (subject_id) REFERENCES subjects (subject_id),

                          PRIMARY KEY (tutor_id, subject_id)
                      );
                   """)

    conn.commit()
    cursor.close()
    conn.close()

def create_bookings_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS bookings(
                    booking_id SERIAL PRIMARY KEY,
                    client_id INTEGER NOT NULL,
                    FOREIGN KEY(client_id) REFERENCES users(user_id),
                    tutor_id INTEGER NOT NULL,
                    FOREIGN KEY(tutor_id) REFERENCES tutors(tutor_id),
                    start_time TIMESTAMP NOT NULL,
                    end_time TIMESTAMP NOT NULL,
                    subject_id INTEGER NOT NULL,
                    FOREIGN KEY(subject_id) REFERENCES subjects(subject_id),
                    status varchar(20) NOT NULL DEFAULT 'Pending',
                    meeting_link TEXT,
                    notes TEXT NOT NULL DEFAULT '',
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );            
    """)

    conn.commit()
    cursor.close()
    conn.close()

def create_availability_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS availability(
                    availability_id SERIAL PRIMARY KEY,
                    tutor_id INTEGER NOT NULL,
                    FOREIGN KEY(tutor_id) REFERENCES tutors(tutor_id),
                    day_of_week VARCHAR(10) NOT NULL,
                    start_time TIME NOT NULL,
                    end_time TIME NOT NULL,
                    is_recurring BOOLEAN NOT NULL
        );            
    """)

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_users_table()
    create_tutors_table()
    create_subjects_table()
    create_tutor_subjects_table()
    create_bookings_table()
    create_availability_table()