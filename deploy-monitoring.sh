#!/bin/bash

# Monitoring Stack Deployment Script

set -e  # Exit immediately if a command exits with a non-zero status

echo "Monitoring Stack Deployment"
echo "==========================="

# Function to check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."

    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl is not installed"
        exit 1
    fi

    if ! kubectl cluster-info &> /dev/null; then
        echo "❌ No active Kubernetes cluster found"
        echo "💡 Please start a Kubernetes cluster first"
        exit 1
    fi

    echo "✅ Prerequisites check passed"
}

# Function to deploy monitoring stack
deploy_monitoring() {
    echo "Deploying monitoring stack..."

    # Apply Prometheus configuration
    echo "Deploying Prometheus..."
    kubectl apply -f monitoring/prometheus.yaml

    # Apply Grafana configuration
    echo "Deploying Grafana..."
    kubectl apply -f monitoring/grafana.yaml

    # Apply logging stack (EFK)
    echo "Deploying EFK stack..."
    kubectl apply -f monitoring/logging-efk.yaml

    echo "✅ Monitoring stack deployed successfully!"
}

# Function to check monitoring status
check_status() {
    echo "Checking monitoring stack status..."

    echo "Prometheus pods:"
    kubectl get pods -n monitoring -l app=prometheus

    echo -e "\nGrafana pods:"
    kubectl get pods -n monitoring -l app=grafana

    echo -e "\nLogging pods:"
    kubectl get pods -n logging

    echo -e "\nServices:"
    kubectl get svc -n monitoring
    kubectl get svc -n logging
}

# Function to display access information
display_access_info() {
    echo -e "\n📊 Access Information:"
    echo "Prometheus: kubectl port-forward svc/prometheus-service -n monitoring 9090:9090"
    echo "Grafana: kubectl port-forward svc/grafana -n monitoring 3000:3000"
    echo "Username: admin"
    echo "Password: admin123"
    echo "Kibana: kubectl port-forward svc/kibana -n logging 5601:5601"
}

# Main execution
main() {
    echo "Starting monitoring stack deployment..."

    check_prerequisites
    deploy_monitoring
    check_status
    display_access_info

    echo -e "\n🎉 Monitoring stack deployment completed!"
    echo "📝 Next steps:"
    echo "   1. Wait for all pods to be in Running state: kubectl get pods -n monitoring -n logging"
    echo "   2. Access the dashboards using the port-forward commands above"
    echo "   3. Configure Grafana datasource to connect to Prometheus"
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi