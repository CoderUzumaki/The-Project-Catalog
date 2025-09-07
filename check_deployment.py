#!/usr/bin/env python3
"""
Deployment readiness checker for The Project Catalog.
"""

import os
import sys
from pathlib import Path

def check_file_exists(file_path, description):
    """Check if a file exists and report status."""
    if Path(file_path).exists():
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ Missing {description}: {file_path}")
        return False

def check_env_vars():
    """Check if required environment variables are set."""
    required_vars = [
        "SUPABASE_URL",
        "SUPABASE_ANON_KEY", 
        "SUPABASE_SERVICE_ROLE_KEY",
        "SUPABASE_DB_URL",
        "FLASK_SECRET_KEY"
    ]
    
    env_file = Path("backend/.env")
    if not env_file.exists():
        print("❌ backend/.env file not found")
        return False
    
    print("🔍 Checking environment variables in .env file...")
    missing_vars = []
    
    with open(env_file) as f:
        env_content = f.read()
    
    for var in required_vars:
        if f"{var}=" in env_content and not f"{var}=your_" in env_content:
            print(f"✅ {var} is set")
        else:
            print(f"❌ {var} is missing or using placeholder value")
            missing_vars.append(var)
    
    return len(missing_vars) == 0

def check_deployment_readiness():
    """Check if the project is ready for deployment."""
    print("🚀 Checking deployment readiness for The Project Catalog...\n")
    
    checks = []
    
    # Core files
    print("📁 Core Application Files:")
    checks.append(check_file_exists("backend/app/__init__.py", "Flask app initialization"))
    checks.append(check_file_exists("backend/app/models.py", "Database models"))
    checks.append(check_file_exists("backend/app/routes.py", "API routes"))
    checks.append(check_file_exists("backend/config.py", "Configuration"))
    
    print("\n📦 Deployment Files:")
    checks.append(check_file_exists("backend/requirements.txt", "Python dependencies"))
    checks.append(check_file_exists("backend/Procfile", "Heroku Procfile"))
    checks.append(check_file_exists("backend/runtime.txt", "Python runtime"))
    checks.append(check_file_exists("backend/wsgi.py", "WSGI entry point"))
    checks.append(check_file_exists("backend/Dockerfile", "Docker configuration"))
    
    print("\n🔧 Configuration Files:")
    checks.append(check_file_exists("backend/.env.example", "Environment template"))
    checks.append(check_file_exists(".gitignore", "Git ignore rules"))
    checks.append(check_file_exists("docker-compose.yml", "Docker Compose"))
    checks.append(check_file_exists("DEPLOYMENT.md", "Deployment guide"))
    
    print("\n🗄️ Database Files:")
    checks.append(check_file_exists("backend/migrations", "Database migrations"))
    
    print("\n🌍 Environment Configuration:")
    env_check = check_env_vars()
    checks.append(env_check)
    
    print("\n" + "="*50)
    
    if all(checks):
        print("🎉 All checks passed! Your project is ready for deployment.")
        print("\n📋 Next steps:")
        print("1. Commit your changes to git")
        print("2. Push to your remote repository")
        print("3. Deploy to your chosen platform (Heroku, Railway, Render, etc.)")
        print("4. Set environment variables on your deployment platform")
        print("5. Run database migrations: flask db upgrade")
        print("\nFor detailed instructions, see DEPLOYMENT.md")
    else:
        print("⚠️  Some checks failed. Please fix the issues above before deploying.")
        return False
    
    return True

if __name__ == "__main__":
    # Change to project root directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    success = check_deployment_readiness()
    sys.exit(0 if success else 1)
