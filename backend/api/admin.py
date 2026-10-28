from django.contrib import admin
from .models import ContactMessage, Project, Skill, Certification, Education, AnalyticsEvent

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'inquiry_type', 'is_read', 'responded', 'created_at')
    list_filter = ('inquiry_type', 'is_read', 'responded', 'created_at')
    search_fields = ('name', 'email', 'message', 'subject')
    readonly_fields = ('created_at',)
    list_editable = ('is_read', 'responded')
    ordering = ('-created_at',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'featured', 'order', 'created_at')
    list_filter = ('category', 'featured', 'status')
    search_fields = ('title', 'short_description', 'full_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured', 'order')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'level', 'order')
    list_filter = ('category', 'level')
    search_fields = ('name', 'description')
    list_editable = ('proficiency', 'order')


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'date_earned', 'verified', 'order')
    list_filter = ('issuer', 'verified')
    search_fields = ('title', 'issuer', 'credential_id')
    list_editable = ('verified', 'order')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'period', 'grade', 'order')
    search_fields = ('degree', 'institution')
    list_editable = ('order',)


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ('event_type', 'path', 'ip_address', 'created_at')
    list_filter = ('event_type', 'created_at')
    readonly_fields = ('event_type', 'path', 'ip_address', 'user_agent', 'metadata', 'created_at')
    ordering = ('-created_at',)
