# Troubleshooting Guide: AI-Assisted Kubernetes Deployment

This guide covers common issues and solutions when deploying the Todo Chatbot application using AI-assisted tools and Kubernetes.

## Prerequisites Issues

### Docker Not Running
**Problem**: Docker daemon not accessible
**Symptoms**:
- `docker version` fails to connect
- Minikube cannot start with Docker driver
- Error: "failed to connect to the docker API"

**Solution**:
1. Start Docker Desktop application
2. Wait for Docker daemon to fully start
3. Verify Docker is running: `docker version`
4. Restart Docker if needed

### Minikube Issues
**Problem**: Minikube cluster won't start
**Symptoms**:
- `minikube start` fails
- Driver not healthy errors
- Permission issues

**Solutions**:
1. For Docker driver issues:
   ```powershell
   # Ensure Docker is running
   docker version

   # Start minikube with Docker driver explicitly
   minikube start --driver=docker
   ```

2. For Hyper-V permission issues:
   ```powershell
   # Run PowerShell as Administrator
   minikube start --driver=hyperv
   ```

3. To reset Minikube if permanently stuck:
   ```powershell
   minikube delete
   minikube start
   ```

### Helm Issues
**Problem**: Helm commands fail
**Symptoms**:
- `helm version` not found
- Helm repositories inaccessible

**Solutions**:
1. Install Helm from https://helm.sh/docs/intro/install/
2. Verify installation: `helm version`
3. Add stable repository if needed: `helm repo add stable https://charts.helm.sh/stable`

### AI Tools Missing
**Problem**: kubectl-ai or Kagent not found
**Symptoms**:
- Commands not recognized
- "command not found" errors

**Solutions**:
1. Install kubectl-ai plugin:
   ```bash
   # For Linux/macOS
   curl -L https://raw.githubusercontent.com/your-repo/kubectl-ai/master/install.sh | bash

   # For Windows, download the binary manually
   ```

2. Install Kagent following the official documentation
3. Verify installations: `kubectl-ai --version` and `kagent --version`

## Deployment Issues

### Helm Chart Installation Failures
**Problem**: Helm upgrade/install fails
**Symptoms**:
- Chart validation errors
- Template rendering failures
- Kubernetes resource conflicts

**Solutions**:
1. Validate chart syntax:
   ```bash
   helm lint ./helm-charts/todo-app
   ```

2. Dry-run to check for errors:
   ```bash
   helm install todo-app ./helm-charts/todo-app --dry-run
   ```

3. Check for existing resources:
   ```bash
   kubectl get all -n <namespace>
   ```

### Pod Failures
**Problem**: Pods are in CrashLoopBackOff or Error state
**Symptoms**:
- `kubectl get pods` shows Error/CrashLoopBackOff status
- Application not accessible

**Solutions**:
1. Check pod logs:
   ```bash
   kubectl logs <pod-name> -n <namespace>
   ```

2. Describe pod for detailed info:
   ```bash
   kubectl describe pod <pod-name> -n <namespace>
   ```

3. Check resource constraints:
   ```bash
   kubectl top nodes
   kubectl top pods
   ```

### Service Accessibility Issues
**Problem**: Services not accessible
**Symptoms**:
- Cannot reach application via service IP/ports
- Ingress not routing properly

**Solutions**:
1. Check service status:
   ```bash
   kubectl get svc -n <namespace>
   ```

2. For Minikube, use service URL:
   ```bash
   minikube service <service-name> --url -n <namespace>
   ```

3. Check ingress controller:
   ```bash
   kubectl get ingress -n <namespace>
   kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
   ```

## AI Tool Specific Issues

### Docker AI (Gordon) Unavailable
**Problem**: Docker AI commands not working
**Symptoms**:
- `docker ai` command not found
- Beta features not enabled

**Solutions**:
1. Enable Docker AI features:
   - Open Docker Desktop Settings
   - Go to Features in development
   - Enable "Docker AI"
   - Restart Docker

2. Use standard Dockerfiles if AI unavailable

### kubectl-ai Natural Language Processing
**Problem**: Natural language commands misunderstood
**Symptoms**:
- Unexpected Kubernetes resources created
- Commands fail with parsing errors

**Solutions**:
1. Use more specific language:
   - Instead of "fix it", say "scale deployment to 2 replicas"
   - Be explicit about resource names and types

2. Fall back to standard kubectl if needed:
   ```bash
   kubectl scale deployment <name> --replicas=2
   ```

## Resource Optimization Issues

### High Memory/CPU Usage
**Problem**: Containers using more resources than expected
**Symptoms**:
- Resource limits exceeded
- Pod evicted due to resource pressure

**Solutions**:
1. Check resource usage:
   ```bash
   kubectl top pods -n <namespace>
   ```

2. Adjust resource limits in values.yaml:
   ```yaml
   resources:
     limits:
       cpu: 500m
       memory: 1Gi
     requests:
       cpu: 100m
       memory: 128Mi
   ```

3. Use Kagent for optimization recommendations:
   ```bash
   kagent "analyze resource usage for todo-app"
   ```

## Network and Connectivity Issues

### Inter-service Communication
**Problem**: Frontend cannot reach backend service
**Symptoms**:
- API calls from frontend to backend failing
- Connection timeouts

**Solutions**:
1. Verify service names and ports:
   ```bash
   kubectl get svc -n <namespace>
   ```

2. Test connectivity from frontend pod:
   ```bash
   kubectl exec -it <frontend-pod> -n <namespace> -- nslookup <backend-service-name>
   ```

3. Check service DNS resolution:
   ```bash
   # From inside pod
   nslookup <service-name>.<namespace>.svc.cluster.local
   ```

## Windows/PowerShell Specific Issues

### Path and Command Issues
**Problem**: PowerShell commands not working as expected
**Symptoms**:
- Path separator issues
- Command syntax errors

**Solutions**:
1. Use PowerShell-idiomatic commands:
   - `mkdir -Path` instead of `mkdir`
   - Proper path separators: `.\scripts\deploy.ps1`

2. Check execution policy:
   ```powershell
   Get-ExecutionPolicy
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## Quick Diagnostics Commands

### Health Check Script
Run this to quickly assess the state of your deployment:

```bash
kubectl get pods,svc,deploy,ingress -n <namespace>
kubectl describe deployment todo-app-frontend -n <namespace>
kubectl describe deployment todo-app-backend -n <namespace>
kubectl logs deployment/todo-app-frontend -n <namespace> --tail=20
kubectl logs deployment/todo-app-backend -n <namespace> --tail=20
```

### AI Tool Verification
Quick check if AI tools are working:

```bash
kubectl-ai "show me the pods in default namespace" 2>&1
kagent "show cluster status" 2>&1
```

## Recovery Procedures

### Complete Reset
If everything is broken, perform a complete reset:

1. Delete the Helm release:
   ```bash
   helm uninstall todo-app -n <namespace>
   ```

2. Clean up any leftover resources:
   ```bash
   kubectl delete all -l app=todo-app -n <namespace>
   ```

3. Restart Minikube if needed:
   ```bash
   minikube delete
   minikube start
   ```

4. Redeploy the application:
   ```bash
   ./scripts/deploy.ps1
   ```

## Contact and Support

If issues persist:
1. Check the official documentation for each tool
2. Review the logs and error messages carefully
3. Consult the community forums for Docker, Kubernetes, Helm, and AI tools
4. Reach out to your team for assistance