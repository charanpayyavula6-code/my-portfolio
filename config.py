import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'charan-portfolio-super-secure-production-secret-key-2026')
    
    # Detect serverless / read-only filesystem
    is_serverless = bool(
        os.getenv('VERCEL') or 
        os.getenv('AWS_LAMBDA_FUNCTION_NAME') or 
        os.getenv('LAMBDA_TASK_ROOT') or
        not os.access(BASE_DIR, os.W_OK)
    )

    if is_serverless:
        default_db = 'sqlite:////tmp/portfolio.db'
        default_uploads = '/tmp/uploads'
    else:
        default_db = f'sqlite:///{os.path.join(BASE_DIR, "portfolio.db")}'
        default_uploads = os.path.join(BASE_DIR, 'app', 'static', 'uploads')

    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', default_db)
    if SQLALCHEMY_DATABASE_URI and SQLALCHEMY_DATABASE_URI.startswith('postgres://'):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace('postgres://', 'postgresql://', 1)
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # CSRF & Session config for Serverless
    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = 3600
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # File upload configurations
    UPLOAD_FOLDER = default_uploads
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024)) # 16 MB max
    ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'}
    ALLOWED_DOC_EXTENSIONS = {'pdf', 'doc', 'docx'}

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
