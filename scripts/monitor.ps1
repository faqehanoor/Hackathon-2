# PowerShell monitoring script for Todo Chatbot application
# This script monitors the health and performance of the deployed application

param(
    [string]$Namespace = "default",
    [int]$IntervalSeconds = 30,
    [int]$Count = 10
)

Write-Host "🔍 Starting monitoring for Todo Chatbot application..." -ForegroundColor Green

# Check prerequisites
Write-Host "🔍 Verifying prerequisites..."

if (!(Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Error "❌ kubectl is not installed or not in PATH"
    exit 1
}

Write-Host "✅ Prerequisites verified" -ForegroundColor Green

# Function to get basic cluster info
function Get-ClusterInfo {
    Write-Host "`n🌐 Cluster Information:" -ForegroundColor Cyan
    kubectl cluster-info
}

# Function to get pod status
function Get-PodStatus {
    Write-Host "`n📦 Pod Status:" -ForegroundColor Cyan
    kubectl get pods -n $Namespace
}

# Function to get resource utilization
function Get-ResourceUtilization {
    Write-Host "`n📊 Resource Utilization:" -ForegroundColor Cyan
    kubectl top pods -n $Namespace 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Metrics server may not be available. Resource utilization data not available."
    }
}

# Function to get deployment status
function Get-DeploymentStatus {
    Write-Host "`n🏗️  Deployment Status:" -ForegroundColor Cyan
    kubectl get deployments -n $Namespace
}

# Function to get service status
function Get-ServiceStatus {
    Write-Host "`n🔌 Service Status:" -ForegroundColor Cyan
    kubectl get services -n $Namespace
}

# Function to get recent logs from pods
function Get-RecentLogs {
    Write-Host "`n📝 Recent Logs:" -ForegroundColor Cyan

    $pods = kubectl get pods -n $Namespace -o json | ConvertFrom-Json
    foreach ($pod in $pods.items) {
        $podName = $pod.metadata.name
        Write-Host "Logs from $podName:" -ForegroundColor Yellow
        kubectl logs $podName -n $Namespace --tail=10 2>$null
        Write-Host "---"
    }
}

# Initial status check
Get-ClusterInfo
Get-PodStatus
Get-DeploymentStatus
Get-ServiceStatus
Get-ResourceUtilization

# Continuous monitoring loop
if ($Count -gt 0) {
    Write-Host "`n🔄 Starting continuous monitoring (Ctrl+C to stop)..." -ForegroundColor Cyan

    for ($i = 1; $i -le $Count; $i++) {
        Write-Host "`n--- Monitoring cycle $($i)/$($Count) ---" -ForegroundColor Magenta

        Get-PodStatus
        Get-ResourceUtilization

        # Check for any issues
        $problemPods = kubectl get pods -n $Namespace --field-selector=status.phase!=Running,status.phase!=Succeeded 2>$null
        if ($problemPods -and $problemPods.Count -gt 0) {
            Write-Host "⚠️  Problem pods detected:" -ForegroundColor Red
            Write-Host $problemPods
        }

        if ($i -lt $Count) {
            Write-Host "Waiting $IntervalSeconds seconds before next check..." -ForegroundColor Gray
            Start-Sleep -Seconds $IntervalSeconds
        }
    }
}

Write-Host "`n🎉 Monitoring completed!" -ForegroundColor Green

# Final status
Write-Host "`n📋 Final Status Summary:" -ForegroundColor Cyan
Get-PodStatus
Get-DeploymentStatus