# 🎓 Full-Stack Student Portfolio Management System with Admin Panel

A production-grade, dynamic portfolio content management system built with **Flask, SQLAlchemy, WTForms, Flask-Login, and Jinja2**.

---

## 🌟 Key Features

### 1. 🌐 Public Portfolio (Frontend)
- **100% Database-Driven**: Content is pulled dynamically from SQLAlchemy models. No hardcoded HTML content.
- **Modern Responsive Design**: Fluid layouts for mobile, tablet, laptop, and 4K desktop screens.
- **Dark/Light Mode**: Smooth theme toggling with `localStorage` persistence.
- **Live Contact Form**: Submissions are validated and stored in the database for the admin to review in their dashboard.
- **Dynamic Project Details**: Fast asynchronous modal fetching via `/api/projects/<id>`.
- **Dynamic Typing Animation**: Configurable title strings rotating in the hero header.

### 2. 🛡️ Secure Admin CMS Dashboard (`/admin/dashboard`)
- **Authentication**: Protected by **Flask-Login** and **Werkzeug password hashing** (never stores plain-text passwords).
- **Comprehensive CRUD Operations**:
  - 📁 **Projects**: Add, edit, delete, mark featured, choose gradients, upload custom project screenshots.
  - ⚡ **Skills**: Add, edit, delete, choose category (Languages, AI/ML, Frameworks, DBs, Web, Tools), and proficiency levels.
  - 💼 **Experience & Internships**: Timeline management for roles, organizations, achievements, and tech stacks.
  - 🎓 **Education**: Track university degree, 12th, and 10th history.
  - 📜 **Certifications**: Manage issuing platforms, verification URLs, and credential IDs.
  - 🏆 **Achievements**: Track hackathon milestones and technical competition results.
  - 🛠️ **Services**: Toggle active/inactive service cards offered.
  - 📥 **Contact Messages Inbox**: View incoming messages with unread notification badges, reply links, and delete options.
  - 👤 **Profile & Bio**: Update personal info, social URLs, counters, upload avatar photo, and upload resume PDF.
  - 🔐 **Security**: In-dashboard admin password update tool.

---

## 🏗️ Project Architecture & Folder Structure

```text
portfolio/
├── app/
│   ├── __init__.py          # Flask App Factory & global error handlers
│   ├── models.py            # SQLAlchemy database models
│   ├── extensions.py        # db, login_manager, csrf instances
│   │
│   ├── auth/                # Admin Authentication Blueprint
│   │   ├── __init__.py
│   │   ├── routes.py        # /admin/login, /admin/logout
│   │   └── forms.py         # LoginForm
│   │
│   ├── admin/               # Admin Management Blueprint
│   │   ├── __init__.py
│   │   ├── routes.py        # CRUD routes for all modules
│   │   └── forms.py         # WTForms with validation & file uploads
│   │
│   ├── public/              # Public Portfolio Blueprint
│   │   ├── __init__.py
│   │   └── routes.py        # / (index), /contact, /api/projects/<id>
│   │
│   ├── templates/
│   │   ├── base.html        # Public base template
│   │   ├── errors/          # 403.html, 404.html, 500.html
│   │   ├── auth/
│   │   │   └── login.html   # Admin login page
│   │   ├── public/
│   │   │   └── index.html   # Dynamic public portfolio
│   │   └── admin/           # Admin CMS templates (dashboard, profile, CRUD views)
│   │
│   └── static/
│       ├── css/             # style.css (public), admin.css (CMS)
│       ├── js/              # script.js (public), admin.js (CMS)
│       └── uploads/         # User uploaded photos, projects, certs, resumes
│
├── config.py                # Environment configurations (SQLite / MySQL)
├── seed.py                  # Database seeder (seeds initial data & default admin)
├── run.py                   # Development server & CLI commands
├── test_app.py              # Automated test suite
├── requirements.txt         # Python dependencies
├── .env                     # Local environment secrets
├── .env.example             # Template environment variables
├── .gitignore
└── README.md
```

---

## 🚀 Quickstart & Local Installation

### Step 1: Clone or Navigate to Project
```bash
cd portfolio
```

### Step 2: Create & Activate Virtual Environment (Optional but Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Seed Database with Initial Data
```bash
python seed.py
```
> **Default Admin Credentials:**
> - **Username:** `admin`
> - **Password:** `Admin@12345`
> *(You can change these in /admin/profile or via CLI)*

### Step 5: Start the Flask Development Server
```bash
python run.py
```
- 🌐 **Public Website:** `http://127.0.0.1:5000/`
- 🛡️ **Admin Panel:** `http://127.0.0.1:5000/admin/login`

---

## 🗄️ Database Configuration

### Using SQLite (Default, Zero-Config)
By default, the application runs on SQLite with the database saved to `portfolio.db`. No installation needed!

### Using MySQL
1. Create a database in MySQL:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. In `.env`, update `DATABASE_URL`:
   ```env
   DATABASE_URL=mysql+pymysql://username:password@localhost:3306/portfolio_db
   ```
3. Run `python seed.py` to create tables and seed initial records into MySQL.

---

## 🛠️ Useful CLI Commands

```bash
# Run tests
python test_app.py

# Create or reset an admin user interactively
flask create-admin

# Re-seed database
python seed.py
```

---

## 🌐 Deployment Options

### Option 1: Render / Railway (Recommended)
1. Push this repository to GitHub.
2. In Render or Railway, create a **New Web Service**.
3. Set **Build Command**: `pip install -r requirements.txt && python seed.py`
4. Set **Start Command**: `gunicorn run:app` (add `gunicorn` to requirements)
5. Add Environment Variables:
   - `SECRET_KEY`: (Generate a secure random string)
   - `DATABASE_URL`: (Connection string from PostgreSQL/MySQL addon or persistent disk for SQLite)

### Option 2: Docker
Create a simple `Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY . .
RUN python seed.py
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
```

---

## 🔌 Future REST API Integration

The architecture is blueprint-isolated and API-ready:
- Existing endpoint: `GET /api/projects/<id>`
- To add external endpoints for a mobile app or frontend:
  Create an `app/api/` blueprint and serialize models to JSON with `jsonify`.

---

## 🔒 Security Best Practices Implemented
- **Passwords**: Werkzeug salt & SHA256 PBKDF2 hashing.
- **CSRF Protection**: All forms guarded with Flask-WTF tokens.
- **File Uploads**: Validated extensions and randomized UUID filenames.
- **Environment Variables**: Sensitive credentials isolated to `.env`.
- **SQL Injection Prevention**: SQLAlchemy parameterized ORM queries.
