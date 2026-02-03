# Todo App - Kubernetes Deployment Guide

This guide provides comprehensive instructions for deploying the Todo application on Kubernetes using Helm charts.

## Architecture Overview

The Todo application consists of:

- **Frontend**: Next.js application serving the user interface
- **Backend**: FastAPI application providing REST API services
- **Database**: PostgreSQL database for data persistence
- **Monitoring**: Prometheus, Grafana, and EFK stack (optional)

## Prerequisites

Before deploying, ensure you have:

- Kubernetes cluster (Minikube, Kind, Docker Desktop, or cloud provider)
- Helm 3.x installed
- kubectl installed and configured
- Docker installed (for building images)

## Quick Start

### 1. Build Docker Images

```bash
./build-images.sh
```

### 2. Deploy to Kubernetes

```bash
# For development
helm upgrade --install todo-app ./helm-charts/todo-app --namespace todo-app --create-namespace

# For production
./deploy.sh
```

### 3. Access the Application

```bash
# Port forward for testing
kubectl port-forward svc/todo-app-frontend-svc -n todo-app 3000:3000

# Then visit http://localhost:3000
```

## Configuration

### Values Override

You can customize the deployment using values files:

- `values.yaml` - Default development values
- `production-values.yaml` - Production-ready configuration
- Custom values file: `--values my-values.yaml`

### Key Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `frontend.replicaCount` | Number of frontend replicas | 1 |
| `backend.replicaCount` | Number of backend replicas | 1 |
| `postgresql.database` | PostgreSQL database name | todoapp |
| `postgresql.persistence.size` | Database storage size | 1Gi |
| `ingress.enabled` | Enable ingress controller | false |

### Production Configuration

For production deployments, use `production-values.yaml` which includes:

- Higher replica counts (3 each for frontend/backend)
- Horizontal Pod Autoscaling enabled
- Enhanced security contexts
- Increased resource limits
- Larger persistent storage (5Gi)

## Security Features

The deployment includes several security measures:

- **Security Contexts**: Non-root users, restricted capabilities
- **Secrets Management**: Encrypted sensitive data
- **Network Policies**: Restricted inter-service communication
- **Resource Quotas**: Prevent resource exhaustion
- **Read-Only Filesystems**: Where possible

## Monitoring and Observability

### Built-in Health Checks

- Liveness and readiness probes for all services
- Health endpoints: `/health` and `/ready`

### Resource Monitoring

```bash
# Monitor resource usage
kubectl top nodes
kubectl top pods -n todo-app
```

### Log Collection

The monitoring stack includes:

- **Prometheus**: Metrics collection
- **Grafana**: Dashboard visualization
- **Elasticsearch, Fluentd, Kibana**: Log aggregation

Deploy with:

```bash
./deploy-monitoring.sh
```

## Scaling

### Manual Scaling

```bash
# Scale frontend
kubectl scale deployment todo-app-frontend -n todo-app --replicas=3

# Scale backend
kubectl scale deployment todo-app-backend -n todo-app --replicas=3
```

### Automatic Scaling

Horizontal Pod Autoscaler is enabled in production values:

```yaml
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

## Database Management

### Persistence

- PersistentVolumeClaim for data durability
- Configurable storage size and class
- Automated backup recommendations

### Connection

The backend connects to PostgreSQL using:

- Service discovery: `todo-app-postgresql-svc:5432`
- Environment variables for credentials
- Secure secret mounting

## Networking

### Internal Communication

- Services for internal pod communication
- Network policies restricting traffic
- DNS-based service discovery

### External Access

- Ingress controller for HTTP/HTTPS routing
- TLS certificate support
- LoadBalancer or NodePort services

## Backup and Recovery

### Database Backups

For production environments, implement regular database backups:

```bash
# Example backup command
kubectl exec -it deployment/todo-app-postgresql -n todo-app -- pg_dump -U postgres todoapp > backup.sql
```

### Disaster Recovery

- Regular PVC snapshots
- Database dump automation
- Multi-replica configurations for high availability

## Troubleshooting

### Common Issues

1. **Images not found**: Run `./build-images.sh` to build local images
2. **Insufficient resources**: Check resource quotas with `kubectl describe quota -n todo-app`
3. **Service unavailable**: Check network policies and ingress configuration

### Diagnostic Commands

```bash
# Check all resources
kubectl get all -n todo-app

# Check events
kubectl get events -n todo-app --sort-by='.lastTimestamp'

# Check logs
kubectl logs -n todo-app deployment/todo-app-backend
kubectl logs -n todo-app deployment/todo-app-frontend
kubectl logs -n todo-app deployment/todo-app-postgresql
```

## Development Workflow

### Local Development

1. Make code changes
2. Rebuild images: `./build-images.sh`
3. Redeploy: `helm upgrade ...`
4. Test changes

### CI/CD Integration

The deployment supports CI/CD pipelines with:

- Automated image building
- Helm chart validation
- Rolling updates
- Health checks

## Cleanup

To remove the deployment:

```bash
# Uninstall Helm release
helm uninstall todo-app -n todo-app

# Remove namespace
kubectl delete namespace todo-app

# Optional: Clean up persistent volumes
kubectl delete pvc -n todo-app
```

## Best Practices

- Always use production values for production deployments
- Monitor resource usage and adjust limits accordingly
- Implement proper backup strategies
- Use secrets management systems in production
- Regular security scanning of images
- Network segmentation for sensitive data