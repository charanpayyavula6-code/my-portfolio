from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db, login_manager

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

class Admin(UserMixin, db.Model):
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<Admin {self.username}>'


class Profile(db.Model):
    __tablename__ = 'profile'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, default="Payyavula Sri Charan")
    tagline = db.Column(db.String(255), default="AI/ML Student | Python Developer | Machine Learning Enthusiast")
    typing_titles = db.Column(db.Text, default="AI/ML Student,Python Developer,Machine Learning Enthusiast,Generative AI Explorer,Flask Developer,NLP Practitioner")
    about_lead = db.Column(db.String(255), default="Passionate developer & lifelong learner")
    about_text_1 = db.Column(db.Text, nullable=False)
    about_text_2 = db.Column(db.Text, nullable=True)
    
    # Contact & Social info
    email = db.Column(db.String(120), default="charanpayyavula6@gmail.com")
    phone = db.Column(db.String(50), default="+91 XXXXXXXXXX")
    location = db.Column(db.String(120), default="Chennai, Tamil Nadu, India")
    college = db.Column(db.String(200), default="Prathyusha Engineering College")
    degree_branch = db.Column(db.String(120), default="B.E. AI & ML")
    github_url = db.Column(db.String(255), default="https://github.com/charanpayyavula6")
    linkedin_url = db.Column(db.String(255), default="https://linkedin.com/in/YOUR_LINKEDIN")
    website_url = db.Column(db.String(255), nullable=True)
    
    # Files
    profile_image = db.Column(db.String(255), default="profile.jpg")
    resume_file = db.Column(db.String(255), default="Charan_Resume.pdf")
    
    # Stats
    years_student = db.Column(db.Integer, default=3)
    projects_count = db.Column(db.Integer, default=20)
    hackathons_count = db.Column(db.Integer, default=20)
    certifications_count = db.Column(db.Integer, default=10)
    
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def get_typing_list(self):
        if not self.typing_titles:
            return ["AI/ML Student", "Python Developer"]
        return [t.strip() for t in self.typing_titles.split(",") if t.strip()]


class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(64), nullable=False, default="ai-ml") # ai-ml, web, data-science, java, gen-ai
    tags = db.Column(db.String(255), default="AI/ML, Python")
    short_description = db.Column(db.Text, nullable=False)
    full_description = db.Column(db.Text, nullable=True)
    features = db.Column(db.Text, nullable=True) # newline separated
    technologies = db.Column(db.String(255), nullable=False) # comma separated
    image_file = db.Column(db.String(255), nullable=True)
    gradient_class = db.Column(db.String(64), default="project-img-1") # fallback gradient CSS class
    icon_class = db.Column(db.String(64), default="fas fa-rocket")
    github_url = db.Column(db.String(255), nullable=True)
    live_demo_url = db.Column(db.String(255), nullable=True)
    is_featured = db.Column(db.Boolean, default=True)
    display_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def get_features_list(self):
        if not self.features:
            return []
        return [f.strip() for f in self.features.split('\n') if f.strip()]

    def get_tech_list(self):
        if not self.technologies:
            return []
        return [t.strip() for t in self.technologies.split(',') if t.strip()]

    def get_tags_list(self):
        if not self.tags:
            return []
        return [t.strip() for t in self.tags.split(',') if t.strip()]


class Skill(db.Model):
    __tablename__ = 'skills'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False) # Programming Languages, AI / Machine Learning, Frameworks & Libraries, Databases, Web Technologies, Developer Tools
    level = db.Column(db.String(50), default="Intermediate") # Beginner, Intermediate, Advanced
    icon_class = db.Column(db.String(100), default="fas fa-code")
    display_order = db.Column(db.Integer, default=0)


class Experience(db.Model):
    __tablename__ = 'experiences'
    
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(100), default="Remote / Chennai")
    duration = db.Column(db.String(100), nullable=False) # e.g. July 2026 - July 2026 or Up to 6 months
    description = db.Column(db.Text, nullable=False)
    achievements = db.Column(db.Text, nullable=True) # newline separated bullets
    technologies = db.Column(db.String(255), default="Python, Machine Learning")
    display_order = db.Column(db.Integer, default=0)

    def get_achievements_list(self):
        if not self.achievements:
            return []
        return [a.strip() for a in self.achievements.split('\n') if a.strip()]

    def get_tech_list(self):
        if not self.technologies:
            return []
        return [t.strip() for t in self.technologies.split(',') if t.strip()]


class Education(db.Model):
    __tablename__ = 'educations'
    
    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(150), nullable=False)
    institution = db.Column(db.String(200), nullable=False)
    year = db.Column(db.String(100), nullable=False)
    status_label = db.Column(db.String(100), default="Ongoing")
    grade = db.Column(db.String(100), default="Add CGPA / Grade")
    description = db.Column(db.Text, nullable=True)
    display_order = db.Column(db.Integer, default=0)


class Certification(db.Model):
    __tablename__ = 'certifications'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    issuer = db.Column(db.String(150), nullable=False)
    issue_date = db.Column(db.String(50), default="2024")
    credential_id = db.Column(db.String(100), nullable=True)
    credential_url = db.Column(db.String(255), default="#")
    icon_class = db.Column(db.String(100), default="fas fa-certificate")
    certificate_image = db.Column(db.String(255), nullable=True)
    display_order = db.Column(db.Integer, default=0)


class Achievement(db.Model):
    __tablename__ = 'achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), default="Hackathon")
    description = db.Column(db.Text, nullable=False)
    icon_class = db.Column(db.String(100), default="fas fa-trophy")
    url = db.Column(db.String(255), nullable=True)
    display_order = db.Column(db.Integer, default=0)


class Service(db.Model):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon_class = db.Column(db.String(100), default="fas fa-brain")
    features = db.Column(db.Text, nullable=True) # newline separated
    is_active = db.Column(db.Boolean, default=True)
    display_order = db.Column(db.Integer, default=0)

    def get_features_list(self):
        if not self.features:
            return []
        return [f.strip() for f in self.features.split('\n') if f.strip()]


class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
