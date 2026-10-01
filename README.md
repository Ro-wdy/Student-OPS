# Student CRUD

A simple full-stack app for managing student records. You can create, view, update and delete students. The backend is a Django JSON API and the frontend is a React app built with Vite.

## Features

- List all students, newest first
- Add a student with a name, email, age and course
- Edit a student's details
- Delete a student
- Each email can belong to only one student

## Tech stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Backend  | Python, Django 5.2             |
| Database | SQLite                         |
| Frontend | React 19, Vite                 |

## Project structure

```
student-crud/
├── backend/
│   ├── core/          # Django project settings and root URLs
│   ├── students/      # Student model, views and API routes
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── App.jsx    # Student list and form UI
    │   └── main.jsx
    └── vite.config.js # Sends /api requests to the Django server
```

## Getting started

### Prerequisites

- Python 3.10+
- Node.js 18+

### 1. Backend

```bash
python -m venv venv
source venv/bin/activate
pip install django

cd backend
python manage.py migrate
python manage.py runserver 8001
```

The API is now running at `http://127.0.0.1:8001/api/`.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The Vite dev server forwards `/api` requests to the Django backend on port 8001, so you don't need any CORS setup.

## API endpoints

All endpoints accept and return JSON.

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/api/students/`       | List all students         |
| POST   | `/api/students/`       | Create a student          |
| GET    | `/api/students/<id>/`  | Get one student           |
| PUT    | `/api/students/<id>/`  | Update a student          |
| DELETE | `/api/students/<id>/`  | Delete a student          |

### Example request body (POST / PUT)

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 21,
  "course": "Computer Science"
}
```

### Errors

- `400` if a field is missing or invalid, or the email is already used
- `404` if no student has that id
- `405` if the HTTP method isn't supported
