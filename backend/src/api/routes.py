from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from typing import List, Optional
from ..models.entities import TaskRead, TaskCreate, TaskUpdate
from ..models.database import get_session
from ..auth.middleware import get_current_user
from ..services.task_service import get_tasks, create_task, update_task, toggle_task_completion, get_task_by_id, delete_task

router = APIRouter()

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
def get_user_tasks(
    user_id: str,
    completed: Optional[bool] = Query(None),
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access these tasks"
        )

    tasks = get_tasks(session, user_id, completed)
    return tasks

@router.get("/{user_id}/tasks/{id}", response_model=TaskRead)
def get_user_task(
    user_id: str,
    id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this task"
        )

    task = get_task_by_id(session, id, user_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task

@router.post("/{user_id}/tasks", response_model=TaskRead)
def create_user_task(
    user_id: str,
    task_data: TaskCreate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create tasks for this user"
        )

    # Override user_id to ensure task is associated with the authenticated user
    task_data.user_id = user_id

    created_task = create_task(session, task_data)
    return created_task

@router.put("/{user_id}/tasks/{id}", response_model=TaskRead)
def update_user_task(
    user_id: str,
    id: int,
    task_data: TaskUpdate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update these tasks"
        )

    updated_task = update_task(session, id, user_id, task_data)

    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return updated_task

@router.patch("/{user_id}/tasks/{id}/complete", response_model=TaskRead)
def toggle_task_complete(
    user_id: str,
    id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to toggle completion for these tasks"
        )

    toggled_task = toggle_task_completion(session, id, user_id)

    if not toggled_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return toggled_task

@router.delete("/{user_id}/tasks/{id}")
def delete_user_task(
    user_id: str,
    id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete these tasks"
        )

    deleted = delete_task(session, id, user_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return {"message": "Task deleted successfully"}