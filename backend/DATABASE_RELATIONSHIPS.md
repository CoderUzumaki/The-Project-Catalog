# Database Schema and Relationships

## Overview
The application has three main entities: Users, Ideas, and Projects, with specific relationships between them.

## Entity Relationships

### 1. User → Ideas (One-to-Many)
- **One user can propose many ideas**
- A user can have unlimited ideas
- Each idea belongs to exactly one user (the proposer)

```python
# User model
ideas = db.relationship('Idea', backref='user', lazy=True)

# Idea model  
user_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)
```

### 2. User → Projects (One-to-Many)
- **One user can create many projects**
- A user can implement multiple projects
- Each project belongs to exactly one user (the implementer)

```python
# User model
projects = db.relationship('Project', backref='user', lazy=True)

# Project model
user_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)
```

### 3. Idea → Project (One-to-One)
- **One project belongs to exactly one idea**
- Each idea can have at most one project implementation
- Not all ideas need to have projects (ideas can remain unimplemented)

```python
# Project model
idea_id = db.Column(UUID, db.ForeignKey('ideas.id'), nullable=False, unique=True)
idea = db.relationship('Idea', backref=db.backref('project', uselist=False))

# Idea model gets 'project' backref automatically
```

## Database Tables

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    github_username VARCHAR(100),
    auth_id UUID UNIQUE NOT NULL,  -- Supabase auth ID
    email VARCHAR(120) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Ideas Table
```sql
CREATE TABLE ideas (
    id UUID PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    like_count INTEGER DEFAULT 0,
    dislike_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'proposed',  -- proposed, in_progress, completed
    user_id UUID NOT NULL REFERENCES users(id)
);
```

### Projects Table
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(300),
    repo_url VARCHAR(300) NOT NULL,
    live_url VARCHAR(300),
    tags TEXT[],  -- Array of strings
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    like_count INTEGER DEFAULT 0,
    dislike_count INTEGER DEFAULT 0,
    user_id UUID NOT NULL REFERENCES users(id),
    idea_id UUID NOT NULL UNIQUE REFERENCES ideas(id)  -- One-to-one constraint
);
```

## Usage Examples

### Creating an Idea
```python
# User proposes a new idea
new_idea = Idea.create(
    title="AI Code Review Tool",
    description="An AI-powered tool that reviews code and suggests improvements",
    user_id=current_user.auth_id
)
db.session.add(new_idea)
db.session.commit()
```

### Implementing an Idea as a Project
```python
# User implements an idea into a project
idea = Idea.query.filter_by(id=idea_id).first()

if not idea.has_project():  # Check if idea is not already implemented
    new_project = Project.create(
        title=idea.title,
        description="Implementation of the AI code review idea",
        repo_url="https://github.com/user/ai-code-review",
        user_id=current_user.auth_id,
        idea_id=idea.id,
        live_url="https://ai-code-review.example.com",
        tags=["AI", "Code Review", "Python"]
    )
    db.session.add(new_project)
    db.session.commit()
```

### Querying Relationships
```python
# Get all ideas by a user
user_ideas = User.query.filter_by(auth_id=user_id).first().ideas

# Get all projects by a user
user_projects = User.query.filter_by(auth_id=user_id).first().projects

# Check if an idea has been implemented
idea = Idea.query.filter_by(id=idea_id).first()
if idea.has_project():
    project = idea.project
    print(f"Idea '{idea.title}' was implemented as project '{project.title}'")

# Get the original idea for a project
project = Project.query.filter_by(id=project_id).first()
original_idea = project.idea
print(f"Project '{project.title}' was based on idea '{original_idea.title}'")
```

## Business Logic Rules

1. **Ideas are independent**: Users can propose ideas without implementing them
2. **Projects must be based on ideas**: Every project must reference an existing idea
3. **One implementation per idea**: Each idea can only be implemented once (enforced by unique constraint)
4. **Different users can implement others' ideas**: The user who implements a project doesn't have to be the same as the user who proposed the idea
5. **Idea status tracking**: Ideas have a status field to track their lifecycle (proposed → in_progress → completed)

## Migration Commands

When you make changes to models, run:
```bash
flask db migrate -m "Add idea-project relationship"
flask db upgrade
```
