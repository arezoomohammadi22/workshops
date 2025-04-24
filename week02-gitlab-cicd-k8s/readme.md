# 🛠️ Week 02 - CI/CD with GitLab and Kubernetes (Final Improved Version)

This version of the project includes:
- ✅ A `test` stage using `unittest`
- ✅ Docker image tagging best practices (`latest` + commit SHA)
- ✅ Readiness and liveness probes for Kubernetes
- ✅ GitLab CI/CD pipeline with test → build → deploy flow

---

## 📦 Project Structure

```
week02-gitlab-cicd-k8s-improved/
├── app/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── tests/
│   └── test_app.py
├── .gitlab-ci.yml
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── README.md
```

---

## 🚀 CI/CD Pipeline (.gitlab-ci.yml)

### Stages:
- `test`: Run Python unit tests with `unittest`
- `build`: Build and push Docker image with two tags
  - `:latest`
  - `:$CI_COMMIT_SHORT_SHA`
- `deploy`: Deploy to Kubernetes using kubectl

---

## 🔧 Configure GitLab CI/CD Variables

Go to your project on GitLab:  
**Settings → CI/CD → Variables** and define these:

| Variable Name     | Example Value                        | Masked | Protected |
|------------------|--------------------------------------|--------|-----------|
| `NEXUS_USER`     | your-nexus-username                  | ✅     | ✅        |
| `NEXUS_PASSWORD` | your-nexus-password/token            | ✅     | ✅        |
| `REGISTRY_URL`   | nexus.example.com:8082               | ❌     | ✅        |
| `IMAGE_NAME`     | nexus.example.com/app/week2-app      | ❌     | ✅        |

---

## 🔬 Testing Stage

Using Python’s built-in `unittest`:

```bash
python -m unittest discover tests
```

Tests:
- Status code 200 on GET `/`
- Expected message returned

---

## 🐳 Docker Image Tagging

```bash
docker build -t myimage:$CI_COMMIT_SHORT_SHA -t myimage:latest .
```
Both `:latest` and the short SHA tag are pushed to the registry.

---

## ☸️ Kubernetes Configuration

Includes:
- **Readiness Probe**
- **Liveness Probe**
- Image from registry with dynamic tag
- Ingress configured for custom domain

---

## 🤖 GitLab Runner Registration (if needed)

```bash
sudo gitlab-runner register
```

When prompted:
```
URL: https://gitlab.com/
Token: <your token>
Description: docker-runner
Executor: docker
Docker image: docker:latest
```

---

## 🌍 Accessing the Application

Add this line to `/etc/hosts` for local testing:

```
127.0.0.1 week2.lab.sananetco.com
```

Then open:

```
http://week2.lab.sananetco.com
```

---

## ✅ Summary

You've built a real-world, automated CI/CD pipeline:
- From GitLab commit to image build
- From image to Kubernetes deployment
- With built-in testing and probes for reliability

