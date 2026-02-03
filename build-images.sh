#!/bin/bash

# Script to build container images for the Todo application

set -e  # Exit immediately if a command exits with a non-zero status

echo "Building container images for Todo application..."

# Build the backend image
echo "Building backend image..."
docker build -f ./docker/backend.Dockerfile -t todo-backend:latest .

# Build the frontend image
echo "Building frontend image..."
docker build -f ./docker/frontend.Dockerfile -t todo-frontend:latest .

echo "Container images built successfully!"
echo "Images created:"
echo "- todo-backend:latest"
echo "- todo-frontend:latest"

# Optionally tag with a version
if [ ! -z "$1" ]; then
    echo "Tagging images with version $1..."
    docker tag todo-backend:latest todo-backend:$1
    docker tag todo-frontend:latest todo-frontend:$1
    echo "Images tagged with version $1"
fi

echo "Build process completed."