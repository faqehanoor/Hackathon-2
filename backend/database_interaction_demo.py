from sqlmodel import SQLModel, Session, select
from src.models.database import engine
from src.models.entities import Task, TaskCreate
from datetime import datetime

print("=== Neon Database Connection Status ===")
print(f"Database connection test: {datetime.now()}")
print("Connected to Neon Serverless PostgreSQL database")

# Create tables if they don't exist
SQLModel.metadata.create_all(bind=engine)

# Query all tasks from the database
with Session(engine) as session:
    statement = select(Task)
    tasks = session.exec(statement).all()
    
    print(f"\nTotal tasks in database: {len(tasks)}")
    
    if tasks:
        print("\nCurrent tasks in the database:")
        print("-" * 80)
        for task in tasks:
            print(f"ID: {task.id}")
            print(f"User ID: {task.user_id}")
            print(f"Title: {task.title}")
            print(f"Description: {task.description}")
            print(f"Completed: {task.completed}")
            print(f"Created: {task.created_at}")
            print(f"Updated: {task.updated_at}")
            print("-" * 80)
    else:
        print("No tasks found in the database.")

# Demonstrate how new tasks would be added when users interact with the frontend
print("\n=== How Frontend-Backend-Database Interaction Works ===")
print("When a user adds a task via the frontend dashboard:")
print("1. Frontend sends POST request to backend API: /api/{user_id}/tasks")
print("2. Backend validates JWT token and user permissions") 
print("3. Backend creates new Task record in Neon database")
print("4. Frontend receives response and updates UI")

print("\nWhen a user updates a task:")
print("1. Frontend sends PUT request to backend API: /api/{user_id}/tasks/{task_id}")
print("2. Backend validates user owns the task")
print("3. Backend updates Task record in Neon database")
print("4. Frontend receives response and updates UI")

print("\nWhen a user deletes a task:")
print("1. Frontend sends DELETE request to backend API: /api/{user_id}/tasks/{task_id}")
print("2. Backend validates user owns the task")
print("3. Backend removes Task record from Neon database")
print("4. Frontend receives response and updates UI")

print(f"\nDatabase connection remains active and all data is persisted in Neon Serverless PostgreSQL.")