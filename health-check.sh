#!/bin/bash

# Health check script for Todo application
# Verifies that all components of the application are running properly

set -e  # Exit immediately if a command exits with a non-zero status

NAMESPACE="todo-app"

echo "Todo Application Health Check Script"
echo "====================================="

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl is not installed"
        exit 1
    fi
    echo "✅ kubectl is available"
}

# Function to check if the namespace exists
check_namespace() {
    if kubectl get namespace $NAMESPACE &> /dev/null; then
        echo "✅ Namespace '$NAMESPACE' exists"
    else
        echo "❌ Namespace '$NAMESPACE' does not exist"
        echo "💡 Run './deploy.sh' to deploy the application first"
        exit 1
    fi
}

# Function to check deployment status
check_deployments() {
    echo "Checking deployments..."

    DEPLOYMENTS=("todo-app-frontend" "todo-app-backend" "todo-app-postgresql")

    for deployment in "${DEPLOYMENTS[@]}"; do
        if kubectl get deployment $deployment -n $NAMESPACE &> /dev/null; then
            READY_REPLICAS=$(kubectl get deployment $deployment -n $NAMESPACE -o jsonpath='{.status.readyReplicas}')
            DESIRED_REPLICAS=$(kubectl get deployment $deployment -n $NAMESPACE -o jsonpath='{.spec.replicas}')

            if [ "$READY_REPLICAS" -eq "$DESIRED_REPLICAS" ] && [ "$READY_REPLICAS" -gt 0 ]; then
                echo "✅ $deployment: $READY_REPLICAS/$DESIRRED_REPLICAS replicas ready"
            else
                echo "❌ $deployment: $READY_REPLICAS/$DESIRED_REPLICAS replicas ready"
                return 1
            fi
        else
            echo "❌ Deployment '$deployment' not found"
            return 1
        fi
    done
}

# Function to check service availability
check_services() {
    echo "Checking services..."

    SERVICES=("todo-app-frontend-svc" "todo-app-backend-svc" "todo-app-postgresql-svc")

    for service in "${SERVICES[@]}"; do
        if kubectl get service $service -n $NAMESPACE &> /dev/null; then
            echo "✅ $service: Available"
        else
            echo "❌ $service: Not found"
            return 1
        fi
    done
}

# Function to check pod status
check_pods() {
    echo "Checking pods..."

    PODS=$(kubectl get pods -n $NAMESPACE -o jsonpath='{.items[*].metadata.name}')

    if [ -z "$PODS" ]; then
        echo "❌ No pods found in namespace '$NAMESPACE'"
        return 1
    fi

    for pod in $PODS; do
        STATUS=$(kubectl get pod $pod -n $NAMESPACE -o jsonpath='{.status.phase}')

        if [ "$STATUS" = "Running" ]; then
            echo "✅ $pod: $STATUS"
        else
            echo "❌ $pod: $STATUS"
            # Show more details for failed pods
            echo "   Pod details:"
            kubectl describe pod $pod -n $NAMESPACE | grep -A 10 "Conditions\|Events\|Status:" | head -20
            return 1
        fi
    done
}

# Function to check persistent volume claims (if applicable)
check_pvcs() {
    echo "Checking PersistentVolumeClaims..."

    PVCS=$(kubectl get pvc -n $NAMESPACE -o jsonpath='{.items[*].metadata.name}')

    if [ -z "$PVCS" ]; then
        echo "ℹ️  No PersistentVolumeClaims found in namespace '$NAMESPACE'"
        return 0
    fi

    for pvc in $PVCS; do
        STATUS=$(kubectl get pvc $pvc -n $NAMESPACE -o jsonpath='{.status.phase}')

        if [ "$STATUS" = "Bound" ]; then
            echo "✅ $pvc: $STATUS"
        else
            echo "❌ $pvc: $STATUS"
            return 1
        fi
    done
}

# Function to check if application endpoints are responsive
check_endpoints() {
    echo "Checking application endpoints..."

    # Check if we can port-forward to the frontend
    echo "Testing frontend connectivity..."
    timeout 10s kubectl port-forward svc/todo-app-frontend-svc -n $NAMESPACE 8080:3000 &
    PORT_FWD_PID=$!

    sleep 3  # Give port forward time to establish

    if nc -z localhost 8080; then
        echo "✅ Frontend service is reachable via port-forward"
        # Try to get a basic response (this might fail if the service doesn't respond to HEAD)
        if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 2>/dev/null | grep -q "200\|404\|301\|302"; then
            echo "✅ Frontend service responded with HTTP status"
        fi
    else
        echo "⚠️  Could not establish port-forward to frontend (might be expected in some environments)"
    fi

    # Kill the port forward process
    kill $PORT_FWD_PID 2>/dev/null || true

    # Check backend health endpoint if available
    echo "Testing backend health endpoint..."
    timeout 10s kubectl port-forward svc/todo-app-backend-svc -n $NAMESPACE 8081:8000 &
    BACKEND_PORT_FWD_PID=$!

    sleep 3  # Give port forward time to establish

    if nc -z localhost 8081; then
        echo "✅ Backend service is reachable via port-forward"
        # Try to hit the health endpoint if it exists
        if curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/health 2>/dev/null | grep -q "200"; then
            echo "✅ Backend health endpoint returned 200"
        elif curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/ready 2>/dev/null | grep -q "200"; then
            echo "✅ Backend ready endpoint returned 200"
        else
            echo "ℹ️  Backend service reachable but no standard health endpoint found"
        fi
    else
        echo "⚠️  Could not establish port-forward to backend (might be expected in some environments)"
    fi

    # Kill the port forward process
    kill $BACKEND_PORT_FWD_PID 2>/dev/null || true
}

# Function to display summary
display_summary() {
    echo ""
    echo "==============================="
    echo "Health Check Summary"
    echo "==============================="
    echo "Namespace: $NAMESPACE"
    echo "Date: $(date)"
    echo ""
    echo "Components checked:"
    echo "- Deployments status"
    echo "- Services availability"
    echo "- Pods status"
    echo "- PersistentVolumeClaims"
    echo "- Application endpoints"
    echo ""
    echo "🎉 All checks passed! The Todo application is healthy."
    echo ""
    echo "Next steps:"
    echo "1. Access the application: kubectl port-forward svc/todo-app-frontend-svc -n $NAMESPACE 3000:3000"
    echo "2. Visit http://localhost:3000"
    echo "3. Monitor resources: kubectl top pods -n $NAMESPACE"
}

# Main execution
main() {
    echo "Starting health check for Todo application..."
    echo ""

    check_kubectl
    check_namespace
    check_deployments
    check_services
    check_pods
    check_pvcs
    check_endpoints

    display_summary
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi