@echo off
REM Batch script to build container images for the Todo application

echo Building container images for Todo application...

REM Build the backend image
echo Building backend image...
docker build -f ./docker/backend.Dockerfile -t todo-backend:latest .

if %errorlevel% neq 0 (
    echo Failed to build backend image
    exit /b %errorlevel%
)

REM Build the frontend image
echo Building frontend image...
docker build -f ./docker/frontend.Dockerfile -t todo-frontend:latest .

if %errorlevel% neq 0 (
    echo Failed to build frontend image
    exit /b %errorlevel%
)

echo Container images built successfully!
echo Images created:
echo - todo-backend:latest
echo - todo-frontend:latest

REM Tag with version if provided
if not "%1"=="" (
    echo Tagging images with version %1...
    docker tag todo-backend:latest todo-backend:%1
    docker tag todo-frontend:latest todo-frontend:%1
    echo Images tagged with version %1
)

echo Build process completed.