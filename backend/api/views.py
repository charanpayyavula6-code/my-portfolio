import datetime
from django.db import connection
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from .models import ContactMessage, Project, Skill, Certification, Education, AnalyticsEvent
from .serializers import (
    ContactMessageSerializer,
    ProjectSerializer,
    SkillSerializer,
    CertificationSerializer,
    EducationSerializer,
    AnalyticsEventSerializer
)

class HealthCheckView(APIView):
    """Health check endpoint to verify backend status and database connectivity."""
    def get(self, request):
        db_healthy = True
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except Exception as e:
            db_healthy = False

        return Response({
            "status": "healthy" if db_healthy else "degraded",
            "service": "Payyavula Sri Charan Portfolio Backend (Django)",
            "database": "connected" if db_healthy else "error",
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "framework": "Django 6.1 + Django REST Framework",
            "author": "Payyavula Sri Charan"
        }, status=status.HTTP_200_OK if db_healthy else status.HTTP_503_SERVICE_UNAVAILABLE)


class ProfileView(APIView):
    """Returns official verified profile metadata, credentials, and contact endpoints."""
    def get(self, request):
        return Response({
            "name": "Payyavula Sri Charan",
            "shortName": "Sri Charan",
            "headline": "Engineering Intelligent Systems & Scalable Web Architectures.",
            "title": "AI & Machine Learning Engineer • Full-Stack Developer",
            "status": "Available for High-Impact Roles & Internships",
            "contact": {
                "phone": "+91 9346733016",
                "email": "charanpayyavula6@gmail.com",
                "location": "Chennai / Nellore, India",
                "portfolio_url": "https://payyavula-sri-charan-portfolio.vercel.app/"
            },
            "social": {
                "github": "https://github.com/charanpayyavula6-code",
                "linkedin": "https://www.linkedin.com/in/charan-payyavula-55286a354/?isSelfProfile=true"
            },
            "education": {
                "degree": "B.E. Computer Science and Engineering (AI & ML)",
                "institution": "Prathyusha Engineering College, Chennai",
                "period": "2024 – 2028",
                "gpa": "7.5 / 10.0",
                "year": "3rd Year"
            },
            "internship": {
                "company": "CodeAlpha",
                "role": "Machine Learning Engineer Intern",
                "duration": "June 2026 – August 2026",
                "focus": "Predictive ML pipelines with SVM, Random Forest, XGBoost"
            },
            "publication": {
                "title": "Artificial Intelligence in the Workplace: Revolutionizing Tasks and Redefining Roles",
                "publisher": "Sage Scholar / IEEE EBSCO Indexing",
                "year": 2026
            },
            "languages": ["Telugu", "Tamil", "English"]
        })


class ProjectListView(ListAPIView):
    """List all projects with optional filtering by featured or category."""
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured')
        category = self.request.query_params.get('category')

        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() in ['true', '1'])
        if category:
            queryset = queryset.filter(category__icontains=category)

        return queryset


class ProjectDetailView(RetrieveAPIView):
    """Retrieve detailed project specification by slug."""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class SkillListView(ListAPIView):
    """List technical competencies grouped or flat."""
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()


class CertificationListView(ListAPIView):
    """List verified professional certifications."""
    serializer_class = CertificationSerializer
    queryset = Certification.objects.all()


class EducationListView(ListAPIView):
    """List education milestones."""
    serializer_class = EducationSerializer
    queryset = Education.objects.all()


class ContactCreateView(CreateAPIView):
    """Accepts contact inquiries and persists them to the database."""
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        # Log an analytics event for the contact form dispatch
        try:
            AnalyticsEvent.objects.create(
                event_type='contact_form_submission',
                path='/api/contact/',
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')[:300],
                metadata={'sender_email': instance.email, 'name': instance.name}
            )
        except Exception:
            pass

        return Response({
            "success": True,
            "message": f"Thank you {instance.name}! Your message has been received by Sri Charan. I will respond to {instance.email} promptly.",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


class AIChatView(APIView):
    """
    Intelligent Assistant API for answering questions regarding
    Sri Charan's experience, projects, skills, and resume details.
    """
    def post(self, request):
        user_message = request.data.get('message', '').strip()
        if not user_message:
            return Response(
                {"error": "Message body cannot be empty."},
                status=status.HTTP_400_BAD_REQUEST
            )

        msg_lower = user_message.lower()

        # Contextual response synthesizer
        if any(w in msg_lower for w in ['who', 'about', 'charan', 'background', 'intro']):
            reply = (
                "**Payyavula Sri Charan** is a 3rd-year B.E. student specializing in **Artificial Intelligence & Machine Learning** "
                "at **Prathyusha Engineering College, Chennai** (GPA: 7.5/10.0). He bridges machine learning models (NLP, YOLO, classification) "
                "with high-throughput backend services in Python, Flask, Spring Boot, and modern React interfaces."
            )
        elif any(w in msg_lower for w in ['project', 'work', 'code', 'build', 'github']):
            reply = (
                "Sri Charan's flagship production prototypes include:\n"
                "1. **Fake News Detection System**: Built with Python, Flask, Sentence-BERT, Gemini API & SQL for multimodal linguistic fact-checking.\n"
                "2. **Speech Emotion Recognition Engine**: Real-time audio signal processing with MFCC extraction, classification, and visual wave telemetry.\n"
                "3. **Real-Time PPE Compliance Detector**: Computer vision inference using YOLOv8 & OpenCV.\n"
                "4. **Clinical Disease Risk Predictor**: Machine learning risk stratification models (SVM, Random Forest, XGBoost).\n"
                "Check them all under the Projects section or explore GitHub: https://github.com/charanpayyavula6-code"
            )
        elif any(w in msg_lower for w in ['skill', 'stack', 'tech', 'python', 'java', 'react']):
            reply = (
                "**Core Competencies:**\n"
                "• **AI & ML**: PyTorch, Scikit-learn, OpenCV, YOLO, Sentence-BERT, Gemini API, RAG\n"
                "• **Backend**: Python (Django, Flask, FastAPI), Java (Spring Boot), REST APIs\n"
                "• **Frontend**: React (Vite), JavaScript ES6+, Modern CSS, Web Audio API\n"
                "• **Data & Tools**: SQL, MySQL, MongoDB, Git, Docker, Postman"
            )
        elif any(w in msg_lower for w in ['contact', 'email', 'phone', 'call', 'reach', 'hire', 'interview']):
            reply = (
                "You can connect directly with Sri Charan:\n"
                "• **Phone**: +91 9346733016\n"
                "• **Email**: charanpayyavula6@gmail.com\n"
                "• **LinkedIn**: https://www.linkedin.com/in/charan-payyavula-55286a354/?isSelfProfile=true\n"
                "• **GitHub**: https://github.com/charanpayyavula6-code\n"
                "He is actively available for machine learning and software engineering roles!"
            )
        elif any(w in msg_lower for w in ['education', 'college', 'degree', 'gpa', 'school']):
            reply = (
                "**Academic Standing:**\n"
                "• **B.E. CSE (AI & ML)**: Prathyusha Engineering College, Chennai (2024–2028) — **GPA: 7.5 / 10.0**\n"
                "• **High School**: Rainbow Em High School, Atmakur, Nellore\n"
                "• **Internship**: CodeAlpha Virtual ML Engineer Intern (June–August 2026)\n"
                "• **Publication**: AI & Workplace Transition (Sage Scholar / IEEE EBSCO)"
            )
        else:
            reply = (
                f"Thank you for asking about '{user_message}'! Payyavula Sri Charan is an AI/ML and Full-Stack Engineer with verified expertise in Python, Django, React, and Machine Learning. "
                "Feel free to ask about his projects, education, internship at CodeAlpha, or reach him directly at charanpayyavula6@gmail.com or +91 9346733016."
            )

        # Log AI chat interaction
        try:
            AnalyticsEvent.objects.create(
                event_type='ai_copilot_query',
                path='/api/ai/chat/',
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')[:300],
                metadata={'query': user_message[:150]}
            )
        except Exception:
            pass

        return Response({
            "query": user_message,
            "reply": reply,
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }, status=status.HTTP_200_OK)


class AnalyticsTrackView(CreateAPIView):
    """Log client-side user telemetry events."""
    serializer_class = AnalyticsEventSerializer

    def perform_create(self, serializer):
        serializer.save(
            ip_address=self.request.META.get('REMOTE_ADDR'),
            user_agent=self.request.META.get('HTTP_USER_AGENT', '')[:300]
        )
