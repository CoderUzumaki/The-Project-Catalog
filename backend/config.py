import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("SUPABASE_DB_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    