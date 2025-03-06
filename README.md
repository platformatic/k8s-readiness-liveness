# Kubernetes Health Check Demo

This demo shows how to implement readiness and liveness probes in Kubernetes using a simple Platformatic application.

## Prerequisites

- Docker
- kubectl
- kind (Kubernetes in Docker) https://kind.sigs.k8s.io/docs/user/quick-start/

## Application Overview

The sample Platformatic application exposes three endpoints:
- `/` - Main application endpoint
- `/ready` - Readiness probe endpoint
- `/status` - Liveness probe endpoint

## Setup Instructions

```bash
docker build -t demo-readiness-liveness:latest .
kind create cluster --config k8s/kind-config.yaml
kind load docker-image demo-readiness-liveness:latest --name demo-readiness-liveness
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -w
```

## Verify the Setup

1. Check the deployment status:
```bash
kubectl get deployments
kubectl get pods
```

2. Access the application:
```bash
curl http://localhost:3001
```

3. Access the readiness and liveness probes:
```bash
curl http://localhost:9090/ready
```

```bash
curl http://localhost:9090/status
```

## Observing Health Checks

1. Watch pod status during startup:
```bash
kubectl get pods -w
```
You'll see pods in a non-ready state for the first 10 seconds due to the readiness probe.

2. Monitor pod restarts:
```bash
kubectl describe pod demo-readiness-liveness-<pod-suffix>
```
After several health check failures, you'll see the pod restart due to the liveness probe failing.

## Cleanup

To delete the cluster:
```bash
kind delete cluster --name demo-readiness-liveness
```
