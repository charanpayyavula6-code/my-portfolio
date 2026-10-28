# Payyavula Sri Charan Portfolio — Django Backend API

Robust, scalable REST API built with **Python 3**, **Django 6.1**, and **Django REST Framework (DRF)**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure Python 3.10+ is installed on your machine:
```bash
python --version
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Migrations
Initialize the SQLite database schema:
```bash
python manage.py makemigrations api
python manage.py migrate
```

### 4. Seed Verified Portfolio Data
Populate the database with Sri Charan's genuine resume credentials, projects, skills, and certifications:
```bash
python manage.py seed_data
```

### 5. Create Superuser (Optional for Django Admin)
```bash
python manage.py createsuperuser
```

### 6. Start Development Server
```bash
python manage.py runserver 8000
```
Server runs at: `http://localhost:8000/`

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | API Root and documentation index |
| **GET** | `/api/health/` | System & database health status |
| **GET** | `/api/profile/` | Sri Charan's verified profile details |
| **GET** | `/api/projects/` | List flagship projects (`?featured=true`, `?category=AI`) |
| **GET** | `/api/projects/<slug>/` | Get detailed project specification |
| **GET** | `/api/skills/` | List technical competencies & proficiency levels |
| **GET** | `/api/certifications/`| List 10 verified academic/industry credentials |
| **GET** | `/api/education/` | Academic timeline & GPA |
| **POST**| `/api/contact/` | Submit visitor inquiry with automatic validation |
| **POST**| `/api/ai/chat/` | Ask Charan AI Copilot questions about experience & projects |
| **POST**| `/api/analytics/event/` | Track page views and user telemetry |
| **GET** | `/admin/` | Django Administration Console |

---

## 🔒 Security & CORS
- Enabled `django-cors-headers` allowing seamless communication with Vite development frontend (`http://localhost:5173`) and Vercel production build.
- Database: Embedded SQLite with seamless PostgreSQL / MySQL migration support.
