from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import ContactMessage, Project, Skill, Certification, Education

class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        Project.objects.create(
            title="Fake News Detection System",
            slug="fake-news-detection-system",
            category="AI/ML",
            short_description="NLP News classification",
            full_description="Deep NLP fact-checking pipeline"
        )
        Skill.objects.create(
            name="Python",
            category="backend",
            proficiency=95,
            level="Advanced"
        )

    def test_health_check(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')
        self.assertEqual(response.data['database'], 'connected')

    def test_profile_endpoint(self):
        response = self.client.get('/api/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Payyavula Sri Charan')
        self.assertEqual(response.data['contact']['phone'], '+91 9346733016')
        self.assertEqual(response.data['contact']['email'], 'charanpayyavula6@gmail.com')
        self.assertEqual(response.data['education']['gpa'], '7.5 / 10.0')

    def test_project_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_skill_list(self):
        response = self.client.get('/api/skills/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_contact_submission(self):
        payload = {
            "name": "Jane Recruiter",
            "email": "jane@techcorp.com",
            "phone": "+1 555-0199",
            "subject": "AI Engineer Opportunity",
            "message": "Hi Sri Charan, we were impressed by your Sentence-BERT fake news detection project and would love to interview you.",
            "inquiry_type": "internship"
        }
        response = self.client.post('/api/contact/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(ContactMessage.objects.count(), 1)
        msg = ContactMessage.objects.first()
        self.assertEqual(msg.email, "jane@techcorp.com")

    def test_ai_chat_endpoint(self):
        payload = {"message": "Tell me about Sri Charan's projects and education"}
        response = self.client.post('/api/ai/chat/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("reply", response.data)
        self.assertIn("Prathyusha", response.data['reply'])
