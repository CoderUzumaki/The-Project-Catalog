# The Project Catalog - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL database (or Supabase account)
- Node.js 18+ (for frontend)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd The-Project-Catalog
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Database Migration**
   ```bash
   flask db upgrade
   ```

5. **Run Development Server**
   ```bash
   flask run
   ```

## 🌐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Database Configuration
SUPABASE_DB_URL=postgresql://postgres:your_password@db.your-project-ref.supabase.co:5432/postgres

# Flask Configuration
FLASK_SECRET_KEY=your-random-secret-key-here-generate-a-secure-one
FLASK_ENV=production
```

### Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to Settings → API
4. Copy the following:
   - `Project URL` → `SUPABASE_URL`
   - `anon/public key` → `SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`
5. Go to Settings → Database
6. Copy `Connection string` → `SUPABASE_DB_URL`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Using Docker (Backend only)

```bash
cd backend

# Build the image
docker build -t project-catalog-backend .

# Run the container
docker run -p 5000:5000 --env-file .env project-catalog-backend
```

## ☁️ Cloud Deployment

### Heroku

1. **Install Heroku CLI**
2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set SUPABASE_URL=your_supabase_url
   heroku config:set SUPABASE_ANON_KEY=your_anon_key
   heroku config:set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   heroku config:set SUPABASE_DB_URL=your_database_url
   heroku config:set FLASK_SECRET_KEY=your_secret_key
   heroku config:set FLASK_ENV=production
   ```

5. **Deploy**
   ```bash
   # From backend directory
   git subtree push --prefix=backend heroku main
   
   # Or if deploying entire repo
   git push heroku main
   ```

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn wsgi:app`
5. Add environment variables

## 🗄️ Database Management

### Running Migrations

```bash
# Create a new migration
flask db migrate -m "Description of changes"

# Apply migrations
flask db upgrade

# Rollback migrations
flask db downgrade
```

### Sample Data

```bash
# Generate sample data for development
python generate_sample_data.py

# Add sample comments
python add_sample_comments.py
```

## 🔒 Security Considerations

1. **Never commit .env files** - Use .env.example as template
2. **Use strong secret keys** - Generate with `python -c "import secrets; print(secrets.token_hex(32))"`
3. **Enable HTTPS in production** - Set `SESSION_COOKIE_SECURE=True`
4. **Use environment-specific configs** - Different settings for dev/prod
5. **Keep dependencies updated** - Regularly update requirements.txt

## 📊 API Endpoints

### Authentication
- `POST /login` - Email/password login
- `POST /signup` - User registration
- `GET /auth/google` - Google OAuth
- `POST /auth/logout` - Logout
- `GET /auth/status` - Check auth status

### Ideas
- `GET /ideas` - List ideas (supports pagination & filtering)
- `GET /ideas/<id>` - Get specific idea
- `POST /ideas/<id>/like` - Like an idea
- `DELETE /ideas/<id>/like` - Unlike an idea
- `GET /ideas/<id>/comments` - Get idea comments
- `POST /ideas/<id>/comments` - Create comment

### Projects
- `POST /submit` - Submit new project
- `GET /home` - Featured projects
- `POST /projects/<id>/like` - Like a project

### Users
- `GET /user/<id>` - User profile

## 🛠️ Development

### Project Structure
```
backend/
├── app/
│   ├── __init__.py      # Flask app initialization
│   ├── models.py        # Database models
│   └── routes.py        # API endpoints
├── migrations/          # Database migrations
├── .env                 # Environment variables (not in git)
├── .env.example        # Environment template
├── config.py           # Configuration
├── requirements.txt    # Python dependencies
├── Procfile           # Heroku deployment
├── Dockerfile         # Docker image
└── wsgi.py           # WSGI entry point
```

### Adding New Features

1. **Database Changes**
   ```bash
   # Modify models.py
   flask db migrate -m "Add new feature"
   flask db upgrade
   ```

2. **API Endpoints**
   - Add routes in `routes.py`
   - Follow existing patterns for error handling
   - Add authentication where needed

3. **Testing**
   ```bash
   # Install test dependencies
   pip install pytest

   # Run tests
   pytest
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check SUPABASE_DB_URL format
   - Ensure database exists
   - Verify network access to Supabase

2. **Import Errors**
   - Activate virtual environment
   - Install requirements: `pip install -r requirements.txt`

3. **Migration Errors**
   - Check database connection
   - Ensure migrations directory exists
   - Run `flask db init` if needed

4. **Authentication Issues**
   - Verify Supabase keys are correct
   - Check CORS settings
   - Ensure secret key is set

### Getting Help

- Check application logs
- Verify environment variables
- Test API endpoints with curl/Postman
- Check Supabase dashboard for database issues

## 📝 License

[Add your license information here]
