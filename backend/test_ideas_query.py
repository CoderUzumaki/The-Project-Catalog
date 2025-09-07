#!/usr/bin/env python3
"""
Test the ideas API endpoint after adding solution column.
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.append(os.path.dirname(__file__))

from app import app
from app.models import db, Idea

def test_ideas_query():
    """Test if ideas can be queried successfully."""
    
    with app.app_context():
        try:
            # Test basic query
            ideas = Idea.query.limit(1).all()
            print(f"✅ Successfully queried {len(ideas)} ideas")
            
            if ideas:
                idea = ideas[0]
                idea_dict = idea.to_dict()
                print(f"✅ to_dict() works: {idea_dict['title']}")
                print(f"   - Solution: {idea_dict.get('solution', 'None')}")
                print(f"   - Author: {idea_dict.get('author', 'None')}")
            else:
                print("ℹ️  No ideas found in database")
                
        except Exception as e:
            print(f"❌ Error querying ideas: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    test_ideas_query()
