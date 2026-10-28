from django.db import models

class ContactMessage(models.Model):
    """Stores incoming messages from the portfolio contact form."""
    INQUIRY_CHOICES = [
        ('general', 'General Inquiry'),
        ('internship', 'Internship / Full-time Role'),
        ('collaboration', 'Research & Engineering Collaboration'),
        ('project', 'Project Consultation'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, null=True)
    subject = models.CharField(max_length=200, blank=True, default='')
    message = models.TextField()
    inquiry_type = models.CharField(max_length=50, choices=INQUIRY_CHOICES, default='general')
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    responded = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"{self.name} - {self.email} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"


class Project(models.Model):
    """Showcases flagship AI/ML, Full-Stack, and systems engineering projects."""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='Production Ready')
    short_description = models.CharField(max_length=300)
    full_description = models.TextField()
    technologies = models.JSONField(default=list, help_text='List of tech stack tags')
    metrics = models.JSONField(default=dict, blank=True, help_text='Performance metrics dictionary')
    highlights = models.JSONField(default=list, blank=True, help_text='Key architectural bullet points')
    github_url = models.URLField(blank=True, default='')
    live_url = models.URLField(blank=True, default='')
    featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.title


class Skill(models.Model):
    """Categorized technical capabilities and tools."""
    CATEGORY_CHOICES = [
        ('ai_ml', 'AI & Machine Learning'),
        ('backend', 'Backend & Systems Architecture'),
        ('frontend', 'Frontend & Modern Web'),
        ('database', 'Databases & Data Engineering'),
        ('devops', 'Developer Tools & Cloud'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.PositiveIntegerField(default=85, help_text='Percentage from 0 to 100')
    level = models.CharField(max_length=50, default='Advanced')
    description = models.CharField(max_length=250, blank=True, default='')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order', '-proficiency']
        verbose_name = 'Technical Skill'
        verbose_name_plural = 'Technical Skills'

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Certification(models.Model):
    """Verified academic and professional credentials."""
    title = models.CharField(max_length=250)
    issuer = models.CharField(max_length=150)
    date_earned = models.CharField(max_length=50)
    credential_id = models.CharField(max_length=150, blank=True, default='')
    credential_url = models.URLField(blank=True, default='')
    verified = models.BooleanField(default=True)
    skills = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Certification'
        verbose_name_plural = 'Certifications'

    def __str__(self):
        return f"{self.title} - {self.issuer}"


class Education(models.Model):
    """Academic qualifications and timeline."""
    degree = models.CharField(max_length=250)
    institution = models.CharField(max_length=250)
    period = models.CharField(max_length=50)
    grade = models.CharField(max_length=50)
    location = models.CharField(max_length=150)
    description = models.TextField(blank=True, default='')
    highlights = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Education Record'
        verbose_name_plural = 'Education Records'

    def __str__(self):
        return f"{self.degree} ({self.institution})"


class AnalyticsEvent(models.Model):
    """Telemetry events and user interactions."""
    event_type = models.CharField(max_length=60)
    path = models.CharField(max_length=200, default='/')
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.CharField(max_length=300, blank=True, default='')
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Analytics Event'
        verbose_name_plural = 'Analytics Events'

    def __str__(self):
        return f"{self.event_type} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
