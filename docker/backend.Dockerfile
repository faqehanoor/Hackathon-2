# Dockerfile for backend - Todo Chatbot
# Builds the FastAPI backend application

FROM python:3.11-slim

WORKDIR /app

# Copy requirements from backend directory
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application
COPY ./backend/ .

EXPOSE 8000

# Start the FastAPI application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]