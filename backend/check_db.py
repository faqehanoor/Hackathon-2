from sqlmodel import SQLModel, Session, select
from src.models.database import engine
from src.models.entities import Task
from datetime import datetime

# Create tables if they don't exist
SQLModel.metadata.create_all(bind=engine)

print(f'Database connection test: {datetime.now()}')

# Query all tasks from the database
with Session(engine) as session:
    statement = select(Task)
    tasks = session.exec(statement).all()
    
    print(f'Total tasks in database: {len(tasks)}')
    
    if tasks:
        print('Current tasks in the database:')
        for task in tasks:
            print(f'- ID: {task.id}, User: {task.user_id}, Title: {task.title}, Completed: {task.completed}')
    else:
        print('No tasks found in the database.')