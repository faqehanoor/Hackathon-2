# PowerShell deployment script for Todo Chatbot application
# This script deploys the application to a Kubernetes cluster using Helm

param(
    [string]$Environment = "local",
    [string]$Namespace = "default",
    [switch]$DryRun = $false
)

Write-Host "🚀 Starting deployment for Todo Chatbot application..." -ForegroundColor Green

# Check prerequisites
Write-Host "🔍 Verifying prerequisites..."

if (!(Get-Command helm -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Helm is not installed or not in PATH"
    exit 1
}

if (!(Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Error "❌ kubectl is not installed or not in PATH"
    exit 1
}

Write-Host "✅ Prerequisites verified" -ForegroundColor Green

# Set namespace if it doesn't exist
try {
    kubectl get namespace $Namespace -o json 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "📦 Creating namespace: $Namespace"
        kubectl create namespace $Namespace
    }
} catch {
    Write-Warning "Could not check/create namespace: $_"
}

# Determine if this is a dry run
$dryRunFlag = ""
if ($DryRun) {
    $dryRunFlag = "--dry-run=client"
    Write-Host "📝 Performing dry run..."
}

# Install/upgrade the Helm release
Write-Host "🔧 Installing/upgrading Helm release..." -ForegroundColor Yellow

$helmArgs = @("upgrade", "--install", "todo-app", "./helm-charts/todo-app", "--namespace", $Namespace, $dryRunFlag)

if ($Environment -eq "local") {
    # For local environment, we might want to set specific values
    $helmArgs += @("--set", "frontend.replicaCount=1", "--set", "backend.replicaCount=1")
}

& helm $helmArgs

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Helm release installed/updated successfully!" -ForegroundColor Green

    # Show deployment status
    Write-Host "`n📊 Deployment status:" -ForegroundColor Cyan
    kubectl get pods -n $Namespace
    kubectl get services -n $Namespace
    kubectl get ingress -n $Namespace 2>$null

    Write-Host "`n🎉 Deployment completed successfully!" -ForegroundColor Green
} else {
    Write-Error "❌ Helm installation failed"
    exit 1
}

# Instructions for accessing the application
Write-Host "`n📖 To access the application:" -ForegroundColor Cyan
Write-Host "   For local Minikube: minikube service todo-app-frontend-svc --url -n $Namespace"
Write-Host "   For other clusters: kubectl get ingress -n $Namespace"