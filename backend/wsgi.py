#!/usr/bin/env python3
"""
WSGI entry point for production deployment.
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
