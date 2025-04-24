# 🛠️ Week 02 - CI/CD with GitLab and Kubernetes

This workshop covers how to automate Docker image builds and Kubernetes deployments using GitLab CI/CD.

---

## 📦 Project Structure

```
week02-gitlab-cicd-k8s/
├── app/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── .gitlab-ci.yml
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── README.md
```

---

## 🎯 Objectives

By the end of this workshop, you'll be able to:
- Write GitLab CI/CD pipelines
- Build and push Docker images to a registry (e.g., Nexus)
- Use imagePullSecrets in Kubernetes
- Automatically deploy your app to Kubernetes from GitLab

---

## 🚀 Step-by-Step Guide

### 1. Clone the Project

```bash
git clone https://gitlab.com/your-namespace/your-project.git
cd your-project
```

---

### 2. Prepare the App

Inside `app/` is a simple Flask application with one route (`/`).

### 3. Build & Push Docker Image (Handled by GitLab CI/CD)

GitLab will:
- Build the image
- Push to your Nexus or GitLab registry
- Deploy to K8s using kubectl

---

### 4. Configure GitLab CI/CD Variables

Go to your GitLab Project → **Settings → CI/CD → Variables**

| Variable Name       | Value                        | Protected | Masked |
|---------------------|------------------------------|-----------|--------|
| `NEXUS_USER`        | your-nexus-username          | ✅        | ✅     |
| `NEXUS_PASSWORD`    | your-nexus-password/token    | ✅        | ✅     |
| `REGISTRY_URL`      | nexus.example.com:8082       | ✅        |        |
| `IMAGE_NAME`        | nexus.example.com/app/week2  | ✅        |        |

---

### 5. GitLab CI/CD Pipeline File: `.gitlab-ci.yml`

```yaml
stages:
  - build
  - deploy

variables:
  IMAGE_NAME: $IMAGE_NAME

build:
  stage: build
  script:
    - docker build -t $IMAGE_NAME:$CI_COMMIT_SHORT_SHA .
    - echo $NEXUS_PASSWORD | docker login -u $NEXUS_USER --password-stdin $REGISTRY_URL
    - docker push $IMAGE_NAME:$CI_COMMIT_SHORT_SHA
  only:
    - main

deploy:
  stage: deploy
  script:
    - kubectl apply -f k8s/
  only:
    - main
```

---

### 6. Kubernetes Manifests

All YAMLs are in the `k8s/` folder:
- `deployment.yaml`
- `service.yaml`
- `ingress.yaml`

Ensure your cluster has a secret called `nexus-registry-secret`.

---

### 7. Register a GitLab Runner (if not using shared runners)

On your GitLab server or VM:

```bash
sudo gitlab-runner register
```

When prompted, answer:

```
URL: https://gitlab.com/
Token: <your project/group runner token>
Description: docker-runner
Executor: docker
Docker image: docker:latest
```

> ⚠️ Make sure Docker is installed and Docker socket is mounted if needed.

---

## 🌐 Accessing Your App

Make sure your Ingress controller is working, and add this to `/etc/hosts`:

```
127.0.0.1 week2.lab.sananetco.com
```

Then open `http://week2.lab.sananetco.com/`

---

## 🧠 Summary

✅ You now have an automated CI/CD pipeline from code to Kubernetes!  
Push code → GitLab builds → image pushed → app deployed 🚀
