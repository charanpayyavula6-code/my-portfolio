from flask import Blueprint, render_template, request, jsonify, flash, redirect, url_for, current_app, send_from_directory
from app.extensions import db, csrf
from app.models import (
    Profile, Project, Skill, Experience, Education, 
    Certification, Achievement, Service, ContactMessage
)

public_bp = Blueprint('public', __name__)

@public_bp.route('/')
def index():
    profile = Profile.query.first()
    if not profile:
        profile = Profile()

    projects = Project.query.order_by(Project.display_order.asc(), Project.created_at.desc()).all()
    skills = Skill.query.order_by(Skill.display_order.asc(), Skill.name.asc()).all()
    
    # Categorize skills for clean rendering
    skills_by_category = {}
    for skill in skills:
        cat = skill.category
        if cat not in skills_by_category:
            skills_by_category[cat] = []
        skills_by_category[cat].append(skill)
        
    experiences = Experience.query.order_by(Experience.display_order.asc()).all()
    educations = Education.query.order_by(Education.display_order.asc()).all()
    certifications = Certification.query.order_by(Certification.display_order.asc()).all()
    achievements = Achievement.query.order_by(Achievement.display_order.asc()).all()
    services = Service.query.filter_by(is_active=True).order_by(Service.display_order.asc()).all()

    return render_template(
        'public/index.html',
        profile=profile,
        projects=projects,
        skills_by_category=skills_by_category,
        experiences=experiences,
        educations=educations,
        certifications=certifications,
        achievements=achievements,
        services=services
    )

@public_bp.route('/contact', methods=['POST'])
def contact():
    # Supports both AJAX JSON and standard form submissions
    if request.is_json:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
    else:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()

    if not name or not email or not subject or not message:
        if request.is_json:
            return jsonify({'success': False, 'message': 'All fields are required.'}), 400
        flash('Please fill in all required fields.', 'danger')
        return redirect(url_for('public.index') + '#contact')

    msg = ContactMessage(name=name, email=email, subject=subject, message=message)
    db.session.add(msg)
    db.session.commit()

    if request.is_json:
        return jsonify({'success': True, 'message': 'Thank you! Your message has been received.'})

    flash('Thank you! Your message has been sent successfully.', 'success')
    return redirect(url_for('public.index') + '#contact')

@public_bp.route('/uploads/<path:filename>')
def custom_uploads(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

@public_bp.route('/api/projects/<int:id>')
def project_details(id):
    project = Project.query.get_or_404(id)
    return jsonify({
        'id': project.id,
        'title': project.title,
        'category': project.category,
        'tags': project.tags,
        'short_description': project.short_description,
        'full_description': project.full_description or project.short_description,
        'features': project.get_features_list(),
        'technologies': project.get_tech_list(),
        'github_url': project.github_url or '#',
        'live_demo_url': project.live_demo_url or '#',
        'image_file': project.image_file
    })
