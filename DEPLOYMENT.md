# Phase 4: Helm-Based Kubernetes (Minikube) Deployment Guide

This guide provides step-by-step instructions for deploying the Todo Application to a local Kubernetes cluster using Minikube and Helm.

## Prerequisites

Ensure you have the following installed:
- Docker Desktop (or Docker Engine)
- Minikube
- kubectl
- Helm 3+
- Node.js 20+ (for local development)

### Verify Installation

```bash
# Check Docker
docker --version

# Check Minikube
minikube version

# Check kubectl
kubectl version --client

# Check Helm
helm version
```

---

## 1. Start Minikube

```bash
# Start Minikube with sufficient resources
minikube start --cpus=4 --memory=8192 --driver=docker

# Verify Minikube is running
minikube status

# Enable required addons
minikube addons enable ingress
minikube addons enable metrics-server
```

---

## 2. Configure Docker to Use Minikube's Docker Daemon

This step is **critical** - it allows you to build images directly into Minikube's Docker registry.

### On Windows (PowerShell):
```powershell
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

### On Windows (CMD):
```cmd
@FOR /f "tokens=*" %i IN ('minikube -p minikube docker-env --shell cmd') DO @%i
```

### On Linux/macOS:
```bash
eval $(minikube docker-env)
```

**Note:** You must run this command in every new terminal session.

---

## 3. Build Docker Images

```bash
# Navigate to project root
cd C:\Users\Lenovo\Desktop\TODO_APP_PHASE4

# Build Backend Image
docker build -t todo-backend:latest -f backend/Dockerfile ./backend

# Build Frontend Image
docker build -t todo-frontend:latest -f frontend/Dockerfile ./frontend

# Verify images
docker images | grep todo
```

---

## 4. Deploy with Helm

### Install the Helm Chart

```bash
# Install the todo-app chart
helm install todo-app k8s/helm/todo-app --namespace todo-app --create-namespace

# Or with custom values
helm install todo-app k8s/helm/todo-app \
  --namespace todo-app \
  --create-namespace \
  --set backend.image.tag=v1.0.0 \
  --set frontend.image.tag=v1.0.0
```

### Upgrade an Existing Release

```bash
helm upgrade todo-app k8s/helm/todo-app --namespace todo-app
```

### Check Release Status

```bash
helm status todo-app --namespace todo-app
helm list --namespace todo-app
```

### Uninstall

```bash
helm uninstall todo-app --namespace todo-app
```

---

## 5. Verify Deployment

### Check Pod Status

```bash
kubectl get pods -n todo-app -w

# Expected output:
# NAME                                    READY   STATUS    RESTARTS   AGE
# todo-app-backend-xxxxxxxxxx-xxxxx       1/1     Running   0          1m
# todo-app-frontend-xxxxxxxxxx-xxxxx      1/1     Running   0          1m
# todo-app-postgres-0                     1/1     Running   0          1m
```

### Check Services

```bash
kubectl get services -n todo-app

# Expected output:
# NAME                  TYPE        CLUSTER-IP       PORT(S)    AGE
# todo-app-backend      ClusterIP   10.96.xxx.xxx    5006/TCP   1m
# todo-app-frontend     ClusterIP   10.96.xxx.xxx    80/TCP     1m
# todo-app-postgres     ClusterIP   10.96.xxx.xxx    5432/TCP   1m
```

### Check Ingress

```bash
kubectl get ingress -n todo-app
```

### View Pod Logs

```bash
kubectl logs -f deployment/todo-app-backend -n todo-app
kubectl logs -f deployment/todo-app-frontend -n todo-app
```

---

## 6. Access the Application

### Using Minikube Tunnel (Recommended for Ingress)

```bash
# In a separate terminal:
minikube tunnel

# Then access:
# http://localhost       (frontend)
# http://localhost/api   (backend API)
```

### Using Port Forwarding

```bash
kubectl port-forward service/todo-app-frontend 8080:80 -n todo-app
kubectl port-forward service/todo-app-backend 5006:5006 -n todo-app

# Access:
# Frontend: http://localhost:8080
# Backend API: http://localhost:5006
```

---

## 7. Test Backend Health

```bash
curl http://localhost:5006/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "todo-backend",
  "timestamp": "2026-01-30T..."
}
```

---

## 8. Automated Deployment

Use the provided deployment script:

```bash
# Linux/macOS
bash scripts/phase4_deploy.sh

# Windows (Git Bash)
bash scripts/phase4_deploy.sh
```

---

## Quick Reference Commands

| Action | Command |
|--------|---------|
| Start Minikube | `minikube start --cpus=4 --memory=8192` |
| Configure Docker | `eval $(minikube docker-env)` |
| Build Backend | `docker build -t todo-backend:latest -f backend/Dockerfile ./backend` |
| Build Frontend | `docker build -t todo-frontend:latest -f frontend/Dockerfile ./frontend` |
| Install Helm Chart | `helm install todo-app k8s/helm/todo-app -n todo-app --create-namespace` |
| Upgrade Release | `helm upgrade todo-app k8s/helm/todo-app -n todo-app` |
| Check Pods | `kubectl get pods -n todo-app` |
| View Logs | `kubectl logs -f deployment/todo-app-backend -n todo-app` |
| Access App | `minikube tunnel` |
| Port Forward | `kubectl port-forward svc/todo-app-frontend 8080:80 -n todo-app` |
| Uninstall | `helm uninstall todo-app -n todo-app` |
| Stop Minikube | `minikube stop` |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Namespace: todo-app                    │ │
│  │                                                          │ │
│  │  ┌──────────────┐    ┌──────────────┐                   │ │
│  │  │   Ingress    │───▶│   Frontend   │                   │ │
│  │  │   (nginx)    │    │   (Vite)     │                   │ │
│  │  └──────────────┘    └──────────────┘                   │ │
│  │         │                                                │ │
│  │         │            ┌──────────────┐                   │ │
│  │         └───────────▶│   Backend    │                   │ │
│  │                      │  (Express)   │                   │ │
│  │                      └──────┬───────┘                   │ │
│  │                             │                            │ │
│  │                             ▼                            │ │
│  │                      ┌──────────────┐                   │ │
│  │                      │  PostgreSQL  │                   │ │
│  │                      │ (StatefulSet)│                   │ │
│  │                      └──────────────┘                   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Service Communication

- **Frontend → Backend**: Via Ingress path routing (`/api` -> backend:5006)
- **Backend → Postgres**: Internal service DNS `todo-app-postgres:5432`
- **External → App**: Via Ingress or `minikube tunnel`
