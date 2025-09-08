#!/usr/bin/env python3
"""
Add sample comments to ideas for testing the comments API.
"""

import os
import sys
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.append(os.path.dirname(__file__))

from app import app
from app.models import db, User, Idea, Comment

def add_sample_comments():
    """Add sample comments to existing ideas."""
    
    with app.app_context():
        try:
            # Get some existing users and ideas
            users = User.query.limit(3).all()
            ideas = Idea.query.limit(5).all()
            
            if not users:
                print("No users found. Please run generate_sample_data.py first.")
                return
            
            if not ideas:
                print("No ideas found. Please run generate_sample_data.py first.")
                return
            
            print(f"Found {len(users)} users and {len(ideas)} ideas")
            
            # Sample comments content
            sample_comments = [
                "This is a fantastic idea! I've been looking for something like this.",
                "Great concept! Have you considered adding authentication?",
                "This could be really useful for beginners. Maybe add some tutorial videos?",
                "I'd love to contribute to this project. Do you have a roadmap?",
                "Interesting approach! How would you handle scalability?",
                "This reminds me of a similar project I worked on. Let me know if you need help!",
                "Could we add a mobile app version of this?",
                "The UI design could be improved. Would you like some suggestions?",
                "Perfect timing! This solves exactly what I was struggling with.",
                "Have you thought about integrating with popular APIs?",
                "This would be great for learning purposes. Love the simplicity!",
                "Maybe add some unit tests to make it more robust?",
                "The documentation looks comprehensive. Nice work!",
                "This could be extended to support multiple languages.",
                "Excellent idea! When do you plan to start implementation?"
            ]
            
            comments_created = 0
            
            # Create comments for each idea
            for idea in ideas:
                # Random number of comments per idea (1-4)
                import random
                num_comments = random.randint(1, 4)
                
                for i in range(num_comments):
                    # Random user and comment
                    user = random.choice(users)
                    content = random.choice(sample_comments)
                    
                    # Create comment with slightly different timestamps
                    comment = Comment.create(
                        user_id=user.id,  # Use the user.id, not auth_id
                        idea_id=idea.id,
                        content=content
                    )
                    
                    # Vary the creation time a bit
                    comment.created_at = datetime.utcnow() - timedelta(
                        hours=random.randint(1, 72),
                        minutes=random.randint(0, 59)
                    )
                    
                    db.session.add(comment)
                    comments_created += 1
                    
                    print(f"Added comment by {user.email} on idea '{idea.title[:50]}...'")
            
            # Commit all changes
            db.session.commit()
            print(f"\n✅ Successfully created {comments_created} sample comments!")
            
        except Exception as e:
            db.session.rollback()
            print(f"❌ Error creating sample comments: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    add_sample_comments()
