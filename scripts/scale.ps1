# PowerShell scaling script for Todo Chatbot application
# This script scales the frontend and backend services in the Kubernetes cluster

param(
    [int]$FrontendReplicas = 2,
    [int]$BackendReplicas = 2,
    [string]$Namespace = "default"
)

Write-Host ".AutoScale application services..." -ForegroundColor Green

# Check prerequisites
Write-Host "🔍 Verifying prerequisites..."

if (!(Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Error "❌ kubectl is not installed or not in PATH"
    exit 1
}

Write-Host "✅ Prerequisites verified" -ForegroundColor Green

# Scale frontend deployment
Write-Host "🔧 Scaling frontend deployment to $FrontendReplicas replicas..." -ForegroundColor Yellow
kubectl scale deployment todo-app-frontend --replicas=$FrontendReplicas -n $Namespace

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend scaled to $FrontendReplicas replicas" -ForegroundColor Green
} else {
    Write-Warning "⚠️  Failed to scale frontend deployment"
}

# Scale backend deployment
Write-Host "🔧 Scaling backend deployment to $BackendReplicas replicas..." -ForegroundColor Yellow
kubectl scale deployment todo-app-backend --replicas=$BackendReplicas -n $Namespace

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend scaled to $BackendReplicas replicas" -ForegroundColor Green
} else {
    Write-Warning "⚠️  Failed to scale backend deployment"
}

# Show current status
Write-Host "`n📊 Current deployment status:" -ForegroundColor Cyan
kubectl get deployments -n $Namespace

Write-Host "`n📈 Current replica counts:" -ForegroundColor Cyan
kubectl get deployment todo-app-frontend -n $Namespace -o jsonpath='{.status.replicas}{" frontend\n"}'
kubectl get deployment todo-app-backend -n $Namespace -o jsonpath='{.status.replicas}{" backend\n"}'

Write-Host "`n🎉 Scaling completed!" -ForegroundColor Green