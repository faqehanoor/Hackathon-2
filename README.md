# Todo Chatbot - AI-Assisted Kubernetes Deployment

This repository contains the infrastructure and deployment configuration for the Todo Chatbot application using AI-assisted tools and Kubernetes.

## Prerequisites

- Docker Desktop with Docker AI Agent (Gordon) enabled
- Minikube installed and running
- Helm v3+ installed
- kubectl-ai and Kagent (optional, for AI-assisted operations)
- Windows PowerShell (or PowerShell Core)

## Quick Start

### 1. Environment Setup

First, ensure your environment is ready:

```powershell
# Start Minikube cluster
minikube start

# Verify cluster is ready
kubectl cluster-info

# Verify Helm is available
helm version
```

### 2. Containerization with AI Assistance

Generate optimized Dockerfiles using Docker AI Agent (Gordon):

```powershell
# Navigate to project root
cd /path/to/project

# Generate frontend Dockerfile using Gordon (if available)
docker ai "create optimized Dockerfile for Next.js frontend application" --output "./docker/frontend.Dockerfile"

# Generate backend Dockerfile using Gordon (if available)
docker ai "create optimized Dockerfile for FastAPI backend application" --output "./docker/backend.Dockerfile"
```

If Docker AI is unavailable, create Dockerfiles manually based on your application requirements.

### 3. Build Container Images

```powershell
# Build frontend image
docker build -f ./docker/frontend.Dockerfile -t todo-frontend:latest .

# Build backend image
docker build -f ./docker/backend.Dockerfile -t todo-backend:latest .
```

### 4. Deploy with Helm

Deploy the application using the provided Helm chart:

```powershell
# Deploy to default namespace
helm upgrade --install todo-app ./helm-charts/todo-app --namespace default

# Or use the PowerShell deployment script
./scripts/deploy.ps1
```

### 5. Access the Application

For local Minikube deployment:

```powershell
# Get the frontend service URL
minikube service todo-app-frontend-svc --url
```

## AI-Assisted Operations

### Using kubectl-ai for Deployment Operations

```powershell
# Deploy the application using natural language
kubectl-ai "deploy todo application with frontend and backend services"

# Scale services based on load
kubectl-ai "scale frontend service to handle more traffic"

# Troubleshoot issues
kubectl-ai "check why the pods are failing"
```

### Using Kagent for Cluster Analysis

```powershell
# Analyze cluster health
kagent "analyze the cluster health and provide optimization recommendations"

# Optimize resource allocation
kagent "optimize resource allocation for todo application"
```

## PowerShell Scripts

The repository includes PowerShell scripts for common operations:

- `scripts/deploy.ps1`: Deploy the application to Kubernetes
- `scripts/scale.ps1`: Scale frontend and backend services
- `scripts/monitor.ps1`: Monitor application health and performance

## Helm Chart Configuration

The Helm chart is located in `helm-charts/todo-app/` and includes:

- `Chart.yaml`: Chart metadata
- `values.yaml`: Default configuration values
- `templates/`: Kubernetes resource templates
  - Deployment templates for frontend and backend
  - Service templates for exposing services
  - ConfigMap templates for configuration
  - Ingress template for routing

## Troubleshooting

### Common Issues

1. **Docker not running**: Ensure Docker Desktop is running before starting Minikube
2. **Helm deployment fails**: Check that the namespace exists and you have proper permissions
3. **Services not accessible**: Verify ingress controller is running in your cluster

### AI Tool Issues

If AI tools (kubectl-ai, Kagent) are not available:

1. Fall back to standard kubectl commands
2. Use traditional Kubernetes configuration files
3. Follow standard Kubernetes troubleshooting procedures

## Next Steps

- Set up CI/CD pipeline with these AI-assisted deployment steps
- Configure monitoring and alerting for deployed services
- Implement horizontal pod autoscaling based on load
- Add security scanning to the containerization process