import logging
from sqlmodel import Session, select
from typing import List, Optional
from ..models.entities import Task, TaskCreate, TaskUpdate
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_task(session: Session, task_data: TaskCreate) -> Task:
    logger.info(f"Creating task for user {task_data.user_id}")
    # Create Task instance directly from TaskCreate data
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
    logger.info(f"Task {db_task.id} created successfully for user {db_task.user_id}")
    return db_task

def get_tasks(session: Session, user_id: str, completed: Optional[bool] = None) -> List[Task]:
    logger.info(f"Retrieving tasks for user {user_id}, completed={completed}")
    query = select(Task).where(Task.user_id == user_id)

    if completed is not None:
        query = query.where(Task.completed == completed)

    tasks = session.exec(query).all()
    logger.info(f"Retrieved {len(tasks)} tasks for user {user_id}")
    return tasks

def get_task_by_id(session: Session, task_id: int, user_id: str) -> Optional[Task]:
    logger.info(f"Retrieving task {task_id} for user {user_id}")
    query = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    task = session.exec(query).first()
    if task:
        logger.info(f"Task {task_id} retrieved successfully for user {user_id}")
    else:
        logger.warning(f"Task {task_id} not found for user {user_id}")
    return task

def update_task(session: Session, task_id: int, user_id: str, task_update: TaskUpdate) -> Optional[Task]:
    logger.info(f"Updating task {task_id} for user {user_id}")
    db_task = get_task_by_id(session, task_id, user_id)
    if db_task:
        # Update only the fields that are provided
        if task_update.title is not None:
            db_task.title = task_update.title
        if task_update.description is not None:
            db_task.description = task_update.description
        if task_update.completed is not None:
            db_task.completed = task_update.completed
        db_task.updated_at = datetime.now()
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        logger.info(f"Task {task_id} updated successfully for user {user_id}")
    else:
        logger.warning(f"Failed to update task {task_id} for user {user_id}: task not found")
    return db_task

def delete_task(session: Session, task_id: int, user_id: str) -> bool:
    logger.info(f"Deleting task {task_id} for user {user_id}")
    db_task = get_task_by_id(session, task_id, user_id)
    if db_task:
        session.delete(db_task)
        session.commit()
        logger.info(f"Task {task_id} deleted successfully for user {user_id}")
        return True
    else:
        logger.warning(f"Failed to delete task {task_id} for user {user_id}: task not found")
    return False

def toggle_task_completion(session: Session, task_id: int, user_id: str) -> Optional[Task]:
    logger.info(f"Toggling completion status for task {task_id} for user {user_id}")
    db_task = get_task_by_id(session, task_id, user_id)
    if db_task:
        db_task.completed = not db_task.completed
        db_task.updated_at = datetime.now()
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        logger.info(f"Task {task_id} completion status toggled for user {user_id}, now {db_task.completed}")
    else:
        logger.warning(f"Failed to toggle task {task_id} for user {user_id}: task not found")
    return db_task