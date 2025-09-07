from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask
import os
import sys

# Add the backend directory to the path so we can import config
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from config import Config

# Initialize SQLAlchemy without binding to an app initially
db = SQLAlchemy()
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    return app

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=True)  # Allow NULL
    github_username = db.Column(db.String(100), nullable=True)  # Allow NULL
    auth_id = db.Column(
        UUID(as_uuid=True), 
        unique=True, 
        nullable=False  # This must be present (Supabase auth user ID)
    )
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'
    
    @classmethod
    def create_from_auth(cls, auth_id, email, name=None, github_username=None):
        """Create a new user from OAuth authentication data."""
        user = cls(
            auth_id=auth_id,
            email=email,
            name=name,
            github_username=github_username
        )
        return user
    
class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)
    repo_url = db.Column(db.String(300), nullable=False)
    live_url = db.Column(db.String(300), nullable=True)
    tags = db.Column(db.ARRAY(db.String), nullable=True)  # Array of strings
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    like_count = db.Column(db.Integer, default=0)
    dislike_count = db.Column(db.Integer, default=0)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('projects', lazy=True))

    def __repr__(self):
        return f'<Project {self.title}>'
    
    @classmethod
    def create(cls, title, description, repo_url, user_id, live_url=None, tags=None):
        """Create a new project."""
        project = cls(
            title=title,
            description=description,
            repo_url=repo_url,
            live_url=live_url,
            tags=tags,
            user_id=user_id
        )
        return project