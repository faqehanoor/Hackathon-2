from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import bcrypt

class UserBase(SQLModel):
    name: str = Field(min_length=1, max_length=255)
    email: str = Field(unique=True, max_length=255)
    password_hash: str = Field(max_length=255)

class User(UserBase, table=True):
    id: Optional[str] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @classmethod
    def from_orm(cls, obj):
        """Deprecated method kept for backward compatibility"""
        import warnings
        warnings.warn(
            "`obj.from_orm(data)` was deprecated in SQLModel 0.0.14, you should "
            "instead use `obj.model_validate(data)`.",
            DeprecationWarning,
            stacklevel=2
        )
        return cls.model_validate(obj)

class UserCreate(SQLModel):
    name: str = Field(min_length=1, max_length=255)
    email: str = Field(max_length=255)
    password: str = Field(min_length=8, max_length=255)

class UserRead(SQLModel):
    id: str
    name: str
    email: str
    created_at: datetime
    updated_at: datetime

class UserUpdate(SQLModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)
    email: Optional[str] = Field(default=None, max_length=255)

class UserLogin(SQLModel):
    email: str = Field(max_length=255)
    password: str = Field(min_length=8, max_length=255)

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    user_id: str = Field(max_length=255)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @classmethod
    def from_orm(cls, obj):
        """Deprecated method kept for backward compatibility"""
        import warnings
        warnings.warn(
            "`obj.from_orm(data)` was deprecated in SQLModel 0.0.14, you should "
            "instead use `obj.model_validate(data)`.",
            DeprecationWarning,
            stacklevel=2
        )
        return cls.model_validate(obj)

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = None

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))