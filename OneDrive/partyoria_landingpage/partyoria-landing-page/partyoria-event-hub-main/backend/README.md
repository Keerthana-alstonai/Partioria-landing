# Partyoria Backend

Django REST API backend for the Partyoria event management platform.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

3. Create superuser:
```bash
python manage.py createsuperuser
```

4. Run development server:
```bash
python manage.py runserver
```

## API Endpoints

### Users
- `GET/POST /api/users/` - List/Create users
- `GET/PUT/DELETE /api/users/{id}/` - User detail
- `POST /api/users/register/` - User registration
- `POST /api/users/login/` - User login

### Events
- `GET/POST /api/events/` - List/Create events
- `GET/PUT/DELETE /api/events/{id}/` - Event detail
- `GET/POST /api/events/{id}/guests/` - Event guests
- `GET /api/events/stats/` - Event statistics

### Media Uploads
- `GET/POST /api/media/` - List/Upload media
- `GET/PUT/DELETE /api/media/{id}/` - Media detail
- `POST /api/media/upload/` - File upload

## Frontend Integration

The backend is configured to accept requests from `http://localhost:3000` (React frontend).

CORS is enabled for seamless frontend-backend communication.