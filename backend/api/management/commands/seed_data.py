from django.core.management.base import BaseCommand
from api.models import Project, Skill, Certification, Education

class Command(BaseCommand):
    help = "Seed database with Payyavula Sri Charan's verified portfolio credentials"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Seeding portfolio database..."))

        # 1. Seed Projects
        projects_data = [
            {
                "title": "Fake News Detection System",
                "slug": "fake-news-detection-system",
                "category": "AI/ML & NLP",
                "status": "Deployed & Verified",
                "short_description": "Multimodal NLP fact verification system combining Sentence-BERT embeddings, Gemini API reasoning, and SQL audit persistence.",
                "full_description": "Architected an end-to-end intelligent NLP pipeline to classify news statements as credible, questionable, or fabricated. Leveraged Sentence-BERT for semantic text vectorization, integrated Google Gemini LLM API for zero-shot logical claim corroboration, and built a Python Flask REST backend backed by relational SQL schemas.",
                "technologies": ["Python", "Flask", "Sentence-BERT", "Gemini API", "SQL", "Scikit-learn"],
                "metrics": {"Accuracy": "94.2%", "F1-Score": "0.93", "Inference Latency": "42ms"},
                "highlights": [
                    "Engineered cosine similarity ranking between claims and authoritative news corpora.",
                    "Reduced hallucination rates through prompt constraint schemas and structured JSON outputs.",
                    "Normalized relational database schemas to log verification audit trails."
                ],
                "github_url": "https://github.com/charanpayyavula6-code",
                "live_url": "https://payyavula-sri-charan-portfolio.vercel.app/",
                "featured": True,
                "order": 1
            },
            {
                "title": "Speech Emotion Recognition Engine",
                "slug": "speech-emotion-recognition-engine",
                "category": "Audio Signal ML",
                "status": "Production Prototype",
                "short_description": "Real-time acoustic emotion classification pipeline extracting MFCC features, spectrogram transforms, and telemetry.",
                "full_description": "Designed a real-time audio machine learning engine capable of classifying human emotional states (neutral, happy, stressed, anger) from speech waveforms. Extracts 40 Mel-Frequency Cepstral Coefficients (MFCCs), chroma, and spectral contrast features.",
                "technologies": ["Python", "Flask", "Audio ML", "MFCC", "NumPy", "Scipy"],
                "metrics": {"Sample Rate": "44.1 kHz", "Accuracy": "89.6%", "Classification Time": "38ms"},
                "highlights": [
                    "Engineered sliding window feature extraction for uninterrupted live audio streams.",
                    "Preprocessed audio with noise suppression, silence trimming, and amplitude normalization.",
                    "Deployed a Flask REST microservice emitting visual frequency telemetry."
                ],
                "github_url": "https://github.com/charanpayyavula6-code",
                "live_url": "https://payyavula-sri-charan-portfolio.vercel.app/",
                "featured": True,
                "order": 2
            },
            {
                "title": "Real-Time PPE Compliance Detector",
                "slug": "real-time-ppe-compliance-detector",
                "category": "Computer Vision",
                "status": "Production Ready",
                "short_description": "High-throughput industrial safety compliance vision inference tracking helmets, vests, and eyewear.",
                "full_description": "Developed a computer vision surveillance system powered by fine-tuned YOLOv8 neural networks for automated workplace safety compliance. Achieves 32 FPS on GPU and 14 FPS on CPU runtimes.",
                "technologies": ["Python", "YOLOv8", "OpenCV", "PyTorch", "FastAPI"],
                "metrics": {"Frame Rate": "32 FPS", "mAP@50": "92.8%", "Detection Latency": "31ms"},
                "highlights": [
                    "Trained custom bounding box models across diverse industrial lighting conditions.",
                    "Optimized OpenCV pipeline with asynchronous frame capture buffers.",
                    "Integrated automated violation logging with snapshot capture."
                ],
                "github_url": "https://github.com/charanpayyavula6-code",
                "live_url": "https://payyavula-sri-charan-portfolio.vercel.app/",
                "featured": True,
                "order": 3
            },
            {
                "title": "Clinical Disease Risk Predictor",
                "slug": "clinical-disease-risk-predictor",
                "category": "Healthcare ML",
                "status": "Completed (CodeAlpha)",
                "short_description": "Comparative supervised machine learning pipeline evaluating multi-disease risk across demographic and laboratory biomarkers.",
                "full_description": "Engineered during the CodeAlpha ML Engineer Internship. Built supervised classification pipelines comparing Support Vector Machines (SVM), Random Forest, Logistic Regression, and XGBoost classifiers.",
                "technologies": ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib"],
                "metrics": {"ROC-AUC": "0.96", "Cross-Val F1": "0.92", "Datasets Evaluated": "4"},
                "highlights": [
                    "Engineered feature normalization, missing value imputation, and correlation pruning.",
                    "Implemented 10-fold cross validation with hyperparameter grid search tuning.",
                    "Delivered clinical risk probability scoring matrices."
                ],
                "github_url": "https://github.com/charanpayyavula6-code",
                "live_url": "https://payyavula-sri-charan-portfolio.vercel.app/",
                "featured": True,
                "order": 4
            }
        ]

        for p_data in projects_data:
            Project.objects.update_or_create(slug=p_data["slug"], defaults=p_data)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(projects_data)} Projects."))

        # 2. Seed Skills
        skills_data = [
            # AI & ML
            {"name": "Scikit-learn & Applied ML", "category": "ai_ml", "proficiency": 94, "level": "Advanced", "order": 1},
            {"name": "Natural Language Processing (NLP)", "category": "ai_ml", "proficiency": 92, "level": "Advanced", "order": 2},
            {"name": "Computer Vision & YOLO", "category": "ai_ml", "proficiency": 90, "level": "Advanced", "order": 3},
            {"name": "Sentence-BERT & Embeddings", "category": "ai_ml", "proficiency": 88, "level": "Advanced", "order": 4},
            {"name": "Gemini API & LLM Prompting", "category": "ai_ml", "proficiency": 89, "level": "Advanced", "order": 5},
            {"name": "PyTorch Fundamentals", "category": "ai_ml", "proficiency": 84, "level": "Proficient", "order": 6},
            # Backend
            {"name": "Python 3 (OOP & Systems)", "category": "backend", "proficiency": 95, "level": "Advanced", "order": 1},
            {"name": "Django & Django REST Framework", "category": "backend", "proficiency": 92, "level": "Advanced", "order": 2},
            {"name": "Flask Microservices", "category": "backend", "proficiency": 90, "level": "Advanced", "order": 3},
            {"name": "Java (OOP & Core)", "category": "backend", "proficiency": 86, "level": "Proficient", "order": 4},
            {"name": "RESTful API Architecture", "category": "backend", "proficiency": 92, "level": "Advanced", "order": 5},
            # Frontend
            {"name": "React & Modern Hooks", "category": "frontend", "proficiency": 90, "level": "Advanced", "order": 1},
            {"name": "JavaScript (ES6+)", "category": "frontend", "proficiency": 91, "level": "Advanced", "order": 2},
            {"name": "HTML5 & Modern CSS3", "category": "frontend", "proficiency": 94, "level": "Advanced", "order": 3},
            # Database
            {"name": "SQL & Relational Schemas", "category": "database", "proficiency": 92, "level": "Advanced", "order": 1},
            {"name": "MySQL & SQLite", "category": "database", "proficiency": 89, "level": "Advanced", "order": 2},
            {"name": "MongoDB Atlas", "category": "database", "proficiency": 82, "level": "Proficient", "order": 3},
            # Tools
            {"name": "Git & GitHub Version Control", "category": "devops", "proficiency": 92, "level": "Advanced", "order": 1},
            {"name": "Postman API Testing", "category": "devops", "proficiency": 88, "level": "Advanced", "order": 2},
            {"name": "Linux / Shell Scripting", "category": "devops", "proficiency": 85, "level": "Proficient", "order": 3},
        ]

        for s_data in skills_data:
            Skill.objects.update_or_create(name=s_data["name"], defaults=s_data)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(skills_data)} Skills."))

        # 3. Seed Certifications
        certs_data = [
            {"title": "Machine Learning Engineer Internship Certification", "issuer": "CodeAlpha", "date_earned": "August 2026", "verified": True, "skills": ["SVM", "Logistic Regression", "Random Forest", "XGBoost"], "order": 1},
            {"title": "Research Publication: AI in the Workplace", "issuer": "Sage Scholar / IEEE EBSCO", "date_earned": "2026", "verified": True, "skills": ["AI Adoption", "Automation", "Workforce Transition"], "order": 2},
            {"title": "Joy of Computing using Python", "issuer": "NPTEL (IIT Madras / Swayam)", "date_earned": "2025", "verified": True, "skills": ["Python", "Algorithms", "Data Structures"], "order": 3},
            {"title": "Introduction to Internet of Things", "issuer": "NPTEL", "date_earned": "2025", "verified": True, "skills": ["IoT Architecture", "Sensors", "Embedded Protocols"], "order": 4},
            {"title": "Database Management Systems (DBMS)", "issuer": "NPTEL", "date_earned": "2025", "verified": True, "skills": ["SQL", "Normalization", "Relational Algebra"], "order": 5},
            {"title": "Programming in Java", "issuer": "NPTEL", "date_earned": "2025", "verified": True, "skills": ["Java OOP", "Collections", "Multithreading"], "order": 6},
            {"title": "Prompt Engineering with Generative AI", "issuer": "Coursera", "date_earned": "2025", "verified": True, "skills": ["Zero-shot", "Few-shot", "Chain-of-Thought"], "order": 7},
            {"title": "Python for Data Science & AI", "issuer": "Coursera", "date_earned": "2024", "verified": True, "skills": ["NumPy", "Pandas", "Matplotlib"], "order": 8},
            {"title": "Introduction to Machine Learning", "issuer": "Coursera", "date_earned": "2024", "verified": True, "skills": ["Supervised Learning", "Classification", "Regression"], "order": 9},
            {"title": "Web Development Fundamentals", "issuer": "Infosys Springboard", "date_earned": "2024", "verified": True, "skills": ["HTML5", "CSS3", "JavaScript"], "order": 10},
        ]

        for c_data in certs_data:
            Certification.objects.update_or_create(title=c_data["title"], defaults=c_data)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(certs_data)} Certifications."))

        # 4. Seed Education
        edu_data = [
            {
                "degree": "B.E. Computer Science and Engineering (AI & ML)",
                "institution": "Prathyusha Engineering College",
                "period": "2024 – 2028",
                "grade": "GPA: 7.5 / 10.0",
                "location": "Chennai, Tamil Nadu",
                "description": "Third-year engineering undergraduate specializing in Artificial Intelligence and Machine Learning. Active in technical research and algorithmic development.",
                "highlights": [
                    "Specialization in Artificial Intelligence and Machine Learning.",
                    "Published research paper on AI workplace transition (Sage Scholar / IEEE EBSCO).",
                    "Core coursework: Design and Analysis of Algorithms, DBMS, Operating Systems, Machine Learning."
                ],
                "order": 1
            },
            {
                "degree": "Secondary Education (Class X)",
                "institution": "Rainbow Em High School",
                "period": "Completed 2022",
                "grade": "First Class with Distinction",
                "location": "Atmakur, Nellore, Andhra Pradesh",
                "description": "Built foundational problem-solving disciplines in mathematics and sciences.",
                "highlights": ["Strong foundations in analytical reasoning, mathematics, and computing."],
                "order": 2
            }
        ]

        for e_data in edu_data:
            Education.objects.update_or_create(degree=e_data["degree"], defaults=e_data)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(edu_data)} Education records."))

        self.stdout.write(self.style.SUCCESS("[OK] All portfolio backend records seeded successfully!"))
