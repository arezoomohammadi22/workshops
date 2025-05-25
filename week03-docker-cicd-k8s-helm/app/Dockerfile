FROM docker.arvancloud.ir/python:3.10-slim
WORKDIR /app
RUN pip install flask
COPY app/ .
EXPOSE 5000
CMD ["python", "/app/app.py"]
