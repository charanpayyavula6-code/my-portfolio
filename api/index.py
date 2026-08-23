import os
import sys
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# If in serverless environment, ensure writable database exists in /tmp
tmp_db = '/tmp/portfolio.db'
repo_db = os.path.join(BASE_DIR, 'portfolio.db')
if not os.path.exists(tmp_db) and os.path.exists(repo_db):
    try:
        shutil.copyfile(repo_db, tmp_db)
    except Exception:
        pass

if os.path.exists(tmp_db):
    try:
        os.chmod(tmp_db, 0o666)
    except Exception:
        pass

from app import create_app
from app.extensions import db

app = create_app(os.getenv('FLASK_ENV', 'production'))

# Auto-initialize database & seed initial data on first invocation if empty
with app.app_context():
    try:
        db.create_all()
        from app.models import Profile, Admin
        if not Profile.query.first() or not Admin.query.first():
            from seed import seed_database
            seed_database()
    except Exception as e:
        print(f"Init error: {e}")
