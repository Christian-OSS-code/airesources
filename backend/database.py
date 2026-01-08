import mariadb

import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    try:
        conn = mariadb.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=int(os.getenv("DB_PORT")),
            database=os.getenv("DB_NAME")
        )
        return conn
    except mariadb.Error as e:
        print(f"Error connecting to Database: {e}")
        raise e
