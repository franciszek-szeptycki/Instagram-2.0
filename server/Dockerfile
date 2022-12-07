# Image
FROM python:3.8-slim-buster

# Work directory
WORKDIR /backend

# Environment variables
ENV FLASK_APP=core.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_PORT=5004

# Requirements & Installations
RUN apt-get update
RUN apt-get install python3-dev default-libmysqlclient-dev gcc  -y
RUN pip install --upgrade pip
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Run
#CMD ["flask", "run"]
CMD ["gunicorn", "--bind", "0.0.0.0:5004", "core:app"]