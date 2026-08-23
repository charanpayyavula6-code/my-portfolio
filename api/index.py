import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from app import create_app
from app.extensions import db

app = create_app(os.getenv('FLASK_ENV', 'production'))

# Auto-initialize database & seed initial data on first invocation if empty
with app.app_context():
    try:
        db.create_all()
        from seed import seed_database
        from app.models import Profile
        if not Profile.query.first():
            seed_database()
    except Exception as e:
        print(f"Init error: {e}")
