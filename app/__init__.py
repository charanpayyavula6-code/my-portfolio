import os
from flask import Flask, render_template
from config import config_by_name
from app.extensions import db, login_manager, csrf

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    for sub in ['profile', 'projects', 'certificates', 'resume']:
        os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], sub), exist_ok=True)

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)

    # Register Blueprints
    from app.public.routes import public_bp
    from app.auth.routes import auth_bp
    from app.admin.routes import admin_bp

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
