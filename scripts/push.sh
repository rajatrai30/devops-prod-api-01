#!/bin/bash

# Docker Hub push script for DevOps Prod API App (Development Image)

echo "🚀 Pushing DevOps Prod API App image to Docker Hub"
echo "================================================="

# Variables
DOCKER_USERNAME="rajatrai30"
IMAGE_NAME="devops-prod-api-app"
TAG="latest"

FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME:$TAG"

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "📦 Building Docker image..."

# Build image using docker compose
docker compose -f docker-compose.dev.yml build app

if [ $? -ne 0 ]; then
    echo "❌ Docker image build failed!"
    exit 1
fi

echo "🏷️ Tagging image..."

# Tag the built image for Docker Hub
docker tag devops-prod-api-app-dev $FULL_IMAGE_NAME

if [ $? -ne 0 ]; then
    echo "❌ Failed to tag Docker image!"
    exit 1
fi

echo "🔐 Logging into Docker Hub..."
docker login

if [ $? -ne 0 ]; then
    echo "❌ Docker login failed!"
    exit 1
fi

echo "📤 Pushing image to Docker Hub..."
docker push $FULL_IMAGE_NAME

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Successfully pushed image!"
    echo "Image: $FULL_IMAGE_NAME"
else
    echo "❌ Failed to push image!"
    exit 1
fi