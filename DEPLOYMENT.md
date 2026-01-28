# Phase 4: Docker & Kubernetes (Minikube) Deployment Guide

This guide provides step-by-step instructions for deploying the Todo Application to a local Kubernetes cluster using Minikube.

## Prerequisites

Ensure you have the following installed:
- Docker Desktop (or Docker Engine)
- Minikube
- kubectl
- Node.js 20+ (for local development)

### Verify Installation

```bash
# Check Docker
docker --version

# Check Minikube
minikube version

# Check kubectl
kubectl version --client
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
# Run this in PowerShell
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

**Note:** You must run this command in every new terminal session, or add it to your shell profile.

---

## 3. Build Docker Images

Build the images directly into Minikube's Docker daemon:

```bash
# Navigate to project root
cd C:\Users\Lenovo\Desktop\TODO_APP_PHASE4

# Build Backend Image
docker build -t todo-backend:latest -f backend/Dockerfile ./backend

# Build Frontend Image
docker build -t todo-frontend:latest -f frontend/Dockerfile ./frontend

# Build AI Agent Image (optional - for autonomous suggestions)
docker build -t todo-ai-agent:latest -f ai-agent/Dockerfile ./ai-agent

# Verify images are built
docker images | grep todo
```

Expected output:
```
todo-backend     latest    xxxxx   Just now   xxx MB
todo-frontend    latest    xxxxx   Just now   xxx MB
todo-ai-agent    latest    xxxxx   Just now   xxx MB
```

---

## 4. Create Kubernetes Namespace and Secrets

```bash
# Create namespace
kubectl create namespace todo-app

# Create secrets (replace with your actual values)
kubectl create secret generic todo-secrets \
  --namespace=todo-app \
  --from-literal=DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public" \
  --from-literal=AUTH_SECRET="your-auth-secret-key-min-32-chars" \
  --from-literal=OPENAI_API_KEY="sk-your-openai-api-key"

# Verify secret was created
kubectl get secrets -n todo-app
```

---

## 5. Deploy to Kubernetes

### Option A: Using Kustomize (Recommended)

```bash
# Deploy using development overlay
kubectl apply -k k8s/overlays/development

# Or deploy using production overlay
kubectl apply -k k8s/overlays/production
```

### Option B: Apply Base Manifests Individually

```bash
# Apply namespace first
kubectl apply -f k8s/base/namespace.yaml

# Apply ConfigMap
kubectl apply -f k8s/base/configmap.yaml

# Apply Backend
kubectl apply -f k8s/base/backend/deployment.yaml
kubectl apply -f k8s/base/backend/service.yaml

# Apply Frontend
kubectl apply -f k8s/base/frontend/deployment.yaml
kubectl apply -f k8s/base/frontend/service.yaml

# Apply AI Agent (optional)
kubectl apply -f k8s/base/ai-agent/deployment.yaml
kubectl apply -f k8s/base/ai-agent/service.yaml

# Apply Ingress
kubectl apply -f k8s/base/ingress.yaml
```

---

## 6. Verify Deployment

### Check Pod Status

```bash
# Watch pods until they're all Running
kubectl get pods -n todo-app -w

# Expected output (wait until STATUS is Running):
# NAME                         READY   STATUS    RESTARTS   AGE
# backend-xxxxxxxxxx-xxxxx     1/1     Running   0          1m
# frontend-xxxxxxxxxx-xxxxx    1/1     Running   0          1m
# ai-agent-xxxxxxxxxx-xxxxx    1/1     Running   0          1m
```

### Check Services

```bash
kubectl get services -n todo-app

# Expected output:
# NAME       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
# backend    ClusterIP   10.96.xxx.xxx    <none>        4000/TCP   1m
# frontend   NodePort    10.96.xxx.xxx    <none>        3000:3xxxx/TCP   1m
```

### Check Deployments

```bash
kubectl get deployments -n todo-app

# Expected output:
# NAME       READY   UP-TO-DATE   AVAILABLE   AGE
# backend    2/2     2            2           2m
# frontend   2/2     2            2           2m
```

### View Pod Logs

```bash
# Backend logs
kubectl logs -f deployment/backend -n todo-app

# Frontend logs
kubectl logs -f deployment/frontend -n todo-app
```

---

## 7. Access the Application

### Option A: Using Minikube Tunnel (Recommended for Ingress)

```bash
# In a separate terminal, run:
minikube tunnel

# Then access the app via:
# http://localhost (frontend)
# http://localhost/api (backend API)
```

### Option B: Using NodePort

```bash
# Get the NodePort URL
minikube service frontend -n todo-app --url

# This will output something like:
# http://192.168.49.2:31234
```

### Option C: Port Forwarding

```bash
# Forward frontend port
kubectl port-forward service/frontend 3000:3000 -n todo-app

# In another terminal, forward backend port (for direct API access)
kubectl port-forward service/backend 4000:4000 -n todo-app

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
```

---

## 8. Verify Services Are Working

### Test Backend Health Endpoint

```bash
# Using kubectl exec
kubectl exec -it deployment/backend -n todo-app -- wget -qO- http://localhost:4000/health

# Or using port-forward
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "todo-backend",
  "timestamp": "2026-01-25T..."
}
```

### Test Readiness Endpoint

```bash
kubectl exec -it deployment/backend -n todo-app -- wget -qO- http://localhost:4000/ready
```

---

## 9. Scaling and Management

### Scale Deployments

```bash
# Scale backend to 3 replicas
kubectl scale deployment/backend --replicas=3 -n todo-app

# Scale frontend to 3 replicas
kubectl scale deployment/frontend --replicas=3 -n todo-app

# Verify scaling
kubectl get pods -n todo-app
```

### View Horizontal Pod Autoscaler

```bash
kubectl get hpa -n todo-app
```

### View Resource Usage

```bash
# Requires metrics-server addon
kubectl top pods -n todo-app
kubectl top nodes
```

---

## 10. Cleanup

### Delete All Resources

```bash
# Delete using Kustomize
kubectl delete -k k8s/overlays/development

# Or delete namespace (deletes everything in it)
kubectl delete namespace todo-app
```

### Stop Minikube

```bash
minikube stop
```

### Delete Minikube Cluster (complete reset)

```bash
minikube delete
```

---

## Troubleshooting

### Pods Not Starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n todo-app

# Check pod logs
kubectl logs <pod-name> -n todo-app --previous
```

### Image Pull Errors

If you see `ImagePullBackOff`:
1. Ensure you ran `eval $(minikube docker-env)` before building
2. Verify `imagePullPolicy: IfNotPresent` in deployments
3. Check image exists: `docker images | grep todo`

### Database Connection Issues

```bash
# Check if secret is configured correctly
kubectl get secret todo-secrets -n todo-app -o yaml

# Verify DATABASE_URL format
kubectl exec -it deployment/backend -n todo-app -- printenv DATABASE_URL
```

### Service Not Accessible

```bash
# Check service endpoints
kubectl get endpoints -n todo-app

# Check ingress status
kubectl describe ingress -n todo-app
```

---

## Quick Reference Commands

| Action | Command |
|--------|---------|
| Start Minikube | `minikube start --cpus=4 --memory=8192` |
| Configure Docker | `eval $(minikube docker-env)` |
| Build Backend | `docker build -t todo-backend:latest -f backend/Dockerfile ./backend` |
| Build Frontend | `docker build -t todo-frontend:latest -f frontend/Dockerfile ./frontend` |
| Deploy All | `kubectl apply -k k8s/overlays/development` |
| Check Pods | `kubectl get pods -n todo-app` |
| View Logs | `kubectl logs -f deployment/backend -n todo-app` |
| Access App | `minikube service frontend -n todo-app --url` |
| Port Forward | `kubectl port-forward service/frontend 3000:3000 -n todo-app` |
| Scale | `kubectl scale deployment/backend --replicas=3 -n todo-app` |
| Delete All | `kubectl delete -k k8s/overlays/development` |
| Stop Minikube | `minikube stop` |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Namespace: todo-app                    │ │
│  │                                                          │ │
│  │  ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │ │
│  │  │   Ingress    │───▶│   Frontend   │    │  AI Agent  │ │ │
│  │  │   (nginx)    │    │   (React)    │    │  (cron)    │ │ │
│  │  └──────────────┘    └──────┬───────┘    └─────┬──────┘ │ │
│  │         │                   │                   │        │ │
│  │         │                   ▼                   │        │ │
│  │         │           ┌──────────────┐            │        │ │
│  │         └──────────▶│   Backend    │◀───────────┘        │ │
│  │                     │  (Express)   │                     │ │
│  │                     └──────┬───────┘                     │ │
│  │                            │                              │ │
│  │                            ▼                              │ │
│  │                     ┌──────────────┐                     │ │
│  │                     │  PostgreSQL  │                     │ │
│  │                     │   (Neon)     │                     │ │
│  │                     └──────────────┘                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Service Communication

- **Frontend → Backend**: Uses Kubernetes service name `http://backend:4000`
- **AI Agent → Backend**: Uses Kubernetes service name `http://backend:4000`
- **External → Frontend**: Via Ingress or NodePort
- **External → Backend API**: Via Ingress path `/api` or direct port-forward
