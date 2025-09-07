from flask import Flask
from dotenv import load_dotenv
import os
from supabase import create_client
import warnings
import sys
from flask_migrate import Migrate
from app.models import db
# Add the backend directory to the path for config import
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from config import Config

# load backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

def _env(name, default=""):
    v = os.getenv(name, default)
    return v.strip() if isinstance(v, str) else v

SUPABASE_URL = _env("SUPABASE_URL")
SUPABASE_ANON_KEY = _env("SUPABASE_ANON_KEY")
FLASK_SECRET_KEY = _env("FLASK_SECRET_KEY") or "change-me"

app = Flask(__name__)
app.secret_key = FLASK_SECRET_KEY
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
# create a Supabase client if keys available, otherwise keep None (fail later with clear message)
if SUPABASE_URL and SUPABASE_ANON_KEY and not SUPABASE_URL.startswith("your_") and not SUPABASE_ANON_KEY.startswith("your_"):
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    except Exception as e:
        warnings.warn(f"Failed to create Supabase client: {e}", RuntimeWarning)
        supabase = None
else:
    warnings.warn("SUPABASE_URL or SUPABASE_ANON_KEY missing or using placeholder values in backend/.env — supabase client not created", RuntimeWarning)
    supabase = None

# Import routes after app creation to avoid circular imports
from app import routes