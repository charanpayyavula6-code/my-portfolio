"""
URL configuration for portfolio_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "status": "online",
        "service": "Payyavula Sri Charan Portfolio Backend API",
        "version": "1.0.0",
        "author": "Payyavula Sri Charan",
        "endpoints": {
            "health": "/api/health/",
            "profile": "/api/profile/",
            "projects": "/api/projects/",
            "skills": "/api/skills/",
            "certifications": "/api/certifications/",
            "education": "/api/education/",
            "contact": "/api/contact/",
            "ai_chat": "/api/ai/chat/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
