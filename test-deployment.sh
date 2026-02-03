#!/bin/bash
# Test script for Helm chart deployment
# This script performs a dry-run deployment to validate the configuration

echo "🧪 Testing Helm chart deployment..."

# Navigate to the project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "📍 Project root: $PROJECT_ROOT"

# Validate the Helm chart
echo "🔍 Validating Helm chart..."
helm lint helm-charts/todo-app
if [ $? -ne 0 ]; then
    echo "❌ Helm lint failed"
    exit 1
fi

echo "✅ Helm chart validation passed"

# Perform a dry-run installation to test the templates
echo "🔍 Testing template rendering with dry-run..."
helm template test-release helm-charts/todo-app --namespace test-namespace --dry-run > /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Helm template rendering failed"
    exit 1
fi

echo "✅ Helm template rendering successful"

# Count the number of generated resources
RESOURCE_COUNT=$(helm template test-release helm-charts/todo-app --namespace test-namespace --dry-run | grep -c "apiVersion:")
echo "📊 Generated $RESOURCE_COUNT Kubernetes resources"

echo "🎯 Helm chart is ready for deployment!"

echo ""
echo "📝 To deploy to a real cluster, use:"
echo "   helm upgrade --install todo-app helm-charts/todo-app --namespace todo-app --create-namespace"
echo ""
echo "📝 For production deployment, use:"
echo "   helm upgrade --install todo-app helm-charts/todo-app -f production-values.yaml --namespace todo-app --create-namespace"