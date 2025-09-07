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
    
    def to_dict(self):
        """Convert user object to dictionary for JSON serialization."""
        return {
            'id': str(self.id),
            'name': self.name,
            'github_username': self.github_username,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
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
    tags = db.Column(db.ARRAY(db.String), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    like_count = db.Column(db.Integer, default=0)

    # Foreign Keys
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    idea_id = db.Column(UUID(as_uuid=True), db.ForeignKey('ideas.id'), nullable=False)  # REMOVED unique=True
    
    # Relationships
    user = db.relationship('User', backref=db.backref('projects', lazy=True))
    idea = db.relationship('Idea', backref=db.backref('projects', lazy=True))  # Changed to many projects

    def __repr__(self):
        return f'<Project {self.title}>'
    
    def to_dict(self):
        """Convert project object to dictionary for JSON serialization."""
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'repo_url': self.repo_url,
            'live_url': self.live_url,
            'tags': self.tags,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'like_count': self.like_count,
            'user_id': str(self.user_id),
            'idea_id': str(self.idea_id)
        }
    
    @classmethod
    def create(cls, title, description, repo_url, user_id, idea_id, live_url=None, tags=None):
        """Create a new project from an idea."""
        project = cls(
            title=title,
            description=description,
            repo_url=repo_url,
            live_url=live_url,
            tags=tags,
            user_id=user_id,
            idea_id=idea_id
        )
        return project
    
    def increase_like(self, commit: bool = True):
        """Increment the project's like_count by one and optionally commit to DB.

        Returns the new like_count.
        """
        try:
            self.like_count = (self.like_count or 0) + 1
            if commit:
                db.session.add(self)
                db.session.commit()
            return self.like_count
        except Exception:
            try:
                db.session.rollback()
            except Exception:
                pass
            raise

class Idea(db.Model):
    __tablename__ = 'ideas'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    like_count = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default='proposed')  # proposed, in_progress, completed
    difficulty = db.Column(db.String(50), nullable=True)  # e.g., easy, medium, hard
    image_url=db.Column(db.String(300), nullable=True)
    # Foreign Key
    solution=db.Column(db.Text, nullable=True)  # URL to a solution or related resource
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    author=User.query.filter_by(id=user_id).first().name if user_id else None
    
    
    # Relationships
    user = db.relationship('User', backref=db.backref('ideas', lazy=True))
    # project relationship is defined in Project model as backref

    def __repr__(self):
        return f'<Idea {self.title}>'
    
    def to_dict(self):
        """Convert idea object to dictionary for JSON serialization."""
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'like_count': self.like_count,
            'status': self.status,
            'difficulty': self.difficulty,
            'user_id': str(self.user_id),
            'author': self.author,
            'solution': self.solution,
            'project_count': self.project_count(),
            'has_projects': self.has_projects()
        }
    
    @classmethod
    def create(cls, title, description, user_id):
        """Create a new idea."""
        idea = cls(
            title=title,
            description=description,
            user_id=user_id
        )
        return idea
    
    def increase_like(self, commit: bool = True):
        """Increment the idea's like_count by one and optionally commit to DB.

        Returns the new like_count.
        """
        try:
            self.like_count = (self.like_count or 0) + 1
            if commit:
                db.session.add(self)
                db.session.commit()
            return self.like_count
        except Exception:
            try:
                db.session.rollback()
            except Exception:
                pass
            raise
    
    def has_projects(self):  # Renamed from has_project
        """Check if this idea has been implemented as projects."""
        return len(self.projects) > 0
    
    def project_count(self):
        """Get the number of projects implementing this idea."""
        return len(self.projects)
    
    def is_liked_by_user(self, user_id):
        """Check if a specific user has liked this idea."""
        return UserIdeaLike.query.filter_by(user_id=user_id, idea_id=self.id).first() is not None


class UserIdeaLike(db.Model):
    """Track which users have liked which ideas"""
    __tablename__ = 'user_idea_likes'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    idea_id = db.Column(UUID(as_uuid=True), db.ForeignKey('ideas.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Ensure a user can only like an idea once
    __table_args__ = (db.UniqueConstraint('user_id', 'idea_id', name='unique_user_idea_like'),)
    
    # Relationships
    user = db.relationship('User')
    idea = db.relationship('Idea')
    
    def __repr__(self):
        return f'<UserIdeaLike user_id={self.user_id} idea_id={self.idea_id}>'
    
    @classmethod
    def create(cls, user_id, idea_id):
        """Create a new like record"""
        like = cls(user_id=user_id, idea_id=idea_id)
        return like
    def decrease_like(self, commit: bool = True):
        """Decrement the idea's like_count by one and optionally commit to DB.

        Returns the new like_count.
        """
        try:
            if self.like_count and self.like_count > 0:
                self.like_count -= 1
            if commit:
                db.session.add(self)
                db.session.commit()
            return self.like_count
        except Exception:
            try:
                db.session.rollback()
            except Exception:
                pass
            raise
        
class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    idea_id = db.Column(UUID(as_uuid=True), db.ForeignKey('ideas.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('comments', lazy=True))
    idea = db.relationship('Idea', backref=db.backref('comments', lazy=True))
    
    def __repr__(self):
        return f'<Comment {self.id} on idea {self.idea_id}>'
    
    def to_dict(self):
        """Convert comment object to dictionary for JSON serialization."""
        return {
            'id': str(self.id),
            'user_id': str(self.user_id),
            'idea_id': str(self.idea_id),
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'user': {
                'id': str(self.user.id),
                'name': self.user.name,
                'email': self.user.email
            } if self.user else None
        }
    
    @classmethod
    def create(cls, user_id, idea_id, content):
        """Create a new comment."""
        comment = cls(
            user_id=user_id,
            idea_id=idea_id,
            content=content
        )
        return comment