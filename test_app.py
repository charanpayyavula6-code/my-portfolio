import unittest
from app import create_app
from app.extensions import db
from app.models import Admin, Profile, Project, Skill, ContactMessage

class PortfolioTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('development')
        self.app.config['TESTING'] = True
        self.app.config['WTF_CSRF_ENABLED'] = False
        self.client = self.app.test_client()

    def test_public_homepage(self):
        with self.app.app_context():
            res = self.client.get('/')
            self.assertEqual(res.status_code, 200)
            self.assertIn(b'Payyavula Sri Charan', res.data)
            self.assertIn(b'AI Government Grievance Portal', res.data)

    def test_public_project_api(self):
        with self.app.app_context():
            project = Project.query.first()
            res = self.client.get(f'/api/projects/{project.id}')
            self.assertEqual(res.status_code, 200)
            json_data = res.get_json()
            self.assertEqual(json_data['title'], project.title)

    def test_contact_form_submission(self):
        with self.app.app_context():
            res = self.client.post('/contact', json={
                'name': 'Recruiter Test',
                'email': 'recruiter@company.com',
                'subject': 'Interview Invitation',
                'message': 'We would like to invite you for an AI/ML developer interview.'
            })
            self.assertEqual(res.status_code, 200)
            json_data = res.get_json()
            self.assertTrue(json_data['success'])
            
            # Verify in DB
            msg = ContactMessage.query.filter_by(email='recruiter@company.com').first()
            self.assertIsNotNone(msg)
            self.assertEqual(msg.subject, 'Interview Invitation')

    def test_admin_dashboard_requires_login(self):
        res = self.client.get('/admin/dashboard')
        self.assertEqual(res.status_code, 302)
        self.assertIn('/admin/login', res.headers['Location'])

    def test_admin_login_and_crud(self):
        with self.app.app_context():
            # 1. Login
            login_res = self.client.post('/admin/login', data={
                'username_or_email': 'admin',
                'password': 'Admin@12345'
            }, follow_redirects=True)
            self.assertEqual(login_res.status_code, 200)
            self.assertIn(b'Dashboard Overview', login_res.data)

            # 2. Access projects list
            proj_res = self.client.get('/admin/projects')
            self.assertEqual(proj_res.status_code, 200)
            self.assertIn(b'Projects Management', proj_res.data)

            # 3. Add a project via admin
            add_res = self.client.post('/admin/projects/add', data={
                'title': 'Test Portfolio Robot',
                'category': 'ai-ml',
                'tags': 'Robotics, AI',
                'technologies': 'Python, ROS',
                'short_description': 'Autonomous test robot project',
                'icon_class': 'fas fa-robot',
                'gradient_class': 'project-img-1',
                'is_featured': 'y'
            }, follow_redirects=True)
            self.assertEqual(add_res.status_code, 200)
            
            created_p = Project.query.filter_by(title='Test Portfolio Robot').first()
            self.assertIsNotNone(created_p)

            # 4. Check on public homepage
            home_res = self.client.get('/')
            self.assertIn(b'Test Portfolio Robot', home_res.data)

            # 5. Delete the test project
            del_res = self.client.post(f'/admin/projects/delete/{created_p.id}', follow_redirects=True)
            self.assertEqual(del_res.status_code, 200)
            self.assertIsNone(Project.query.filter_by(title='Test Portfolio Robot').first())

if __name__ == '__main__':
    unittest.main()
