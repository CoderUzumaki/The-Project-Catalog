from app import app, supabase
from flask import jsonify, request, session, send_file, current_app, redirect, url_for
from pathlib import Path
from typing import Any, Dict
import uuid
import os
from datetime import datetime
from dotenv import load_dotenv
from app.models import User, db
from functools import wraps
from app.models import Project, Idea, User, UserIdeaLike, Comment

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

def _env(name, default=""):
    v = os.getenv(name, default)
    return v.strip() if isinstance(v, str) else v

SUPABASE_URL = _env("SUPABASE_URL")
FRONTEND_URL = _env("FRONTEND_URL", "https://devhub-murex.vercel.app/")

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

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({
                "status": 401, 
                "detail": "Authentication required",
                "message": "Please log in to perform this action",
                "requires_auth": True
            }), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route("/auth/status", methods=["GET"])
def auth_status():
    """Check if user is authenticated and return user info."""
    if "user_id" not in session:
        return jsonify({
            "status": 200,
            "authenticated": False,
            "user": None
        }), 200
    
    try:
        user_id = session["user_id"]
        user = User.query.filter_by(auth_id=user_id).first()
        
        return jsonify({
            "status": 200,
            "authenticated": True,
            "user": {
                "id": user_id,
                "email": session.get("email"),
                "name": user.name if user else session.get("name"),
                "github_username": user.github_username if user else None
            }
        }), 200
    except Exception as e:
        current_app.logger.error(f"Auth status check failed: {e}")
        return jsonify({
            "status": 200,
            "authenticated": False,
            "user": None
        }), 200

@app.route("/login", methods=["POST"])
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
            "user": {
                "id": auth_id,
                "email": user_email
            },
            "redirect_url": "/ideas"
        }), 200

    except Exception as e:
        return jsonify({"status": 500, "detail": "Unexpected server error", "error": str(e)}), 500


@app.route("/signup", methods=["POST"])
def signup():
    """Sign up a new user with email and password."""
    if supabase is None:
        return jsonify({"status": 500, "detail": "Server not configured: missing Supabase keys"}), 500

    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""
    name = (data.get("name") or "").strip()

    if not email or not password:
        return jsonify({"status": 400, "detail": "email and password are required"}), 400

    try:
        # Sign up with Supabase
        resp = supabase.auth.sign_up({"email": email, "password": password})

        # Extract error/user/session
        error = _extract(resp, "error")
        user = _extract(resp, "user")
        session_data = _extract(resp, "session")

        # Normalize user object
        if hasattr(user, "dict"):
            try:
                user = user.dict()
            except Exception:
                user = dict(user.__dict__) if hasattr(user, "__dict__") else user

        if error:
            return jsonify({"status": 400, "detail": f"Signup failed: {error}"}), 400

        if not user:
            return jsonify({"status": 400, "detail": "Signup failed"}), 400

        # Create user in our database
        auth_id = user.get("id") or user.get("user_id")
        user_email = user.get("email")
        
        if auth_id and user_email:
            try:
                new_user = User.create_from_auth(
                    auth_id=auth_id,
                    email=user_email,
                    name=name if name else None,
                    github_username=None
                )
                db.session.add(new_user)
                db.session.commit()
                current_app.logger.info(f"Created new user in database: {user_email}")
            except Exception as db_error:
                db.session.rollback()
                current_app.logger.error(f"Failed to create user in database: {db_error}")

        # Create session
        session.clear()
        session["user_id"] = auth_id
        session["email"] = user_email
        session["name"] = name

        return jsonify({
            "status": 201,
            "message": "Signup successful",
            "user": {
                "id": auth_id,
                "email": user_email,
                "name": name
            },
            "redirect_url": "/ideas"
        }), 201

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
            
        # Use environment variable for frontend URL
        oauth_url = f"{SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to={FRONTEND_URL}"
        return redirect(oauth_url)
    except Exception as e:
        return redirect(f"/login?error=OAuth initialization failed: {str(e)}")

@app.route("/auth/callback", methods=["GET"])  
def oauth_callback():
    """Handle OAuth callback and redirect to frontend"""
    try:
        # Get the access token and refresh token from URL fragments or query params
        access_token = request.args.get('access_token')
        refresh_token = request.args.get('refresh_token')
        error = request.args.get('error')
        error_description = request.args.get('error_description')
        
        if error:
            # Redirect to frontend with error
            return redirect(f"{FRONTEND_URL}/?error={error_description or error}")
        
        if access_token:
            # Process the OAuth tokens
            try:
                user_response = supabase.auth.get_user(access_token)
                user = _extract(user_response, "user")
                
                if user:
                    # Normalize user data
                    if hasattr(user, "dict"):
                        try:
                            user = user.dict()
                        except Exception:
                            user = dict(user.__dict__) if hasattr(user, "__dict__") else user
                    
                    # Create session
                    session.clear()
                    session["user_id"] = user.get("id")
                    session["email"] = user.get("email")
                    session["access_token"] = access_token
                    if refresh_token:
                        session["refresh_token"] = refresh_token
                    
                    # Try to create user in database
                    try:
                        existing_user = User.query.filter_by(auth_id=user.get("id")).first()
                        if not existing_user:
                            new_user = User(
                                auth_id=user.get("id"),
                                email=user.get("email"),
                                name=user.get("user_metadata", {}).get("full_name") or user.get("user_metadata", {}).get("name")
                            )
                            db.session.add(new_user)
                            db.session.commit()
                    except Exception as db_error:
                        current_app.logger.error(f"Database error during OAuth: {db_error}")
                        # Continue even if database fails
                    
                    # Redirect to frontend with success
                    return redirect(f"{FRONTEND_URL}/?success=Login successful")
                else:
                    return redirect(f"{FRONTEND_URL}/?error=Failed to get user information")
            except Exception as process_error:
                current_app.logger.error(f"OAuth processing error: {process_error}")
                return redirect(f"{FRONTEND_URL}/?error=Authentication processing failed")
        else:
            return redirect(f"{FRONTEND_URL}/?error=No access token received")
            
    except Exception as e:
        current_app.logger.error(f"OAuth callback failed: {e}")
        return redirect(f"http://localhost:3000/?error=Authentication failed")

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
                },
                "redirect_url": "/ideas"
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

@app.route("/user/<uuid:user_id>", methods=["GET"])
@login_required
def profile(user_id):
    """Get all projects submitted by a user."""
    user=User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"status": 404, "detail": "User not found"}), 404
    projects = Project.query.filter_by(user_id=user_id).all()
    return jsonify({
        "status": 200,
        "user": {
            "id": str(user.id),
            "email": user.email,
            "name": user.name,
            "github_username": user.github_username,
            "avatar_url": user.avatar_url
        },
        "projects": [project.to_dict() for project in projects]
    }), 200

@app.route('/home', methods=['GET'])
def featured_projects():
    """Get featured projects."""
    projects = Project.query.order_by(Project.like_count.desc()).limit(6).all()
    return jsonify({
        "status": 200,
        "projects": [project.to_dict() for project in projects]
    }), 200

@app.route('/ideas', methods=['GET'])
def list_ideas():
    """Get ideas with pagination and filtering support.
    
    Query parameters:
    - page: Page number (default: 1)
    - limit: Items per page (default: 10, max: 50)
    - difficulty: Filter by difficulty (easy, medium, hard)
    - liked: Filter ideas liked by current user (true/false)
    """
    try:
        # Get query parameters with defaults
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        difficulty = request.args.get('difficulty', type=str)
        liked_param = request.args.get('liked', type=str)
        
        # Validate parameters
        if page < 1:
            page = 1
        if limit < 1 or limit > 50:
            limit = 10
            
        # Build query
        query = Idea.query
        
        # Apply difficulty filter
        if difficulty and difficulty.lower() in ['easy', 'medium', 'hard']:
            query = query.filter(Idea.difficulty == difficulty.lower())
        
        # Apply liked filter (ideas liked by current user)
        if liked_param and liked_param.lower() == 'true':
            # Check if user is logged in
            if 'user_id' not in session:
                return jsonify({
                    "status": 401, 
                    "detail": "Authentication required to filter liked ideas",
                    "message": "Please log in to view your liked ideas",
                    "requires_auth": True
                }), 401
            
            user_id = session['user_id']
            # Join with UserIdeaLike table to get only liked ideas
            query = query.join(UserIdeaLike).filter(UserIdeaLike.user_id == user_id)
        
        # Order by creation date (newest first)
        query = query.order_by(Idea.created_at.desc())
        
        # Apply pagination
        paginated_ideas = query.paginate(
            page=page,
            per_page=limit,
            error_out=False
        )
        
        # Build response
        response_data = {
            "status": 200,
            "ideas": [idea.to_dict() for idea in paginated_ideas.items],
            "pagination": {
                "page": page,
                "limit": limit,
                "total_pages": paginated_ideas.pages,
                "total_items": paginated_ideas.total,
                "has_next": paginated_ideas.has_next,
                "has_prev": paginated_ideas.has_prev,
                "next_page": paginated_ideas.next_num if paginated_ideas.has_next else None,
                "prev_page": paginated_ideas.prev_num if paginated_ideas.has_prev else None
            },
            "filters": {
                "difficulty": difficulty,
                "liked": liked_param
            }
        }
        
        return jsonify(response_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Failed to fetch ideas: {e}")
        return jsonify({
            "status": 500, 
            "detail": "Failed to fetch ideas", 
            "error": str(e)
        }), 500

@app.route('/ideas/<uuid:idea_id>', methods=['GET'])
def get_idea(idea_id):
    """Get a specific idea by ID."""
    idea = Idea.query.filter_by(id=idea_id).first()
    if not idea:
        return jsonify({"status": 404, "detail": "Idea not found"}), 404
    return jsonify({"status": 200, "idea": idea.to_dict()}), 200

@app.route('/ideas/<uuid:idea_id>/comments', methods=['GET'])
def get_idea_comments(idea_id):
    """Get all comments for a specific idea."""
    try:
        # First check if the idea exists
        idea = Idea.query.filter_by(id=idea_id).first()
        if not idea:
            return jsonify({"status": 404, "detail": "Idea not found"}), 404
        
        # Get query parameters for pagination
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 20, type=int)
        
        # Validate parameters
        if page < 1:
            page = 1
        if limit < 1 or limit > 100:
            limit = 20
        
        # Query comments for this idea, ordered by creation date (newest first)
        comments_query = Comment.query.filter_by(idea_id=idea_id).order_by(Comment.created_at.desc())
        
        # Apply pagination
        paginated_comments = comments_query.paginate(
            page=page,
            per_page=limit,
            error_out=False
        )
        
        # Build response
        response_data = {
            "status": 200,
            "idea_id": str(idea_id),
            "idea_title": idea.title,
            "comments": [comment.to_dict() for comment in paginated_comments.items],
            "pagination": {
                "page": page,
                "limit": limit,
                "total_pages": paginated_comments.pages,
                "total_items": paginated_comments.total,
                "has_next": paginated_comments.has_next,
                "has_prev": paginated_comments.has_prev,
                "next_page": paginated_comments.next_num if paginated_comments.has_next else None,
                "prev_page": paginated_comments.prev_num if paginated_comments.has_prev else None
            }
        }
        
        return jsonify(response_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Failed to fetch comments for idea {idea_id}: {e}")
        return jsonify({
            "status": 500, 
            "detail": "Failed to fetch comments", 
            "error": str(e)
        }), 500

@app.route('/ideas/<uuid:idea_id>/comments', methods=['POST'])
@login_required
def create_comment(idea_id):
    """Create a new comment on an idea."""
    try:
        # Check if the idea exists
        idea = Idea.query.filter_by(id=idea_id).first()
        if not idea:
            return jsonify({"status": 404, "detail": "Idea not found"}), 404
        
        # Get request data
        data = request.get_json() or {}
        content = (data.get("content") or "").strip()
        
        if not content:
            return jsonify({"status": 400, "detail": "Comment content is required"}), 400
        
        # Get current user
        user_id = session["user_id"]
        
        # Create new comment
        new_comment = Comment.create(
            user_id=user_id,
            idea_id=idea_id,
            content=content
        )
        
        db.session.add(new_comment)
        db.session.commit()
        
        return jsonify({
            "status": 201,
            "message": "Comment created successfully",
            "comment": new_comment.to_dict()
        }), 201
        
    except Exception as e:
        try:
            db.session.rollback()
        except:
            pass
        current_app.logger.error(f"Failed to create comment: {e}")
        return jsonify({
            "status": 500, 
            "detail": "Failed to create comment", 
            "error": str(e)
        }), 500

@app.route('/ideas/<uuid:idea_id>/like', methods=['POST'])
@login_required
def like_idea(idea_id):
    """Increment like_count for an idea and track user like."""
    try:
        idea = Idea.query.filter_by(id=idea_id).first()
        if not idea:
            return jsonify({"status": 404, "detail": "Idea not found"}), 404
        
        user_id = session['user_id']
        
        # Check if user has already liked this idea
        existing_like = UserIdeaLike.query.filter_by(user_id=user_id, idea_id=idea_id).first()
        if existing_like:
            return jsonify({
                "status": 400, 
                "detail": "You have already liked this idea",
                "idea": idea.to_dict()
            }), 400
        
        # Create like record
        user_like = UserIdeaLike.create(user_id=user_id, idea_id=idea_id)
        db.session.add(user_like)
        
        # Increment like count
        new_count = idea.increase_like(commit=False)  # Don't commit yet
        
        # Commit both operations together
        db.session.commit()
        
        return jsonify({
            "status": 200, 
            "message": "Like added", 
            "like_count": new_count, 
            "idea": idea.to_dict()
        }), 200
        
    except Exception as e:
        try:
            db.session.rollback()
        except:
            pass
        current_app.logger.error(f"Failed to like idea: {e}")
        return jsonify({"status": 500, "detail": "Failed to like idea", "error": str(e)}), 500


@app.route('/projects/<uuid:project_id>/like', methods=['POST'])
@login_required
def like_project(project_id):
    """Increment like_count for a project."""
    try:
        project = Project.query.filter_by(id=project_id).first()
        if not project:
            return jsonify({"status": 404, "detail": "Project not found"}), 404
        new_count = project.increase_like()
        return jsonify({"status": 200, "message": "Like added", "like_count": new_count, "project": project.to_dict()}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to like project: {e}")
        return jsonify({"status": 500, "detail": "Failed to like project", "error": str(e)}), 500

@app.route('/ideas/<uuid:idea_id>/like', methods=['DELETE'])
@login_required
def unlike_idea(idea_id):
    """Decrement like_count for an idea and remove user like."""
    try:
        idea = Idea.query.filter_by(id=idea_id).first()
        if not idea:
            return jsonify({"status": 404, "detail": "Idea not found"}), 404
        
        user_id = session['user_id']
        
        # Check if user has liked this idea
        existing_like = UserIdeaLike.query.filter_by(user_id=user_id, idea_id=idea_id).first()
        if not existing_like:
            return jsonify({
                "status": 400, 
                "detail": "You haven't liked this idea yet",
                "idea": idea.to_dict()
            }), 400
        
        # Remove like record
        db.session.delete(existing_like)
        
        # Decrement like count
        new_count = idea.decrease_like(commit=False)  # Don't commit yet
        
        # Commit both operations together
        db.session.commit()
        
        return jsonify({
            "status": 200, 
            "message": "Like removed", 
            "like_count": new_count, 
            "idea": idea.to_dict()
        }), 200
        
    except Exception as e:
        try:
            db.session.rollback()
        except:
            pass
        current_app.logger.error(f"Failed to unlike idea: {e}")
        return jsonify({"status": 500, "detail": "Failed to unlike idea", "error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring and load balancers."""
    try:
        # Test database connection
        db.session.execute('SELECT 1')
        
        return jsonify({
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "version": "1.0.0",
            "database": "connected",
            "services": {
                "database": "ok",
                "authentication": "ok" if supabase else "disabled"
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "timestamp": datetime.utcnow().isoformat(),
            "error": str(e)
        }), 503

@app.route('/', methods=['GET'])
def root():
    """Root endpoint - API information."""
    return jsonify({
        "name": "The Project Catalog API",
        "version": "1.0.0",
        "description": "API for managing project ideas and implementations",
        "endpoints": {
            "health": "/health",
            "ideas": "/ideas",
            "auth": "/auth/status",
            "documentation": "/docs"
        },
        "status": "running"
    }), 200

@app.route('/project/<uuid:project_id>', methods=['GET'])
def get_project(project_id):
    """Get project details by ID."""
    project = Project.query.filter_by(id=project_id).first()
    if not project:
        return jsonify({"status": 404, "detail": "Project not found"}), 404
    return jsonify({"status": 200, "project": project.to_dict()}), 200

