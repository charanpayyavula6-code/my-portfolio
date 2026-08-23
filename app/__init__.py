import os
import sys

_APP_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if _APP_ROOT not in sys.path:
    sys.path.insert(0, _APP_ROOT)

from flask import Flask, render_template
from config import config_by_name
from app.extensions import db, login_manager, csrf

def create_app(config_name='default'):
    is_serverless = bool(os.name == 'posix' or os.getenv('VERCEL') or os.getenv('AWS_LAMBDA_FUNCTION_NAME') or os.getenv('LAMBDA_TASK_ROOT'))
    instance_path = '/tmp' if is_serverless else None
    
    app = Flask(__name__, instance_path=instance_path)
    app.config.from_object(config_by_name[config_name])

    if is_serverless and not os.getenv('DATABASE_URL'):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/portfolio.db'
        app.config['UPLOAD_FOLDER'] = '/tmp/uploads'

    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    for sub in ['profile', 'projects', 'certificates', 'resume']:
        os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], sub), exist_ok=True)

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)

    # Register Blueprints directly from app root
    from app.routes_public import public_bp
    from app.routes_auth import auth_bp
    from app.routes_admin import admin_bp

    app.register_blueprint(public_bp)
    app.register_blueprint(auth_bp, url_prefix='/admin')
    app.register_blueprint(admin_bp, url_prefix='/admin')

    # Error handlers
    @app.errorhandler(403)
    def forbidden_error(error):
        return render_template('errors/403.html'), 403

    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return render_template('errors/500.html'), 500

    # Global Context Processor
    @app.context_processor
    def inject_global_data():
        from app.models import Profile, ContactMessage
        profile = Profile.query.first()
        unread_count = ContactMessage.query.filter_by(is_read=False).count()
        return dict(global_profile=profile, unread_messages_count=unread_count)

    return app
