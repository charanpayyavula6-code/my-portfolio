import os
from app import create_app
from app.extensions import db
from app.models import Admin

app = create_app(os.getenv('FLASK_ENV', 'development'))

@app.cli.command('init-db')
def init_db():
    """Create database tables."""
    db.create_all()
    print("Database tables initialized.")

@app.cli.command('seed-db')
def seed_db():
    """Seed database with initial portfolio data."""
    from seed import seed_database
    seed_database()

@app.cli.command('create-admin')
def create_admin():
    """Create or update an admin user interactively."""
    import getpass
    username = input("Enter admin username: ").strip()
    email = input("Enter admin email: ").strip()
    password = getpass.getpass("Enter admin password: ").strip()
    
    admin = Admin.query.filter((Admin.username == username) | (Admin.email == email)).first()
    if admin:
        admin.username = username
        admin.email = email
        admin.set_password(password)
        print(f"Updated existing admin account: {username}")
    else:
        admin = Admin(username=username, email=email)
        admin.set_password(password)
        db.session.add(admin)
        print(f"Created new admin account: {username}")
    db.session.commit()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
