import os
import uuid
from werkzeug.utils import secure_filename
from flask import Blueprint, render_template, redirect, url_for, flash, request, current_app
from flask_login import login_required, current_user
from app.extensions import db
from app.models import (
    Admin, Profile, Project, Skill, Experience, Education, 
    Certification, Achievement, Service, ContactMessage
)
from app.forms_admin import (
    ProfileForm, ProjectForm, SkillForm, ExperienceForm, 
    EducationForm, CertificationForm, AchievementForm, ServiceForm, PasswordChangeForm
)

admin_bp = Blueprint('admin', __name__)

def save_uploaded_file(file_storage, subfolder):
    if not file_storage or not file_storage.filename:
        return None
    original_name = secure_filename(file_storage.filename)
    extension = original_name.rsplit('.', 1)[1].lower() if '.' in original_name else 'dat'
    unique_name = f"{uuid.uuid4().hex[:12]}.{extension}"
    target_dir = os.path.join(current_app.config['UPLOAD_FOLDER'], subfolder)
    os.makedirs(target_dir, exist_ok=True)
    file_storage.save(os.path.join(target_dir, unique_name))
    return f"{subfolder}/{unique_name}"


# ---------------- DASHBOARD ----------------
@admin_bp.route('/dashboard')
@login_required
def dashboard():
    stats = {
        'projects': Project.query.count(),
        'skills': Skill.query.count(),
        'experience': Experience.query.count(),
        'certifications': Certification.query.count(),
        'education': Education.query.count(),
        'achievements': Achievement.query.count(),
        'services': Service.query.count(),
        'messages': ContactMessage.query.count(),
        'unread_messages': ContactMessage.query.filter_by(is_read=False).count()
    }
    recent_messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).limit(5).all()
    recent_projects = Project.query.order_by(Project.created_at.desc()).limit(4).all()
    return render_template('admin/dashboard.html', stats=stats, recent_messages=recent_messages, recent_projects=recent_projects)


# ---------------- PROFILE MANAGEMENT ----------------
@admin_bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    profile_data = Profile.query.first()
    if not profile_data:
        profile_data = Profile(about_text_1="AI/ML Student at Prathyusha Engineering College.")
        db.session.add(profile_data)
        db.session.commit()

    form = ProfileForm(obj=profile_data)
    pwd_form = PasswordChangeForm()

    if request.method == 'POST' and 'name' in request.form:
        if form.validate_on_submit():
            old_image = profile_data.profile_image
            old_resume = profile_data.resume_file
            
            form.populate_obj(profile_data)
            
            # Preserve existing files unless a new file was uploaded
            profile_data.profile_image = old_image
            profile_data.resume_file = old_resume

            # Handle Photo Upload
            if form.profile_image.data and hasattr(form.profile_image.data, 'filename') and form.profile_image.data.filename:
                img_path = save_uploaded_file(form.profile_image.data, 'profile')
                if img_path:
                    profile_data.profile_image = img_path

            # Handle Resume Upload
            if form.resume_file.data and hasattr(form.resume_file.data, 'filename') and form.resume_file.data.filename:
                res_path = save_uploaded_file(form.resume_file.data, 'resume')
                if res_path:
                    profile_data.resume_file = res_path

            db.session.commit()
            flash('Profile information updated successfully! Public website updated.', 'success')
            return redirect(url_for('admin.profile'))
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    flash(f"Error in {getattr(form, field).label.text}: {error}", "danger")

    return render_template('admin/profile.html', form=form, pwd_form=pwd_form, profile=profile_data)


@admin_bp.route('/change-password', methods=['POST'])
@login_required
def change_password():
    pwd_form = PasswordChangeForm()
    if pwd_form.validate_on_submit():
        if not current_user.check_password(pwd_form.current_password.data):
            flash('Current password is incorrect.', 'danger')
        elif pwd_form.new_password.data != pwd_form.confirm_password.data:
            flash('New passwords do not match.', 'danger')
        else:
            current_user.set_password(pwd_form.new_password.data)
            db.session.commit()
            flash('Password changed successfully!', 'success')
    return redirect(url_for('admin.profile'))


# ---------------- PROJECTS CRUD ----------------
@admin_bp.route('/projects')
@login_required
def projects():
    search = request.args.get('search', '').strip()
    category = request.args.get('category', '').strip()
    
    query = Project.query
    if search:
        query = query.filter(Project.title.ilike(f'%{search}%') | Project.technologies.ilike(f'%{search}%'))
    if category and category != 'all':
        query = query.filter(Project.category == category)
        
    all_projects = query.order_by(Project.display_order.asc(), Project.created_at.desc()).all()
    return render_template('admin/projects.html', projects=all_projects, search=search, selected_category=category)


@admin_bp.route('/projects/add', methods=['GET', 'POST'])
@login_required
def add_project():
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project()
        form.populate_obj(project)
        
        if form.image_file.data:
            img_path = save_uploaded_file(form.image_file.data, 'projects')
            if img_path:
                project.image_file = img_path
                
        db.session.add(project)
        db.session.commit()
        flash(f'Project "{project.title}" created successfully!', 'success')
        return redirect(url_for('admin.projects'))
        
    return render_template('admin/project_form.html', form=form, title="Add New Project", is_edit=False)


@admin_bp.route('/projects/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_project(id):
    project = Project.query.get_or_404(id)
    form = ProjectForm(obj=project)
    
    if form.validate_on_submit():
        form.populate_obj(project)
        
        if form.image_file.data:
            img_path = save_uploaded_file(form.image_file.data, 'projects')
            if img_path:
                project.image_file = img_path
                
        db.session.commit()
        flash(f'Project "{project.title}" updated successfully!', 'success')
        return redirect(url_for('admin.projects'))
        
    return render_template('admin/project_form.html', form=form, title=f"Edit Project: {project.title}", is_edit=True, project=project)


@admin_bp.route('/projects/delete/<int:id>', methods=['POST'])
@login_required
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    flash(f'Project "{project.title}" has been deleted.', 'info')
    return redirect(url_for('admin.projects'))


# ---------------- SKILLS CRUD ----------------
@admin_bp.route('/skills', methods=['GET', 'POST'])
@login_required
def skills():
    form = SkillForm()
    if form.validate_on_submit():
        skill = Skill()
        form.populate_obj(skill)
        db.session.add(skill)
        db.session.commit()
        flash(f'Skill "{skill.name}" added successfully!', 'success')
        return redirect(url_for('admin.skills'))
        
    all_skills = Skill.query.order_by(Skill.category.asc(), Skill.display_order.asc(), Skill.name.asc()).all()
    return render_template('admin/skills.html', skills=all_skills, form=form)


@admin_bp.route('/skills/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_skill(id):
    skill = Skill.query.get_or_404(id)
    form = SkillForm(obj=skill)
    
    if form.validate_on_submit():
        form.populate_obj(skill)
        db.session.commit()
        flash(f'Skill "{skill.name}" updated successfully!', 'success')
        return redirect(url_for('admin.skills'))
        
    return render_template('admin/skill_form.html', form=form, skill=skill)


@admin_bp.route('/skills/delete/<int:id>', methods=['POST'])
@login_required
def delete_skill(id):
    skill = Skill.query.get_or_404(id)
    db.session.delete(skill)
    db.session.commit()
    flash(f'Skill "{skill.name}" deleted.', 'info')
    return redirect(url_for('admin.skills'))


# ---------------- EXPERIENCE CRUD ----------------
@admin_bp.route('/experience', methods=['GET', 'POST'])
@login_required
def experience():
    form = ExperienceForm()
    if form.validate_on_submit():
        exp = Experience()
        form.populate_obj(exp)
        db.session.add(exp)
        db.session.commit()
        flash(f'Experience at "{exp.company}" added successfully!', 'success')
        return redirect(url_for('admin.experience'))
        
    all_exp = Experience.query.order_by(Experience.display_order.asc()).all()
    return render_template('admin/experience.html', experiences=all_exp, form=form)


@admin_bp.route('/experience/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_experience(id):
    exp = Experience.query.get_or_404(id)
    form = ExperienceForm(obj=exp)
    if form.validate_on_submit():
        form.populate_obj(exp)
        db.session.commit()
        flash(f'Experience at "{exp.company}" updated!', 'success')
        return redirect(url_for('admin.experience'))
    return render_template('admin/experience_form.html', form=form, experience=exp)


@admin_bp.route('/experience/delete/<int:id>', methods=['POST'])
@login_required
def delete_experience(id):
    exp = Experience.query.get_or_404(id)
    db.session.delete(exp)
    db.session.commit()
    flash('Experience record deleted.', 'info')
    return redirect(url_for('admin.experience'))


# ---------------- EDUCATION CRUD ----------------
@admin_bp.route('/education', methods=['GET', 'POST'])
@login_required
def education():
    form = EducationForm()
    if form.validate_on_submit():
        edu = Education()
        form.populate_obj(edu)
        db.session.add(edu)
        db.session.commit()
        flash('Education record added!', 'success')
        return redirect(url_for('admin.education'))
    all_edu = Education.query.order_by(Education.display_order.asc()).all()
    return render_template('admin/education.html', educations=all_edu, form=form)


@admin_bp.route('/education/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_education(id):
    edu = Education.query.get_or_404(id)
    form = EducationForm(obj=edu)
    if form.validate_on_submit():
        form.populate_obj(edu)
        db.session.commit()
        flash('Education record updated!', 'success')
        return redirect(url_for('admin.education'))
    return render_template('admin/education_form.html', form=form, education=edu)


@admin_bp.route('/education/delete/<int:id>', methods=['POST'])
@login_required
def delete_education(id):
    edu = Education.query.get_or_404(id)
    db.session.delete(edu)
    db.session.commit()
    flash('Education record deleted.', 'info')
    return redirect(url_for('admin.education'))


# ---------------- CERTIFICATIONS CRUD ----------------
@admin_bp.route('/certifications', methods=['GET', 'POST'])
@login_required
def certifications():
    form = CertificationForm()
    if form.validate_on_submit():
        cert = Certification()
        form.populate_obj(cert)
        if form.certificate_image.data:
            img = save_uploaded_file(form.certificate_image.data, 'certificates')
            if img:
                cert.certificate_image = img
        db.session.add(cert)
        db.session.commit()
        flash(f'Certification "{cert.title}" added!', 'success')
        return redirect(url_for('admin.certifications'))
    all_certs = Certification.query.order_by(Certification.display_order.asc()).all()
    return render_template('admin/certifications.html', certifications=all_certs, form=form)


@admin_bp.route('/certifications/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_certification(id):
    cert = Certification.query.get_or_404(id)
    form = CertificationForm(obj=cert)
    if form.validate_on_submit():
        form.populate_obj(cert)
        if form.certificate_image.data:
            img = save_uploaded_file(form.certificate_image.data, 'certificates')
            if img:
                cert.certificate_image = img
        db.session.commit()
        flash(f'Certification "{cert.title}" updated!', 'success')
        return redirect(url_for('admin.certifications'))
    return render_template('admin/certification_form.html', form=form, cert=cert)


@admin_bp.route('/certifications/delete/<int:id>', methods=['POST'])
@login_required
def delete_certification(id):
    cert = Certification.query.get_or_404(id)
    db.session.delete(cert)
    db.session.commit()
    flash('Certification deleted.', 'info')
    return redirect(url_for('admin.certifications'))


# ---------------- ACHIEVEMENTS CRUD ----------------
@admin_bp.route('/achievements', methods=['GET', 'POST'])
@login_required
def achievements():
    form = AchievementForm()
    if form.validate_on_submit():
        ach = Achievement()
        form.populate_obj(ach)
        db.session.add(ach)
        db.session.commit()
        flash('Achievement added successfully!', 'success')
        return redirect(url_for('admin.achievements'))
    all_ach = Achievement.query.order_by(Achievement.display_order.asc()).all()
    return render_template('admin/achievements.html', achievements=all_ach, form=form)


@admin_bp.route('/achievements/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_achievement(id):
    ach = Achievement.query.get_or_404(id)
    form = AchievementForm(obj=ach)
    if form.validate_on_submit():
        form.populate_obj(ach)
        db.session.commit()
        flash('Achievement updated!', 'success')
        return redirect(url_for('admin.achievements'))
    return render_template('admin/achievement_form.html', form=form, achievement=ach)


@admin_bp.route('/achievements/delete/<int:id>', methods=['POST'])
@login_required
def delete_achievement(id):
    ach = Achievement.query.get_or_404(id)
    db.session.delete(ach)
    db.session.commit()
    flash('Achievement deleted.', 'info')
    return redirect(url_for('admin.achievements'))


# ---------------- SERVICES CRUD ----------------
@admin_bp.route('/services', methods=['GET', 'POST'])
@login_required
def services():
    form = ServiceForm()
    if form.validate_on_submit():
        svc = Service()
        form.populate_obj(svc)
        db.session.add(svc)
        db.session.commit()
        flash(f'Service "{svc.title}" added!', 'success')
        return redirect(url_for('admin.services'))
    all_svc = Service.query.order_by(Service.display_order.asc()).all()
    return render_template('admin/services.html', services=all_svc, form=form)


@admin_bp.route('/services/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_service(id):
    svc = Service.query.get_or_404(id)
    form = ServiceForm(obj=svc)
    if form.validate_on_submit():
        form.populate_obj(svc)
        db.session.commit()
        flash(f'Service "{svc.title}" updated!', 'success')
        return redirect(url_for('admin.services'))
    return render_template('admin/service_form.html', form=form, service=svc)


@admin_bp.route('/services/delete/<int:id>', methods=['POST'])
@login_required
def delete_service(id):
    svc = Service.query.get_or_404(id)
    db.session.delete(svc)
    db.session.commit()
    flash('Service deleted.', 'info')
    return redirect(url_for('admin.services'))


# ---------------- MESSAGES MANAGEMENT ----------------
@admin_bp.route('/messages')
@login_required
def messages():
    all_messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return render_template('admin/messages.html', messages=all_messages)


@admin_bp.route('/messages/mark-read/<int:id>', methods=['POST'])
@login_required
def mark_message_read(id):
    msg = ContactMessage.query.get_or_404(id)
    msg.is_read = True
    db.session.commit()
    return redirect(url_for('admin.messages'))


@admin_bp.route('/messages/delete/<int:id>', methods=['POST'])
@login_required
def delete_message(id):
    msg = ContactMessage.query.get_or_404(id)
    db.session.delete(msg)
    db.session.commit()
    flash('Message deleted.', 'info')
    return redirect(url_for('admin.messages'))
