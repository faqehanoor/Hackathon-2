# Multi-stage build for frontend - Todo Chatbot
# Builds the Next.js frontend application

FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files from the frontend directory in the parent context
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the frontend source code
COPY ./frontend/ .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
COPY ./frontend/package*.json ./
RUN npm ci --only=production --omit=dev

# Copy built application from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "start"]