# Image
FROM python:3.8-slim-buster

# Work directory
WORKDIR /backend

# Environment variables
ENV FLASK_APP=core.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_PORT=5002

# Requirements & Installations
RUN pip install --upgrade pip
RUN pip install -U setuptools
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Run
#CMD ["flask", "run"]
CMD ["gunicorn", "--bind", "0.0.0.0:5002", "core:app"]