from datetime import datetime
from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from app.models import Admin
from app.forms_auth import LoginForm
from app.extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('admin.dashboard'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user_input = form.username_or_email.data.strip()
        admin = Admin.query.filter((Admin.username == user_input) | (Admin.email == user_input)).first()
        
        if admin and admin.check_password(form.password.data):
            login_user(admin, remember=form.remember_me.data)
            admin.last_login = datetime.utcnow()
            db.session.commit()
            flash(f'Welcome back, {admin.username}!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or url_for('admin.dashboard'))
        else:
            flash('Invalid username/email or password.', 'danger')
            
    return render_template('auth/login.html', form=form)

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out securely.', 'info')
    return redirect(url_for('auth.login'))
