from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from datetime import timedelta
from sqlmodel import Session, select
from .jwt_handler import create_access_token
from ..models.entities import User, UserCreate, hash_password, verify_password
from ..models.database import get_session
from uuid import uuid4

router = APIRouter()

# Request models
class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

@router.post("/auth/login")
def login(request: LoginRequest, session: Session = Depends(get_session)):
    # Query the database for the user
    statement = select(User).where(User.email == request.email)
    user = session.exec(statement).first()

    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)  # Token expires in 30 minutes
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    }

@router.post("/auth/signup")
def signup(request: SignupRequest, session: Session = Depends(get_session)):
    # Check if user already exists
    statement = select(User).where(User.email == request.email)
    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Generate a unique user ID
    user_id = str(uuid4())

    # Hash the password
    password_hash = hash_password(request.password)

    # Create new user
    user = User(
        id=user_id,
        name=request.name,
        email=request.email,
        password_hash=password_hash
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    # Create access token
    access_token_expires = timedelta(minutes=30)  # Token expires in 30 minutes
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    }