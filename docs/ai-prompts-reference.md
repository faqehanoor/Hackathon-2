# AI Agent Prompts Reference

This document catalogs the AI agent prompts used for various tasks in the AI-assisted Kubernetes deployment project.

## Docker AI (Gordon) Prompts

### Dockerfile Generation
- `"create optimized Dockerfile for Next.js frontend application in current directory"`
- `"create optimized Dockerfile for FastAPI backend application in current directory"`

## kubectl-ai Prompts

### Deployment Operations
- `"create deployment for todo-frontend with image todo-frontend:latest and 2 replicas"`
- `"create deployment for todo-backend with image todo-backend:latest and 2 replicas"`
- `"expose deployments as services on appropriate ports (frontend 3000, backend 8000)"`
- `"create ingress to route traffic to frontend service"`
- `"deploy todo application with frontend and backend services"`
- `"scale backend service to handle more load"`
- `"check why the pods are failing"`
- `"show me the services and their ports"`

### Scaling Operations
- `"scale frontend deployment to 3 replicas if needed"`
- `"scale frontend service to handle more traffic"`

### Troubleshooting
- `"check why the pods are failing"`
- `"check why any pods are failing and provide solutions"`

## Kagent Prompts

### Cluster Analysis
- `"analyze the cluster health and provide optimization recommendations"`
- `"analyze the cluster health"`
- `"optimize resource allocation for todo application"`

## Additional AI Prompts

### Helm Chart Creation
- `"create optimized Helm chart for todo application with frontend and backend services"`
- `"generate Kubernetes deployment templates for Next.js frontend"`
- `"generate Kubernetes deployment templates for FastAPI backend"`

### Configuration Generation
- `"create optimized values.yaml for Helm chart with resource limits and health checks"`
- `"generate security-hardened Kubernetes manifests for production use"`

## PowerShell Script Generation
- `"create PowerShell deployment script for Helm-based Kubernetes application"`
- `"create PowerShell monitoring script for Kubernetes pods and services"`
- `"create PowerShell scaling script for Kubernetes deployments"`

## Best Practices for AI Prompts

1. **Be Specific**: Include context about the project, technology stack, and requirements
2. **Include Constraints**: Mention security, performance, or compliance requirements
3. **Specify Format**: Request specific formats (YAML, JSON, PowerShell, etc.)
4. **Reference Standards**: Mention Kubernetes best practices, security guidelines, etc.
5. **Iterate**: Refine prompts based on AI output quality and relevance