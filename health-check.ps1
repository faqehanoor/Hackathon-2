# Health check script for Todo application (PowerShell version)
# Verifies that all components of the application are running properly

param(
    [string]$Namespace = "todo-app",
    [int]$TimeoutSeconds = 30
)

Write-Host "Todo Application Health Check Script (PowerShell)" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Function to check if kubectl is available
function Check-Kubectl {
    try {
        $result = kubectl version --client
        Write-Host "✅ kubectl is available" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ kubectl is not installed or not in PATH" -ForegroundColor Red
        exit 1
    }
}

# Function to check if the namespace exists
function Check-Namespace {
    try {
        $result = kubectl get namespace $Namespace
        Write-Host "✅ Namespace '$Namespace' exists" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Namespace '$Namespace' does not exist" -ForegroundColor Red
        Write-Host "💡 Run './deploy.bat' to deploy the application first" -ForegroundColor Yellow
        exit 1
    }
}

# Function to check deployment status
function Check-Deployments {
    Write-Host "Checking deployments..." -ForegroundColor Cyan

    $deployments = @("todo-app-frontend", "todo-app-backend", "todo-app-postgresql")

    foreach ($deployment in $deployments) {
        try {
            $deploymentInfo = kubectl get deployment $deployment -n $Namespace -o json | ConvertFrom-Json
            $readyReplicas = $deploymentInfo.status.readyReplicas
            $desiredReplicas = $deploymentInfo.spec.replicas

            if ($readyReplicas -eq $desiredReplicas -and $readyReplicas -gt 0) {
                Write-Host "✅ $deployment: $readyReplicas/$desiredReplicas replicas ready" -ForegroundColor Green
            } else {
                Write-Host "❌ $deployment: $readyReplicas/$desiredReplicas replicas ready" -ForegroundColor Red
                return $false
            }
        }
        catch {
            Write-Host "❌ Deployment '$deployment' not found" -ForegroundColor Red
            return $false
        }
    }
    return $true
}

# Function to check service availability
function Check-Services {
    Write-Host "Checking services..." -ForegroundColor Cyan

    $services = @("todo-app-frontend-svc", "todo-app-backend-svc", "todo-app-postgresql-svc")

    foreach ($service in $services) {
        try {
            $result = kubectl get service $service -n $Namespace
            Write-Host "✅ $service: Available" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ $service: Not found" -ForegroundColor Red
            return $false
        }
    }
    return $true
}

# Function to check pod status
function Check-Pods {
    Write-Host "Checking pods..." -ForegroundColor Cyan

    try {
        $pods = kubectl get pods -n $Namespace -o json | ConvertFrom-Json
        $podItems = $pods.items

        if ($podItems.Count -eq 0) {
            Write-Host "❌ No pods found in namespace '$Namespace'" -ForegroundColor Red
            return $false
        }

        foreach ($pod in $podItems) {
            $podName = $pod.metadata.name
            $status = $pod.status.phase

            if ($status -eq "Running") {
                Write-Host "✅ $podName: $status" -ForegroundColor Green
            } else {
                Write-Host "❌ $podName: $status" -ForegroundColor Red
                # Show more details for failed pods
                Write-Host "   Pod details:" -ForegroundColor Yellow
                $details = kubectl describe pod $podName -n $Namespace
                $relevantLines = $details -split "`n" | Select-String -Pattern "Conditions|Events|Status:" | Select-Object -First 10
                foreach ($line in $relevantLines) {
                    Write-Host "   $line" -ForegroundColor Yellow
                }
                return $false
            }
        }
    }
    catch {
        Write-Host "❌ Error checking pods: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    return $true
}

# Function to check persistent volume claims (if applicable)
function Check-PVCs {
    Write-Host "Checking PersistentVolumeClaims..." -ForegroundColor Cyan

    try {
        $pvcs = kubectl get pvc -n $Namespace -o json | ConvertFrom-Json
        $pvcItems = $pvcs.items

        if ($pvcItems.Count -eq 0) {
            Write-Host "ℹ️  No PersistentVolumeClaims found in namespace '$Namespace'" -ForegroundColor Yellow
            return $true
        }

        foreach ($pvc in $pvcItems) {
            $pvcName = $pvc.metadata.name
            $status = $pvc.status.phase

            if ($status -eq "Bound") {
                Write-Host "✅ $pvcName: $status" -ForegroundColor Green
            } else {
                Write-Host "❌ $pvcName: $status" -ForegroundColor Red
                return $false
            }
        }
    }
    catch {
        Write-Host "❌ Error checking PVCs: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    return $true
}

# Function to display summary
function Display-Summary {
    Write-Host ""
    Write-Host "===============================" -ForegroundColor Green
    Write-Host "Health Check Summary" -ForegroundColor Green
    Write-Host "===============================" -ForegroundColor Green
    Write-Host "Namespace: $Namespace"
    Write-Host "Date: $(Get-Date)"
    Write-Host ""
    Write-Host "Components checked:" -ForegroundColor Cyan
    Write-Host "- Deployments status"
    Write-Host "- Services availability"
    Write-Host "- Pods status"
    Write-Host "- PersistentVolumeClaims"
    Write-Host ""
    Write-Host "🎉 All checks passed! The Todo application is healthy." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Access the application: kubectl port-forward svc/todo-app-frontend-svc -n $Namespace 3000:3000"
    Write-Host "2. Visit http://localhost:3000"
    Write-Host "3. Monitor resources: kubectl top pods -n $Namespace"
}

# Main execution
function Main {
    Write-Host "Starting health check for Todo application..." -ForegroundColor Yellow
    Write-Host ""

    $checksPassed = $true

    $checksPassed = Check-Kubectl
    if (-not $checksPassed) { return }

    $checksPassed = Check-Namespace
    if (-not $checksPassed) { return }

    $checksPassed = Check-Deployments
    if (-not $checksPassed) { return }

    $checksPassed = Check-Services
    if (-not $checksPassed) { return }

    $checksPassed = Check-Pods
    if (-not $checksPassed) { return }

    $checksPassed = Check-PVCs
    if (-not $checksPassed) { return }

    Display-Summary
}

# Run main function
Main