@echo off
REM Deployment script for Todo application (Windows Batch version)

echo Todo Application Deployment Script (Windows)
echo ==========================================

REM Function to check prerequisites
echo Checking prerequisites...

kubectl version --client >nul 2>&1
if errorlevel 1 (
    echo ❌ kubectl is not installed
    exit /b 1
) else (
    echo ✅ kubectl is available
)

helm version >nul 2>&1
if errorlevel 1 (
    echo ❌ helm is not installed
    exit /b 1
) else (
    echo ✅ helm is available
)

kubectl cluster-info >nul 2>&1
if errorlevel 1 (
    echo ❌ No active Kubernetes cluster found
    echo 💡 Please start a Kubernetes cluster ^(e.g., Minikube, Kind, or Docker Desktop Kubernetes^)
    exit /b 1
) else (
    echo ✅ Active Kubernetes cluster found
)

echo Prerequisites check passed

REM Function to deploy the application
echo Deploying Todo application...

REM Create namespace if it doesn't exist
kubectl create namespace todo-app --dry-run=client -o yaml --validate=false 2>nul | kubectl apply -f -
if errorlevel 1 (
    echo Namespace may already exist, continuing...
)

REM Deploy using Helm
echo Deploying with production values...
helm upgrade --install todo-app ./helm-charts/todo-app ^
    --namespace todo-app ^
    --values production-values.yaml ^
    --set backend.image.tag=latest ^
    --set frontend.image.tag=latest ^
    --wait ^
    --timeout=10m

if errorlevel 1 (
    echo ❌ Application deployment failed
    exit /b 1
) else (
    echo ✅ Application deployed successfully!
)

REM Function to check deployment status
echo Checking deployment status...

echo Deployments:
kubectl get deployments -n todo-app

echo Services:
kubectl get services -n todo-app

echo Pods:
kubectl get pods -n todo-app

echo Persistent Volume Claims:
kubectl get pvc -n todo-app

echo Ingress (if exists):
kubectl get ingress -n todo-app 2>nul || echo No ingress found

echo ConfigMaps and Secrets:
kubectl get configmaps,secrets -n todo-app

REM Function to initialize database (if needed)
echo Initializing database...

echo Waiting for PostgreSQL to be ready...
kubectl wait --for=condition=ready pod -l app=postgresql -n todo-app --timeout=120s

echo ✅ Database initialization completed

REM Function to expose the application (if needed)
echo Exposing application...

echo You can access the application using:
echo kubectl port-forward svc/todo-app-frontend-svc -n todo-app 3000:3000
echo Then visit http://localhost:3000

echo.
echo 🎉 Deployment completed!
echo 📝 Next steps:
echo    1. Verify the application is running: kubectl get pods -n todo-app
echo    2. Port forward to test: kubectl port-forward svc/todo-app-frontend-svc -n todo-app 3000:3000
echo    3. Check logs: kubectl logs -n todo-app deployment/todo-app-frontend
echo    4. Monitor resources: kubectl top pods -n todo-app

pause