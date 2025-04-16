# 🛠️ Week 01 - Docker + Flask + Kubernetes + Ingress

This workshop demonstrates how to containerize two separate Flask applications and deploy them to Kubernetes using separate Deployments, Services, and a shared Ingress resource with NGINX.

---

## 📁 Project Structure

```
week01-docker-flask-k8s/
├── app1/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── app2/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── k8s/
│   ├── app1-deployment.yaml
│   ├── app1-service.yaml
│   ├── app2-deployment.yaml
│   ├── app2-service.yaml
│   ├── ingress.yaml
│   └── image-pull-secret-guide.md
```

---

## 🔧 Setup Instructions

### 1. Build and Push Docker Images

For each app:

```bash
# Navigate to the app folder
cd app1
docker build -t nexus.example.com:8082/my-repo/app1:latest .
docker push nexus.example.com:8082/my-repo/app1:latest

cd ../app2
docker build -t nexus.example.com:8082/my-repo/app2:latest .
docker push nexus.example.com:8082/my-repo/app2:latest
```

### 2. Create the Image Pull Secret in Kubernetes

```bash
kubectl create secret docker-registry nexus-registry-secret \
  --docker-server=nexus.example.com:8082 \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  --docker-email=you@example.com
```

---

### 3. Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/app1-deployment.yaml
kubectl apply -f k8s/app1-service.yaml
kubectl apply -f k8s/app2-deployment.yaml
kubectl apply -f k8s/app2-service.yaml
kubectl apply -f k8s/ingress.yaml
```

---

### 4. Access the Applications

Edit your `/etc/hosts` to point `flask.local` to your cluster IP (for local testing):

```
127.0.0.1 flask.local
```

Then open:

- `http://flask.local/` → app1
- `http://flask.local/about` → app2

---

## ✅ What You Learned

- Flask app structure and routing
- Dockerizing Python apps
- Kubernetes Deployments, Services, Ingress
- Using Nexus as a private image registry with `imagePullSecrets`
