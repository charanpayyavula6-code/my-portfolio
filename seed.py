import os
from app import create_app
from app.extensions import db
from app.models import (
    Admin, Profile, Project, Skill, Experience, Education, 
    Certification, Achievement, Service
)

app = create_app()

def seed_database():
    with app.app_context():
        # Create all tables if not exists
        db.create_all()

        # 1. Seed Admin
        admin = Admin.query.filter_by(username='admin').first()
        if not admin:
            admin = Admin(
                username='admin',
                email='charanpayyavula6@gmail.com'
            )
            admin.set_password('Admin@12345')
            db.session.add(admin)
            print("[OK] Default Admin account created: admin / Admin@12345")

        # 2. Seed Profile
        profile = Profile.query.first()
        if not profile:
            profile = Profile(
                name="Payyavula Sri Charan",
                tagline="AI/ML Student | Python Developer | Machine Learning Enthusiast",
                typing_titles="AI/ML Student,Python Developer,Machine Learning Enthusiast,Generative AI Explorer,Flask Developer,NLP Practitioner,Problem Solver",
                about_lead="Passionate developer & lifelong learner",
                about_text_1="I'm a passionate 3rd-year B.E. Artificial Intelligence and Machine Learning student at Prathyusha Engineering College, Chennai. I love building intelligent applications that solve real-world problems using cutting-edge technologies.",
                about_text_2="My technical focus spans Machine Learning, Generative AI, NLP, and full-stack Python development. I actively participate in hackathons, build hands-on applications, and continuously expand my skill set through industry certifications.",
                email="charanpayyavula6@gmail.com",
                phone="+91 XXXXXXXXXX",
                location="Chennai, Tamil Nadu, India",
                college="Prathyusha Engineering College",
                degree_branch="B.E. AI & ML",
                github_url="https://github.com/charanpayyavula6-code",
                linkedin_url="https://linkedin.com/in/YOUR_LINKEDIN",
                website_url="https://payyavula-sri-charan-portfolio.vercel.app",
                profile_image="profile.jpg",
                resume_file="Charan_Resume.pdf",
                years_student=3,
                projects_count=20,
                hackathons_count=20,
                certifications_count=10
            )
            db.session.add(profile)
            print("[OK] Profile seeded")

        # 3. Seed Projects
        if Project.query.count() == 0:
            projects_data = [
                {
                    "title": "AI Government Grievance Portal",
                    "category": "ai-ml",
                    "tags": "AI/ML, NLP, Flask, MongoDB",
                    "technologies": "Python, Machine Learning, NLP, Flask, Flask-SQLAlchemy, MongoDB",
                    "short_description": "AI-powered portal for smart government grievance management with NLP categorization, sentiment analysis, and automated priority assignment.",
                    "full_description": "A full-scale intelligent platform that automates public grievance resolution. Incoming citizen complaints are analyzed using Natural Language Processing to detect category, assess urgency through sentiment analysis, and automatically route tasks to relevant government officers.",
                    "features": "AI-based grievance categorization using NLP\nSentiment analysis to detect citizen urgency\nAutomated officer routing and assignment\nOfficer analytics dashboard\nReal-time citizen tracking portal\nMongoDB persistent storage",
                    "gradient_class": "project-img-1",
                    "icon_class": "fas fa-landmark",
                    "github_url": "https://github.com/charanpayyavula6-code",
                    "live_demo_url": "#",
                    "is_featured": True,
                    "display_order": 1
                },
                {
                    "title": "Fake News Detection System",
                    "category": "gen-ai",
                    "tags": "NLP, Generative AI, Python",
                    "technologies": "Python, NLP, Sentence-BERT, Gemini API, Google News API",
                    "short_description": "Intelligent system to detect fake news using NLP, Sentence-BERT embeddings, Gemini API, and Google News API for real-time verification.",
                    "full_description": "An automated fact-checking engine combining transformer-based embeddings with generative AI models. Evaluates news claims against live news feeds to generate instant credibility scores.",
                    "features": "Sentence-BERT semantic embedding pipeline\nGemini API verification analysis\nGoogle News API live cross-referencing\nCredibility scoring system\nFact-checking summary generation",
                    "gradient_class": "project-img-2",
                    "icon_class": "fas fa-newspaper",
                    "github_url": "https://github.com/charanpayyavula6-code",
                    "live_demo_url": "#",
                    "is_featured": True,
                    "display_order": 2
                },
                {
                    "title": "AI Farmer Chatbot",
                    "category": "gen-ai",
                    "tags": "Gen AI, NLP, Chatbot",
                    "technologies": "Python, NLP, Generative AI, RAG",
                    "short_description": "Generative AI-powered chatbot for farmers providing agricultural advice, crop care, pest control, and weather-based recommendations.",
                    "full_description": "A conversational assistant built for the agricultural sector. Offers multilingual farmer assistance on pest control, crop management, soil suitability, and government agricultural welfare schemes.",
                    "features": "Natural language agricultural consultation\nPest & disease identification advice\nWeather-informed crop recommendations\nFertilizer schedule optimization\nGovernment subsidy info",
                    "gradient_class": "project-img-3",
                    "icon_class": "fas fa-seedling",
                    "github_url": "https://github.com/charanpayyavula6-code",
                    "live_demo_url": "#",
                    "is_featured": True,
                    "display_order": 3
                },
                {
                    "title": "Crop Yield Prediction",
                    "category": "data-science",
                    "tags": "Data Science, Machine Learning",
                    "technologies": "Python, Pandas, Scikit-learn, Matplotlib, ML",
                    "short_description": "Machine learning model predicting crop yields based on environmental factors, soil data, and historical agricultural data.",
                    "full_description": "End-to-end data science project utilizing multiple regression algorithms (Random Forest, Gradient Boosting) to forecast agricultural yields based on soil composition, rainfall, and temperature.",
                    "features": "Soil chemistry & environmental factor analysis\nHistorical yield data processing with Pandas\nMulti-model comparison & evaluation\nFeature importance visualization\nYield forecast reports",
                    "gradient_class": "project-img-4",
                    "icon_class": "fas fa-tractor",
                    "github_url": "https://github.com/charanpayyavula6-code",
                    "live_demo_url": "#",
                    "is_featured": True,
                    "display_order": 4
                },
                {
                    "title": "Hospital Management System",
                    "category": "java",
                    "tags": "Java, SQL, MySQL",
                    "technologies": "Java, SQL, JDBC, MySQL",
                    "short_description": "Comprehensive hospital management system built with Java and SQL for managing patients, doctors, appointments, and medical records.",
                    "full_description": "Desktop-based healthcare management application designed for clinic operations. Streamlines patient registrations, physician schedules, billing calculations, and prescription archives.",
                    "features": "Patient admission & record management\nDoctor appointment scheduling\nPrescription & diagnosis database\nBilling & receipt generation\nSecure database transactions",
                    "gradient_class": "project-img-5",
                    "icon_class": "fas fa-hospital",
                    "github_url": "https://github.com/charanpayyavula6-code",
                    "live_demo_url": "#",
                    "is_featured": True,
                    "display_order": 5
                },
                {
                    "title": "Student Leave Portal",
                    "category": "web",
                    "tags": "Web Dev, Frontend, JavaScript",
                    "technologies": "HTML5, CSS3, JavaScript, REST APIs",
                    "short_description": "Frontend web portal for students to submit, track, and manage leave applications with a clean, responsive interface.",
                    "full_description": "A responsive academic leave tracking application featuring role-based workflows, live status indicators, and clean form validation.",
                    "features": "Leave application submission\nReal-time status tracking\nApproval history timeline\nFully responsive mobile UI\nFast client-side validation",
                    "gradient_class": "project-img-6",
                    "icon_class": "fas fa-user-graduate",
                    "github_url": "https://github.com/charanpayyavula6-code",
                    "live_demo_url": "#",
                    "is_featured": True,
                    "display_order": 6
                }
            ]
            for p in projects_data:
                db.session.add(Project(**p))
            print("[OK] Projects seeded")

        # 4. Seed Skills
        if Skill.query.count() == 0:
            skills_data = [
                # Programming Languages
                ("Python", "Programming Languages", "Advanced", "fab fa-python", 1),
                ("Java", "Programming Languages", "Intermediate", "fab fa-java", 2),
                ("C", "Programming Languages", "Intermediate", "fas fa-copyright", 3),
                ("SQL", "Programming Languages", "Intermediate", "fas fa-database", 4),
                ("JavaScript", "Programming Languages", "Intermediate", "fab fa-js-square", 5),
                # AI / Machine Learning
                ("Machine Learning", "AI / Machine Learning", "Intermediate", "fas fa-chart-line", 6),
                ("Deep Learning", "AI / Machine Learning", "Intermediate", "fas fa-network-wired", 7),
                ("NLP", "AI / Machine Learning", "Intermediate", "fas fa-comment-dots", 8),
                ("Generative AI", "AI / Machine Learning", "Intermediate", "fas fa-robot", 9),
                ("RAG", "AI / Machine Learning", "Beginner", "fas fa-search", 10),
                ("Computer Vision", "AI / Machine Learning", "Beginner", "fas fa-eye", 11),
                ("Vector Search", "AI / Machine Learning", "Beginner", "fas fa-vector-square", 12),
                # Frameworks & Libraries
                ("Flask", "Frameworks & Libraries", "Intermediate", "fas fa-flask", 13),
                ("TensorFlow / Keras", "Frameworks & Libraries", "Intermediate", "fas fa-brain", 14),
                ("Scikit-learn", "Frameworks & Libraries", "Intermediate", "fas fa-cogs", 15),
                ("Pandas", "Frameworks & Libraries", "Intermediate", "fas fa-table", 16),
                ("Matplotlib", "Frameworks & Libraries", "Intermediate", "fas fa-chart-bar", 17),
                ("Sentence-BERT", "Frameworks & Libraries", "Beginner", "fas fa-language", 18),
                # Databases
                ("MySQL", "Databases", "Intermediate", "fas fa-database", 19),
                ("MongoDB", "Databases", "Intermediate", "fas fa-leaf", 20),
                # Web Technologies
                ("HTML5", "Web Technologies", "Intermediate", "fab fa-html5", 21),
                ("CSS3", "Web Technologies", "Intermediate", "fab fa-css3-alt", 22),
                ("JavaScript", "Web Technologies", "Intermediate", "fab fa-js", 23),
                ("REST APIs", "Web Technologies", "Intermediate", "fas fa-plug", 24),
                # Developer Tools
                ("Git", "Developer Tools", "Intermediate", "fab fa-git-alt", 25),
                ("GitHub", "Developer Tools", "Intermediate", "fab fa-github", 26),
                ("Docker", "Developer Tools", "Beginner", "fab fa-docker", 27),
                ("Jupyter Notebook", "Developer Tools", "Intermediate", "fas fa-book-open", 28),
                ("VS Code", "Developer Tools", "Intermediate", "fas fa-code", 29)
            ]
            for name, cat, lvl, icon, order in skills_data:
                db.session.add(Skill(name=name, category=cat, level=lvl, icon_class=icon, display_order=order))
            print("[OK] Skills seeded")

        # 5. Seed Experience
        if Experience.query.count() == 0:
            exp_data = [
                {
                    "role": "Machine Learning Intern",
                    "company": "CodeAlpha",
                    "duration": "July 2026 – July 2026",
                    "location": "Remote",
                    "description": "Completed a machine learning internship working on real-world ML problems. Applied data preprocessing pipelines, feature engineering, and model evaluation techniques.",
                    "achievements": "Built and evaluated supervised machine learning models\nImplemented data cleaning and preprocessing pipelines\nApplied NLP algorithms for text feature extraction\nDelivered project documentation on schedule",
                    "technologies": "Python, Machine Learning, Scikit-learn, NLP",
                    "display_order": 1
                },
                {
                    "role": "Machine Learning Intern",
                    "company": "Unified Mentor Pvt. Ltd.",
                    "duration": "Up to 6 months",
                    "location": "Remote",
                    "description": "Engaged in hands-on data science and machine learning tasks. Gained practical experience in real-world ML model development, training, and testing.",
                    "achievements": "Developed ML models for practical use cases\nHandled exploratory data analysis on complex datasets\nCollaborated on AI/ML solution architectures\nDocumented performance metrics and model comparisons",
                    "technologies": "Python, Machine Learning, Data Science, TensorFlow",
                    "display_order": 2
                }
            ]
            for exp in exp_data:
                db.session.add(Experience(**exp))
            print("[OK] Experience seeded")

        # 6. Seed Education
        if Education.query.count() == 0:
            edu_data = [
                {
                    "degree": "B.E. — Artificial Intelligence & Machine Learning",
                    "institution": "Prathyusha Engineering College, Chennai",
                    "year": "2024 – Present",
                    "status_label": "3rd Year — Ongoing",
                    "grade": "Add CGPA here",
                    "description": "Currently pursuing Bachelor of Engineering in AI & ML. Actively engaged in machine learning projects, hackathons, and technical certifications.",
                    "display_order": 1
                },
                {
                    "degree": "Higher Secondary Education (12th)",
                    "institution": "SR Junior College",
                    "year": "Add Year",
                    "status_label": "Completed",
                    "grade": "Add Marks / Grade",
                    "description": "Completed Higher Secondary with Mathematics, Physics, and Chemistry (MPC). Strong foundation in analytical problem solving.",
                    "display_order": 2
                },
                {
                    "degree": "Secondary Education (10th)",
                    "institution": "Rainbow High School",
                    "year": "Add Year",
                    "status_label": "Completed",
                    "grade": "Add Marks / GPA",
                    "description": "Completed Secondary Education (SSC Board) with a strong academic foundation in science and mathematics.",
                    "display_order": 3
                }
            ]
            for edu in edu_data:
                db.session.add(Education(**edu))
            print("[OK] Education seeded")

        # 7. Seed Certifications
        if Certification.query.count() == 0:
            certs_data = [
                ("MongoDB Basics for Students", "MongoDB University", "2024", "fas fa-leaf", 1),
                ("Building RAG Apps Using MongoDB", "MongoDB University", "2024", "fas fa-search", 2),
                ("Building AI-Powered Search with MongoDB Vector Search", "MongoDB University", "2024", "fas fa-vector-square", 3),
                ("AI and Innovation: How MongoDB Enables a Resilient AI Strategy", "MongoDB University", "2024", "fas fa-lightbulb", 4),
                ("Generative AI with AWS", "Amazon Web Services", "2024", "fab fa-aws", 5),
                ("Generative AI Literacy", "Various Platform", "2024", "fas fa-robot", 6),
            ]
            for title, issuer, yr, icon, order in certs_data:
                db.session.add(Certification(title=title, issuer=issuer, issue_date=yr, icon_class=icon, display_order=order))
            print("[OK] Certifications seeded")

        # 8. Seed Achievements
        if Achievement.query.count() == 0:
            ach_data = [
                ("Hackathon Participation", "Hackathons", "Participated in 20+ hackathons building innovative AI/ML prototypes under time constraints.", "fas fa-trophy", 1),
                ("Technical Competitions", "Competitions", "Actively participated in college and inter-college coding contests and project expos.", "fas fa-code", 2),
                ("Bootcamps & Workshops", "Workshops", "Attended specialized bootcamps on Machine Learning, Deep Learning, and Cloud AI.", "fas fa-laptop-code", 3),
                ("Technical Certifications", "Certifications", "Earned 10+ industry certifications from MongoDB University, AWS, and leading platforms.", "fas fa-certificate", 4),
                ("Research & Innovation", "Research", "Engaged in hands-on exploration of RAG, Sentence-BERT, and LLM-powered applications.", "fas fa-flask", 5),
                ("Community & Collaboration", "Community", "Active contributor in technical communities and collaborative developer groups.", "fas fa-users", 6)
            ]
            for title, cat, desc, icon, order in ach_data:
                db.session.add(Achievement(title=title, category=cat, description=desc, icon_class=icon, display_order=order))
            print("[OK] Achievements seeded")

        # 9. Seed Services
        if Service.query.count() == 0:
            svc_data = [
                {
                    "title": "AI/ML Development",
                    "description": "Design and build machine learning models and intelligent applications to solve real-world problems.",
                    "icon_class": "fas fa-brain",
                    "features": "ML Model Development\nData Preprocessing & Analysis\nModel Evaluation & Optimization",
                    "display_order": 1
                },
                {
                    "title": "Python Development",
                    "description": "Python automation scripts, data processing pipelines, and backend application development using Flask.",
                    "icon_class": "fab fa-python",
                    "features": "Automation Scripts\nData Processing Pipelines\nFlask Backend Development",
                    "display_order": 2
                },
                {
                    "title": "Web Development",
                    "description": "Responsive and clean frontend web applications using HTML, CSS, and JavaScript, integrated with Flask backends.",
                    "icon_class": "fas fa-globe",
                    "features": "Responsive Frontend Design\nFlask Web Applications\nREST API Integration",
                    "display_order": 3
                },
                {
                    "title": "AI-Powered Applications",
                    "description": "Build intelligent applications powered by Generative AI, RAG pipelines, NLP, and vector search technologies.",
                    "icon_class": "fas fa-robot",
                    "features": "Generative AI Integration\nRAG Pipelines\nNLP Applications",
                    "display_order": 4
                },
                {
                    "title": "Data Analysis",
                    "description": "Exploratory data analysis, data visualization, feature engineering, and ML-based insights.",
                    "icon_class": "fas fa-chart-bar",
                    "features": "Exploratory Data Analysis\nData Visualization\nFeature Engineering",
                    "display_order": 5
                },
                {
                    "title": "Chatbot Development",
                    "description": "Build conversational AI chatbots powered by NLP and generative AI for domain-specific assistance.",
                    "icon_class": "fas fa-comments",
                    "features": "NLP-based Chatbots\nLLM Integration\nDomain-specific Assistants",
                    "display_order": 6
                }
            ]
            for svc in svc_data:
                db.session.add(Service(**svc))
            print("[OK] Services seeded")

        db.session.commit()
        print("[SUCCESS] Database seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
