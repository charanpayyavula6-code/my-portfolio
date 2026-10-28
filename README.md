# Payyavula Sri Charan — AI/ML & Full-Stack Portfolio

[![Frontend - React 19](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](./frontend)
[![Backend - Django 6.1](https://img.shields.io/badge/Backend-Django%206.1%20%7C%20DRF-092E20?logo=django&logoColor=white)](./backend)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Interactive, high-performance portfolio engineered for **Payyavula Sri Charan** — AI/ML Engineer, Python & Backend Developer, and B.E. Computer Science student (Specialization: AI & ML at Prathyusha Engineering College).

---

## ⚡ Key Highlights & Architecture

- **Modern Architecture**: Decoupled Full-Stack system featuring a **React 19 + Vite** frontend and a **Django REST Framework (DRF)** backend API.
- **AI Copilot Experience**: Built-in interactive AI Copilot with prompt suggestions, live API integration, and natural conversation about skills, research, and projects.
- **Neural Cyber Deck**: Interactive UI with particle effects, sound effects, dynamic theme switcher, and sound toggle.
- **Showcase & Filter System**: Categorized flagship projects with search filters (AI & Machine Learning, Full-Stack & Systems, NLP, etc.) and deep modal views.
- **Verified Credentials**: Live verified academic background, 10 industry certifications, and CodeAlpha ML engineering internship history.

---

## 📁 Repository Structure

```text
my-portfolio/
├── frontend/                     # React 19 + Vite + Framer Motion
│   ├── public/                   # Static assets & favicon
│   ├── src/
│   │   ├── components/           # Navbar, Hero, About, Projects, AICopilot, Contact, etc.
│   │   ├── data/                 # Certified profile, project specs, and skills data
│   │   ├── styles/               # Glassmorphism, cyber design tokens, responsive CSS
│   │   └── utils/                # Audio sound synthesis and interaction helpers
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Django 6.1 + Django REST Framework API
│   ├── api/                      # REST endpoints, serializers, models, and migrations
│   │   └── management/commands/  # Seed verified portfolio data script
│   ├── portfolio_backend/        # Core settings, CORS, and ASGI/WSGI routers
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v20+)
- **Python**: 3.10+

---

### 2. Run the Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **`http://localhost:5173/`**

---

### 3. Run the Backend API (Django + DRF)

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations api
python manage.py migrate
python manage.py seed_data
python manage.py runserver 8000
```

Backend runs at **`http://localhost:8000/`**  
Health check endpoint: **`http://localhost:8000/api/health/`**

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Root and documentation index |
| `GET` | `/api/health/` | System & database health status |
| `GET` | `/api/profile/` | Sri Charan's verified profile details |
| `GET` | `/api/projects/` | List flagship projects (`?featured=true`, `?category=AI`) |
| `GET` | `/api/skills/` | List technical competencies & proficiency levels |
| `GET` | `/api/certifications/`| List verified academic & industry credentials |
| `POST`| `/api/contact/` | Submit visitor inquiry with automatic validation |
| `POST`| `/api/ai/chat/` | Query Charan AI Copilot about experience & projects |

---

## 👤 Author

**Payyavula Sri Charan**  
- **GitHub**: [@charanpayyavula6-code](https://github.com/charanpayyavula6-code)  
- **LinkedIn**: [sricharan-payyavula](https://www.linkedin.com/in/sricharan-payyavula/)  
- **Email**: charanpayyavula6@gmail.com  
- **Institution**: Prathyusha Engineering College, Chennai (B.E. CSE - AIML)
