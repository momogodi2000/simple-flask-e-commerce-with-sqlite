import sqlite3
from app import app, db
from app import Users, Item, Contact, db

# Create SQLite connection
conn = sqlite3.connect('momo.db')
cursor = conn.cursor()

# Create tables for each model
cursor.execute('''CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY,
                    name TEXT UNIQUE,
                    email TEXT UNIQUE,
                    password TEXT,
                    role TEXT
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS item (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    price REAL NOT NULL,
                    qty INTEGER NOT NULL,
                    minimum_qty INTEGER NOT NULL,
                    max_qty INTEGER NOT NULL,
                    image TEXT NOT NULL
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS contact (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL
                )''')

# Commit changes and close connection
conn.commit()
conn.close()

# Bind SQLAlchemy models to the database
with app.app_context():
    db.create_all()
