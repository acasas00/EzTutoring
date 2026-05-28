from dotenv import load_dotenv, find_dotenv
import os
import psycopg2

load_dotenv(find_dotenv())

def get_connection():
    conn_string = os.getenv("DATABASE_URL")

    if not conn_string:
        print("DATABASE_URL environment variable not found")

    try:
        conn = psycopg2.connect(conn_string)
        print("Connected to database")
        return conn

    except Exception as e:
        print("Could not connect to database")
        print(e)
        return None

conn = get_connection()