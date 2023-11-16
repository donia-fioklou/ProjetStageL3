# Use the official Python 3.10 image as the base image
FROM python:3.10

# Set environment variables to ensure Python runs in unbuffered mode and doesn't write bytecode
ENV PYTHONBUFFER=1
ENV PYTHONDONTWRITEBYTECODE=1

# Update package index and install necessary dependencies for PostgreSQL and Python
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

# Create a directory named 'app' in the container and set it as the working directory
RUN mkdir /app
WORKDIR /app

# Copy the entire current directory into the container's 'app' directory
COPY . app

# Create a virtual environment named 'venv' in the container
RUN python -m venv /venv

# Add the virtual environment's 'bin' directory to the PATH
ENV PATH="venv/bin/:$PATH"

# Copy the entrypoint script into the 'app' directory
COPY entrypoint.sh /app/entrypoint.sh

# Upgrade pip to the latest version
RUN python -m pip install --upgrade pip

# Copy the requirements.txt file into the 'app' directory
COPY requirements.txt /app/

# Install the Python dependencies listed in the requirements.txt file
RUN pip install -r requirements.txt
