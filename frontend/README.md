# Todo Full-Stack Application

This is a full-stack Todo application with a FastAPI backend and a Next.js frontend. The application allows users to manage their tasks with secure authentication and data isolation.

## Architecture

### Backend
- **Framework**: FastAPI
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel
- **Authentication**: JWT-based with user isolation
- **API**: RESTful endpoints with proper error handling

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with dark theme
- **State Management**: React Context API with useReducer
- **API Communication**: Custom API service layer

## Prerequisites

- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- Neon PostgreSQL account (connection details in backend .env)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Make sure your `.env` file has the correct database connection details:
```env
NEON_DB_URL=postgresql://neondb_owner:npg_Xt7ibGs5JFgS@ep-hidden-art-ahyr2t6j-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
BETTER_AUTH_SECRET=nBDkqVBxXFKOKINGhQWrhE3JWmYwboLJ
```

5. Start the backend server:
```bash
uvicorn src.main:app --reload
```

The backend will be running on `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend root with the following content:
```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

The backend provides the following endpoints:

- `GET /api/{user_id}/tasks` - Retrieve user's tasks
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion status

All endpoints require JWT authentication in the Authorization header.

## Frontend Components

The frontend includes:

- Authentication system (login/signup)
- Dashboard with task management
- Todo list component with full CRUD operations
- Responsive design with dark theme
- Error handling and loading states

## Security Features

- JWT-based authentication for all API requests
- User isolation - users can only access their own tasks
- Input validation on both frontend and backend
- Secure token storage and handling

## Development

### Adding New Features

1. Define the API endpoint in the backend
2. Update the API service in `frontend/services/api.js`
3. Create or update components in the frontend
4. Connect components to the API context

### Environment Variables

Backend (`.env`):
- `NEON_DB_URL` - Database connection string
- `BETTER_AUTH_SECRET` - JWT secret key

Frontend (`.env.local`):
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL

## Running the Application

1. Start the backend server (port 8000)
2. Start the frontend server (port 3000)
3. Access the application at `http://localhost:3000`
4. Register a new user or log in
5. Start managing your tasks!

## Troubleshooting

### Common Issues

- **Backend not connecting to database**: Verify your Neon PostgreSQL connection string in `.env`
- **Frontend can't reach backend**: Check that both servers are running and CORS is configured
- **Authentication errors**: Ensure JWT tokens are properly stored and sent with requests

### API Testing

You can test the API endpoints directly at `http://127.0.0.1:8000/docs` for interactive API documentation.

## Project Structure

```
backend/
├── src/
│   ├── main.py                 # FastAPI application entry point
│   ├── models/                 # SQLModel database models
│   │   ├── entities.py         # Task model and database entities
│   │   └── database.py         # Database connection and session
│   ├── api/
│   │   └── routes.py           # API endpoints for tasks
│   ├── auth/
│   │   ├── jwt_handler.py      # JWT verification and utilities
│   │   └── middleware.py       # Authentication middleware
│   ├── services/
│   │   └── task_service.py     # Business logic for task operations
│   └── lib/
│       └── config.py           # Configuration management
├── alembic/                    # Database migrations
├── tests/
└── pyproject.toml              # Project dependencies

frontend/
├── app/                        # Next.js App Router pages
├── components/                 # Reusable UI components
├── context/                    # React context providers
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── services/                   # API service layer
├── types/                      # TypeScript definitions
├── config/                     # Configuration files
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.