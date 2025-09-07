#!/usr/bin/env python3
"""
Test the comments API endpoints.
"""

import requests
import json
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the path
sys.path.append(os.path.dirname(__file__))

from app import app
from app.models import db, Idea

def test_comments_api():
    """Test the comments API endpoints."""
    
    with app.app_context():
        # Get an idea with comments
        idea = Idea.query.first()
        if not idea:
            print("No ideas found in database")
            return
        
        idea_id = str(idea.id)
        print(f"Testing comments API for idea: {idea.title}")
        print(f"Idea ID: {idea_id}")
        
        # Test the GET comments endpoint
        url = f"http://127.0.0.1:5000/ideas/{idea_id}/comments"
        
        try:
            print(f"\n🔍 Testing GET {url}")
            response = requests.get(url)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success! Got {len(data['comments'])} comments")
                print(f"Pagination: {data['pagination']}")
                
                if data['comments']:
                    print("\n📝 Sample comment:")
                    sample_comment = data['comments'][0]
                    print(f"  Content: {sample_comment['content']}")
                    print(f"  User: {sample_comment['user']['name']} ({sample_comment['user']['email']})")
                    print(f"  Created: {sample_comment['created_at']}")
                else:
                    print("No comments found for this idea")
            else:
                print(f"❌ Error: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Could not connect to Flask server. Make sure it's running on http://127.0.0.1:5000")
        except Exception as e:
            print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    test_comments_api()
