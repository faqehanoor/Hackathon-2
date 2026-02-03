@echo off
REM Test script for Helm chart deployment on Windows
REM This script performs a dry-run deployment to validate the configuration

echo 🧪 Testing Helm chart deployment...

REM Navigate to the project directory
cd /d "C:\Users\pc\Desktop\Phase I\Phase 2"

echo 📍 Current directory: %CD%

REM Validate the Helm chart
echo 🔍 Validating Helm chart...
helm lint helm-charts/todo-app
if %errorlevel% neq 0 (
    echo ❌ Helm lint failed
    exit /b 1
)

echo ✅ Helm chart validation passed

REM Perform a dry-run installation to test the templates
echo 🔍 Testing template rendering with dry-run...
helm template test-release helm-charts/todo-app --namespace test-namespace --dry-run > nul
if %errorlevel% neq 0 (
    echo ❌ Helm template rendering failed
    exit /b 1
)

echo ✅ Helm template rendering successful

REM Count the number of generated resources (using findstr to count occurrences of apiVersion)
for /f %%i in ('helm template test-release helm-charts/todo-app --namespace test-namespace --dry-run ^| findstr /c:"apiVersion:"') do set /a RESOURCE_COUNT+=1
echo 📊 Generated %RESOURCE_COUNT% Kubernetes resources

echo 🎯 Helm chart is ready for deployment!

echo.
echo 📝 To deploy to a real cluster, use:
echo    helm upgrade --install todo-app helm-charts/todo-app --namespace todo-app --create-namespace
echo.
echo 📝 For production deployment, use:
echo    helm upgrade --install todo-app helm-charts/todo-app -f production-values.yaml --namespace todo-app --create-namespace