import os
import sys
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# If in serverless environment, ensure writable database exists in /tmp
tmp_db = '/tmp/portfolio.db'
repo_db = os.path.join(BASE_DIR, 'portfolio.db')

if os.name == 'posix' or os.getenv('VERCEL') or os.getenv('AWS_REGION'):
    if not os.path.exists(tmp_db) and os.path.exists(repo_db):
        try:
            with open(repo_db, 'rb') as src, open(tmp_db, 'wb') as dst:
                dst.write(src.read())
        except Exception as e:
            print(f"Error copying DB to /tmp: {e}")

    if os.path.exists(tmp_db):
        try:
            os.chmod(tmp_db, 0o777)
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
