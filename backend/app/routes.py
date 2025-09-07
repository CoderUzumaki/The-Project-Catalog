from app import app, supabase
from flask import jsonify, request, session, send_file, current_app, redirect, url_for,jsonify
from pathlib import Path
from typing import Any, Dict
import uuid
import os
from dotenv import load_dotenv
from app.models import User, db
from functools import wraps
from app.models import Project
# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

def _env(name, default=""):
    v = os.getenv(name, default)
    return v.strip() if isinstance(v, str) else v
SUPABASE_URL = _env("SUPABASE_URL")

def _extract(resp: Any, key: str):
    if resp is None:
        return None
    if isinstance(resp, dict):
        if key in resp:
            return resp.get(key)
        if "data" in resp and isinstance(resp["data"], dict):
            return resp["data"].get(key)
        return None
    
    val = getattr(resp, key, None)
    if val is not None:
        return val
    try:
        if hasattr(resp, "dict"):
            return resp.dict().get(key)
    except Exception:
        pass
    return None
@app.route("/login", methods=["POST"])


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"status": 401, "detail": "Authentication required"}), 401
        return f(*args, **kwargs)
    return decorated_function

def login():
    if supabase is None:
        return jsonify({"status": 500, "detail": "Server not configured: missing Supabase keys"}), 500

    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"status": 400, "detail": "email and password are required"}), 400

    try:
        resp = supabase.auth.sign_in_with_password({"email": email, "password": password})

        # extract error/user/session for different SDK shapes
        error = _extract(resp, "error")
        user = _extract(resp, "user")
        session_data = _extract(resp, "session")

        # normalize if objects
        if hasattr(user, "dict"):
            try:
                user = user.dict()
            except Exception:
                user = dict(user.__dict__) if hasattr(user, "__dict__") else user

        if error:
            return jsonify({"status": 401, "detail": f"Login failed: {error}"}), 401

        if not user:
            return jsonify({"status": 401, "detail": "Invalid credentials"}), 401

        # Check if user exists in our database, create if not
        auth_id = user.get("id") or user.get("user_id")
        user_email = user.get("email")
        
        if auth_id and user_email:
            existing_user = User.query.filter_by(auth_id=auth_id).first()
            if not existing_user:
                try:
                    new_user = User.create_from_auth(
                        auth_id=auth_id,
                        email=user_email,
                        name=None,  # NULL for email/password users initially
                        github_username=None
                    )
                    db.session.add(new_user)
                    db.session.commit()
                    current_app.logger.info(f"Created new user in database: {user_email}")
                except Exception as db_error:
                    db.session.rollback()
                    current_app.logger.error(f"Failed to create user in database: {db_error}")

        # create a simple server session (do not store tokens here in plaintext)
        session.clear()
        session["user_id"] = auth_id
        session["email"] = user_email

        return jsonify({
            "status": 200,
            "message": "Login successful",
            "user": user,
            "session": session_data or {}
        }), 200

    except Exception as e:
        return jsonify({"status": 500, "detail": "Unexpected server error", "error": str(e)}), 500


@app.route("/login", methods=["GET"])
def login_page():
    """Serve the frontend login page for manual testing."""
    # Try multiple possible paths for the frontend/login.html file
    current_dir = Path(__file__).resolve().parent  # backend/app/
    backend_dir = current_dir.parent  # backend/
    repo_root = backend_dir.parent  # project root
    
    # Primary path: repo_root/frontend/login.html
    page = repo_root / "frontend" / "login.html"
    
    # Log path resolution for debugging
    try:
        current_app.logger.info(f"login_page: current_dir={current_dir}")
        current_app.logger.info(f"login_page: backend_dir={backend_dir}")
        current_app.logger.info(f"login_page: repo_root={repo_root}")
        current_app.logger.info(f"login_page: checking page={page}")
        current_app.logger.info(f"login_page: page.exists()={page.exists()}")
    except Exception:
        pass
    
    if page.exists():
        return send_file(str(page), mimetype="text/html")
    
    # Fallback: try relative to current working directory
    fallback = Path.cwd() / "frontend" / "login.html"
    if fallback.exists():
        try:
            current_app.logger.info(f"login_page: using fallback path={fallback}")
        except Exception:
            pass
        return send_file(str(fallback), mimetype="text/html")
    
    return jsonify({
        "status": 404, 
        "detail": "Login page not found",
        "checked_paths": [str(page), str(fallback)],
        "current_working_directory": str(Path.cwd())
    }), 404


@app.route("/auth/google", methods=["GET"])
def google_oauth():
    """Redirect to Supabase Google OAuth"""
    try:
        if not SUPABASE_URL:
            return redirect("/login?error=Supabase URL not configured")
            
        # Supabase handles the OAuth flow, we just need to redirect to their OAuth URL
        oauth_url = f"{SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=http://127.0.0.1:5000/auth/callback"
        return redirect(oauth_url)
    except Exception as e:
        return redirect(f"/login?error=OAuth initialization failed: {str(e)}")

@app.route("/auth/callback", methods=["GET"])  
def oauth_callback():
    """Handle OAuth callback from Supabase"""
    try:
        # Get the access token and refresh token from URL fragments or query params
        access_token = request.args.get('access_token')
        refresh_token = request.args.get('refresh_token')
        error = request.args.get('error')
        error_description = request.args.get('error_description')
        
        if error:
            return redirect(f"/login?error=OAuth failed: {error_description or error}")
        
        if access_token:
            # Use the access token to get user info
            user_response = supabase.auth.get_user(access_token)
            user = _extract(user_response, "user")
            
            if user:
                # Create session
                session.clear()
                session["user_id"] = user.get("id")
                session["email"] = user.get("email")
                session["access_token"] = access_token
                
                return redirect("/login?success=Google login successful!")
            else:
                return redirect("/login?error=Failed to get user information")
        else:
            return redirect("/login?error=No access token received")
            
    except Exception as e:
        return redirect(f"/login?error=OAuth callback failed: {str(e)}")

@app.route("/auth/google/callback", methods=["GET"])
def google_callback():
    """Legacy route - redirect to main callback"""
    return oauth_callback()


@app.route("/auth/logout", methods=["POST", "GET"])
def logout():
    """Log out the current user."""
    try:
        if supabase:
            # Sign out from Supabase
            supabase.auth.sign_out()
        
        # Clear Flask session
        session.clear()
        
        if request.method == "POST":
            return jsonify({"status": 200, "message": "Logged out successfully"}), 200
        else:
            return redirect(url_for('login_page'))
            
    except Exception as e:
        current_app.logger.error(f"Logout failed: {e}")
        if request.method == "POST":
            return jsonify({"status": 500, "detail": "Logout failed", "error": str(e)}), 500
        else:
            return redirect(url_for('login_page') + '?error=logout_failed')


@app.route("/auth/process-oauth", methods=["POST"])
def process_oauth():
    """Process OAuth tokens sent from frontend JavaScript"""
    try:
        data = request.get_json() or {}
        access_token = data.get('access_token')
        refresh_token = data.get('refresh_token')
        
        if not access_token:
            return jsonify({"status": 400, "detail": "No access token provided"}), 400
        
        # Use the access token to get user info from Supabase
        user_response = supabase.auth.get_user(access_token)
        auth_user = _extract(user_response, "user")
        
        if auth_user:
            # Normalize user data
            if hasattr(auth_user, "dict"):
                try:
                    auth_user = auth_user.dict()
                except Exception:
                    auth_user = dict(auth_user.__dict__) if hasattr(auth_user, "__dict__") else auth_user
            
            # Extract user information
            auth_id = auth_user.get("id")
            email = auth_user.get("email")
            user_metadata = auth_user.get("user_metadata", {})
            name = user_metadata.get("full_name") or user_metadata.get("name")
            
            # Check if user already exists in our database
            existing_user = None
            try:
                existing_user = User.query.filter_by(auth_id=auth_id).first()
            except Exception as db_error:
                current_app.logger.error(f"Failed to query database: {db_error}")
                # Continue without database operations
            
            if existing_user is None:
                # Try to create new user entry in our database
                try:
                    new_user = User.create_from_auth(
                        auth_id=auth_id,
                        email=email,
                        name=name,  # Will be NULL if not provided
                        github_username=None  # NULL for Google OAuth users
                    )
                    db.session.add(new_user)
                    db.session.commit()
                    current_app.logger.info(f"Created new user in database: {email}")
                except Exception as db_error:
                    try:
                        db.session.rollback()
                    except:
                        pass
                    current_app.logger.error(f"Failed to create user in database: {db_error}")
                    # Continue anyway - OAuth login can work without local DB entry
            elif existing_user:
                # Update existing user's information if needed
                try:
                    if name and not existing_user.name:
                        existing_user.name = name
                    if email != existing_user.email:
                        existing_user.email = email
                    db.session.commit()
                except Exception as db_error:
                    try:
                        db.session.rollback()
                    except:
                        pass
                    current_app.logger.error(f"Failed to update user in database: {db_error}")
            
            # Create session
            session.clear()
            session["user_id"] = auth_id
            session["email"] = email
            session["access_token"] = access_token
            if refresh_token:
                session["refresh_token"] = refresh_token
            
            return jsonify({
                "status": 200,
                "message": "Google login successful!",
                "user": {
                    "id": auth_id,
                    "email": email,
                    "name": name,
                    "avatar_url": user_metadata.get("avatar_url")
                }
            }), 200
        else:
            return jsonify({"status": 401, "detail": "Failed to get user information"}), 401
            
    except Exception as e:
        current_app.logger.error(f"OAuth processing failed: {e}")
        return jsonify({"status": 500, "detail": "OAuth processing failed", "error": str(e)}), 500

@app.route('/submit',methods=['POST'])
@login_required
def submit_project():
    """Submit a new project."""
    data = request.get_json() or {}
    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()
    repo_url = (data.get("repo_url") or "").strip()
    live_url = (data.get("live_url") or "").strip() or None
    tags = data.get("tags") or []
    
    if not title or not description or not repo_url:
        return jsonify({"status": 400, "detail": "title, description, and repo_url are required"}), 400

    try:
        user_id = session["user_id"]
        new_project = Project.create(
            title=title,
            description=description,
            repo_url=repo_url,
            live_url=live_url,
            tags=tags,
            user_id=user_id
        )
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify({
            "status": 201,
            "message": "Project submitted successfully",
            "project": {
                "id": str(new_project.id),
                "title": new_project.title,
                "description": new_project.description,
                "repo_url": new_project.repo_url,
                "live_url": new_project.live_url,
                "tags": new_project.tags,
                "created_at": new_project.created_at.isoformat(),
                "user_id": str(new_project.user_id)
            }
        }), 201

    except Exception as e:
        try:
            db.session.rollback()
        except:
            pass
        current_app.logger.error(f"Project submission failed: {e}")
        return jsonify({"status": 500, "detail": "Project submission failed", "error": str(e)}), 500

