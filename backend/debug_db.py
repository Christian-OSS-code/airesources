import mysql.connector as mariadb
import sys
import os
from dotenv import load_dotenv

load_dotenv()

print(f"Connecting to {os.getenv('DB_HOST')} with User: {os.getenv('DB_USER')}, DB: {os.getenv('DB_NAME')}")
pwd = os.getenv("DB_PASSWORD")
print(f"Password length: {len(pwd) if pwd else 0}")
if pwd:
    print(f"Starts with quote: {pwd.startswith(chr(34)) or pwd.startswith(chr(39))}")

try:
    conn = mariadb.connect(
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
        database=os.getenv("DB_NAME")
    )
    print("Success")
except Exception as e:
    print(f"Error Type: {type(e)}")
    print(f"Error: {e}")
