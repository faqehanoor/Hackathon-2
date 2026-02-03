from sqlmodel import SQLModel, Session, select
from src.models.database import engine
from src.models.entities import Task, TaskCreate
from datetime import datetime

# Create tables if they don't exist
print("Creating tables if they don't exist...")
SQLModel.metadata.create_all(bind=engine)
print("Tables should be created now.")

# Create a sample task to test the database connection
print("\nCreating a test task to verify database connection...")

task_data = TaskCreate(
    title="Test Task",
    description="This is a test task to verify database connectivity",
    completed=False,
    user_id="test_user_123"
)

with Session(engine) as session:
    # Create a test task using the proper constructor
    db_task = Task(
        title=task_data.title,
        description=task_data.description,
        completed=task_data.completed,
        user_id=task_data.user_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    print(f"Created task with ID: {db_task.id}")
    print(f"Task title: {db_task.title}")
    print(f"Task user_id: {db_task.user_id}")
    print(f"Task completed: {db_task.completed}")

    # Query the task back
    statement = select(Task).where(Task.user_id == "test_user_123")
    tasks = session.exec(statement).all()

    print(f"\nFound {len(tasks)} tasks for user 'test_user_123'")
    for task in tasks:
        print(f"- Task ID: {task.id}, Title: {task.title}, Completed: {task.completed}")

print("\nDatabase test completed successfully!")