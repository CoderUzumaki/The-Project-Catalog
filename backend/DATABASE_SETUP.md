# Database Setup Guide

## Overview
The application now includes a local User table that mirrors user data from Supabase Auth. When users sign up via Google OAuth or email/password, an entry is automatically created in our local `users` table.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NULL,                -- User's display name (from OAuth or manual entry)
    github_username VARCHAR(100) NULL,     -- GitHub username (for future GitHub OAuth)
    auth_id UUID UNIQUE NOT NULL,          -- Supabase auth.users.id (foreign key)
    email VARCHAR(120) UNIQUE NOT NULL,    -- User's email address
    created_at TIMESTAMP DEFAULT NOW()     -- When the user was created in our system
);
```

## Setup Instructions

### 1. Get Supabase Database Connection String
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Find the **Connection string** section
4. Copy the **URI** format connection string
5. It should look like: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`

### 2. Update .env File
Replace `your_db_password` in the `SUPABASE_DB_URL` with your actual database password from Supabase.

### 3. Install Dependencies
```bash
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Test the Setup
1. Start your Flask server
2. Sign up/login with Google OAuth
3. Check that a user entry is created in the `users` table

## How It Works

### OAuth Flow with Database Integration
1. User clicks "Continue with Google"
2. Google OAuth completes → returns access token
3. Backend extracts user info from Supabase Auth
4. **NEW:** Backend checks if user exists in local `users` table
5. **NEW:** If not, creates new user entry with:
   - `auth_id`: Supabase user ID
   - `email`: User's email
   - `name`: Full name from Google (can be NULL)
   - `github_username`: NULL for Google users
6. Creates Flask session and logs user in

### Email/Password Flow with Database Integration
1. User logs in with email/password
2. Supabase Auth validates credentials
3. **NEW:** Backend checks if user exists in local `users` table
4. **NEW:** If not, creates new user entry
5. Creates Flask session and logs user in

## Accessing User Data

### In Routes
```python
from models import User, db

# Get current user from database
auth_id = session.get("user_id")
current_user = User.query.filter_by(auth_id=auth_id).first()

# Access user properties
user_name = current_user.name
user_email = current_user.email
user_github = current_user.github_username
```

### Fields That Can Be NULL
- `name`: Will be NULL if not provided by OAuth provider
- `github_username`: Will be NULL for Google OAuth users (reserved for future GitHub OAuth)

## Database Operations

### Create User
```python
new_user = User.create_from_auth(
    auth_id=supabase_user_id,
    email=user_email,
    name=user_name,  # Can be None
    github_username=None
)
db.session.add(new_user)
db.session.commit()
```

### Find User by Auth ID
```python
user = User.query.filter_by(auth_id=supabase_user_id).first()
```

### Update User
```python
user.name = "New Name"
db.session.commit()
```

## Notes
- The `auth_id` field links to Supabase's `auth.users.id`
- Email addresses must be unique
- The table is automatically created when the Flask app starts
- Database operations are wrapped in try/catch blocks so OAuth login works even if database operations fail
