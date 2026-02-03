#!/bin/bash

# Deployment script for Todo application

set -e  # Exit immediately if a command exits with a non-zero status

echo "Todo Application Deployment Script"
echo "=================================="

# Function to check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."

    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl is not installed"
        exit 1
    fi

    if ! command -v helm &> /dev/null; then
        echo "❌ helm is not installed"
        exit 1
    fi

    if ! kubectl cluster-info &> /dev/null; then
        echo "❌ No active Kubernetes cluster found"
        echo "💡 Please start a Kubernetes cluster (e.g., Minikube, Kind, or Docker Desktop Kubernetes)"
        exit 1
    fi

    echo "✅ Prerequisites check passed"
}

# Function to deploy the application
deploy_application() {
    echo "Deploying Todo application..."

    # Create namespace if it doesn't exist
    kubectl create namespace todo-app --dry-run=client -o yaml | kubectl apply -f -

    # Deploy using Helm
    helm upgrade --install todo-app ./helm-charts/todo-app \
        --namespace todo-app \
        --values production-values.yaml \
        --set backend.image.tag=latest \
        --set frontend.image.tag=latest \
        --wait \
        --timeout=10m

    echo "✅ Application deployed successfully!"
}

# Function to check deployment status
check_status() {
    echo "Checking deployment status..."

    echo "Deployments:"
    kubectl get deployments -n todo-app

    echo -e "\nServices:"
    kubectl get services -n todo-app

    echo -e "\nPods:"
    kubectl get pods -n todo-app

    echo -e "\nPersistent Volume Claims:"
    kubectl get pvc -n todo-app

    echo -e "\nIngress (if exists):"
    kubectl get ingress -n todo-app 2>/dev/null || echo "No ingress found"

    echo -e "\nConfigMaps and Secrets:"
    kubectl get configmaps,secrets -n todo-app
}

# Function to initialize database (if needed)
initialize_database() {
    echo "Initializing database..."

    # Wait for PostgreSQL to be ready
    echo "Waiting for PostgreSQL to be ready..."
    kubectl wait --for=condition=ready pod -l app=postgresql -n todo-app --timeout=120s

    # Optionally run database migrations here
    # kubectl exec -it deployment/todo-app-postgresql -n todo-app -- psql -U postgres -c "CREATE DATABASE IF NOT EXISTS todoapp;"

    echo "✅ Database initialization completed"
}

# Function to expose the application (if needed)
expose_application() {
    echo "Exposing application..."

    # If using LoadBalancer service type, wait for external IP
    # Otherwise, use port forwarding for testing
    echo "You can access the application using:"
    echo "kubectl port-forward svc/test-release-todo-app-frontend-svc -n todo-app 3000:3000"
    echo "Then visit http://localhost:3000"
}

# Main execution
main() {
    echo "Starting deployment process..."

    check_prerequisites
    deploy_application
    initialize_database  # Initialize database after deployment
    check_status
    expose_application

    echo -e "\n🎉 Deployment completed!"
    echo "📝 Next steps:"
    echo "   1. Verify the application is running: kubectl get pods -n todo-app"
    echo "   2. Port forward to test: kubectl port-forward svc/todo-app-frontend-svc -n todo-app 3000:3000"
    echo "   3. Check logs: kubectl logs -n todo-app deployment/todo-app-frontend"
    echo "   4. Monitor resources: kubectl top pods -n todo-app"
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi