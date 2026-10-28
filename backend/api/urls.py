from django.urls import path
from .views import (
    HealthCheckView,
    ProfileView,
    ProjectListView,
    ProjectDetailView,
    SkillListView,
    CertificationListView,
    EducationListView,
    ContactCreateView,
    AIChatView,
    AnalyticsTrackView
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('profile/', ProfileView.as_view(), name='profile-detail'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('certifications/', CertificationListView.as_view(), name='certification-list'),
    path('education/', EducationListView.as_view(), name='education-list'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('ai/chat/', AIChatView.as_view(), name='ai-chat'),
    path('analytics/event/', AnalyticsTrackView.as_view(), name='analytics-event'),
]
