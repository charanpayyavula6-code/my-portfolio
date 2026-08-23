from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SelectField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Email, Optional, URL, Length, NumberRange

class ProfileForm(FlaskForm):
    name = StringField('Full Name', validators=[DataRequired(), Length(max=120)])
    tagline = StringField('Professional Tagline', validators=[DataRequired(), Length(max=255)])
    typing_titles = StringField('Typing Animation Titles (Comma-separated)', validators=[DataRequired()], description='e.g. AI/ML Student, Python Developer, ML Enthusiast')
    about_lead = StringField('About Lead/Subtitle', validators=[Optional(), Length(max=255)])
    about_text_1 = TextAreaField('About Me (Paragraph 1)', validators=[DataRequired()])
    about_text_2 = TextAreaField('About Me (Paragraph 2)', validators=[Optional()])
    
    email = StringField('Email Address', validators=[DataRequired(), Email()])
    phone = StringField('Phone Number', validators=[Optional(), Length(max=50)])
    location = StringField('Location', validators=[DataRequired(), Length(max=120)])
    college = StringField('College / University', validators=[DataRequired(), Length(max=200)])
    degree_branch = StringField('Degree & Branch', validators=[DataRequired(), Length(max=120)])
    
    github_url = StringField('GitHub URL', validators=[Optional(), URL()])
    linkedin_url = StringField('LinkedIn URL', validators=[Optional(), URL()])
    website_url = StringField('Personal Website URL', validators=[Optional(), URL()])
    
    profile_image = FileField('Profile Photo', validators=[FileAllowed(['jpg', 'jpeg', 'png', 'webp'], 'Images only (.jpg, .png, .webp)')])
    resume_file = FileField('Resume (PDF)', validators=[FileAllowed(['pdf'], 'PDF documents only (.pdf)')])
    
    years_student = IntegerField('Current Year (e.g. 3)', validators=[DataRequired(), NumberRange(min=1, max=5)])
    projects_count = IntegerField('Projects Count Stat', validators=[DataRequired(), NumberRange(min=0)])
    hackathons_count = IntegerField('Hackathons Count Stat', validators=[DataRequired(), NumberRange(min=0)])
    certifications_count = IntegerField('Certifications Count Stat', validators=[DataRequired(), NumberRange(min=0)])
    
    submit = SubmitField('Save Profile Changes')


class ProjectForm(FlaskForm):
    title = StringField('Project Title', validators=[DataRequired(), Length(max=200)])
    category = SelectField('Category', choices=[
        ('ai-ml', 'AI / Machine Learning'),
        ('gen-ai', 'Generative AI'),
        ('data-science', 'Data Science / Analytics'),
        ('web', 'Web Development'),
        ('java', 'Java Application'),
        ('other', 'Other')
    ], validators=[DataRequired()])
    tags = StringField('Tags / Subtitle (Comma-separated)', validators=[DataRequired()], description='e.g. AI/ML, NLP, Flask')
    technologies = StringField('Technologies Used (Comma-separated)', validators=[DataRequired()], description='e.g. Python, Scikit-learn, Flask, MongoDB')
    short_description = TextAreaField('Short Summary (Shown on Card)', validators=[DataRequired()])
    full_description = TextAreaField('Full Description (Shown in Detail Modal)', validators=[Optional()])
    features = TextAreaField('Key Features (One feature per line)', validators=[Optional()])
    
    image_file = FileField('Project Image (Optional)', validators=[FileAllowed(['jpg', 'jpeg', 'png', 'webp'], 'Images only')])
    icon_class = StringField('Fallback FontAwesome Icon', default='fas fa-rocket', validators=[DataRequired()])
    gradient_class = SelectField('Card Gradient Theme', choices=[
        ('project-img-1', 'Purple / Indigo'),
        ('project-img-2', 'Pink / Rose'),
        ('project-img-3', 'Cyan / Sky Blue'),
        ('project-img-4', 'Green / Teal'),
        ('project-img-5', 'Amber / Warm Coral'),
        ('project-img-6', 'Lavender / Purple')
    ], default='project-img-1')
    
    github_url = StringField('GitHub Repository URL', validators=[Optional(), URL()])
    live_demo_url = StringField('Live Demo URL', validators=[Optional(), URL()])
    is_featured = BooleanField('Featured Project', default=True)
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Project')


class SkillForm(FlaskForm):
    name = StringField('Skill Name', validators=[DataRequired(), Length(max=100)])
    category = SelectField('Category', choices=[
        ('Programming Languages', 'Programming Languages'),
        ('AI / Machine Learning', 'AI / Machine Learning'),
        ('Frameworks & Libraries', 'Frameworks & Libraries'),
        ('Databases', 'Databases'),
        ('Web Technologies', 'Web Technologies'),
        ('Developer Tools', 'Developer Tools')
    ], validators=[DataRequired()])
    level = SelectField('Proficiency Level', choices=[
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced')
    ], default='Intermediate', validators=[DataRequired()])
    icon_class = StringField('FontAwesome Icon Class', default='fas fa-code', validators=[DataRequired()], description='e.g. fab fa-python, fas fa-brain, fas fa-database')
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Skill')


class ExperienceForm(FlaskForm):
    role = StringField('Role / Title', validators=[DataRequired(), Length(max=150)])
    company = StringField('Company / Organization', validators=[DataRequired(), Length(max=150)])
    duration = StringField('Duration', validators=[DataRequired(), Length(max=100)], description='e.g. July 2026 – July 2026 or Up to 6 months')
    location = StringField('Location', default='Remote / Chennai', validators=[Optional()])
    description = TextAreaField('Summary Description', validators=[DataRequired()])
    achievements = TextAreaField('Key Deliverables / Achievements (One per line)', validators=[Optional()])
    technologies = StringField('Technologies Used (Comma-separated)', default='Python, Machine Learning', validators=[Optional()])
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Experience')


class EducationForm(FlaskForm):
    degree = StringField('Degree / Level', validators=[DataRequired(), Length(max=150)], description='e.g. B.E. — Artificial Intelligence & Machine Learning')
    institution = StringField('Institution Name', validators=[DataRequired(), Length(max=200)], description='e.g. Prathyusha Engineering College')
    year = StringField('Academic Years', validators=[DataRequired(), Length(max=100)], description='e.g. 2024 – Present')
    status_label = StringField('Status Label', default='3rd Year — Ongoing', validators=[Optional()])
    grade = StringField('CGPA / Percentage', default='Add CGPA / Grade', validators=[Optional()])
    description = TextAreaField('Description / Focus Areas', validators=[Optional()])
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Education')


class CertificationForm(FlaskForm):
    title = StringField('Certification Title', validators=[DataRequired(), Length(max=200)])
    issuer = StringField('Issuing Organization', validators=[DataRequired(), Length(max=150)], description='e.g. MongoDB University, AWS, Coursera')
    issue_date = StringField('Issue Year / Date', default='2024', validators=[DataRequired()])
    credential_id = StringField('Credential ID (Optional)', validators=[Optional(), Length(max=100)])
    credential_url = StringField('Verification URL', validators=[Optional(), URL()])
    icon_class = StringField('FontAwesome Icon Class', default='fas fa-certificate', validators=[DataRequired()])
    certificate_image = FileField('Certificate Image (Optional)', validators=[FileAllowed(['jpg', 'jpeg', 'png', 'webp'], 'Images only')])
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Certification')


class AchievementForm(FlaskForm):
    title = StringField('Achievement Title', validators=[DataRequired(), Length(max=200)])
    category = StringField('Category', default='Hackathon', validators=[DataRequired()])
    description = TextAreaField('Description / Highlight Details', validators=[DataRequired()])
    icon_class = StringField('Icon Class', default='fas fa-trophy', validators=[DataRequired()])
    url = StringField('Related Link / Post URL (Optional)', validators=[Optional(), URL()])
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Achievement')


class ServiceForm(FlaskForm):
    title = StringField('Service Name', validators=[DataRequired(), Length(max=150)])
    description = TextAreaField('Service Description', validators=[DataRequired()])
    icon_class = StringField('Icon Class', default='fas fa-brain', validators=[DataRequired()])
    features = TextAreaField('Key Offerings / Bullet Points (One per line)', validators=[Optional()])
    is_active = BooleanField('Active Service (Visible on Public Portfolio)', default=True)
    display_order = IntegerField('Display Order', default=0)
    
    submit = SubmitField('Save Service')


class PasswordChangeForm(FlaskForm):
    current_password = PasswordField('Current Password', validators=[DataRequired()])
    new_password = PasswordField('New Password', validators=[DataRequired(), Length(min=6, max=128)])
    confirm_password = PasswordField('Confirm New Password', validators=[DataRequired()])
    submit = SubmitField('Update Password')
