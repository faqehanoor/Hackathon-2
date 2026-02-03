from fastapi import FastAPI
from sqlmodel import SQLModel
from .api.routes import router as task_router
from .auth import routes as auth_routes
from .lib.config import settings
from .lib.logging_config import setup_logging
from .models.database import engine
from .models.entities import Task, User

# Setup logging
setup_logging()

# Create all database tables on startup
SQLModel.metadata.create_all(bind=engine)

app = FastAPI(
    title="Todo Backend API",
    version="1.0.0",
    debug=settings.debug
)

# Include the task router
app.include_router(task_router, prefix="/api", tags=["tasks"])

# Include the auth router
app.include_router(auth_routes.router, prefix="/api", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo Backend API"}

@app.on_event("startup")
def on_startup():
    # Database tables are created at module level
    print("Database tables initialized")