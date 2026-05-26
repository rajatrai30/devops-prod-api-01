set -e

NAME="devops-prod-api-app"
USERNAME="rajatrai30"
IMAGE=$USERNAME/$NAME:latest

echo "Building docker images..."
docker build -t $IMAGE .

echo "Pushing image to docker hub..."
docker push $IMAGE

echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "Getting pods..."
kubectl get pods

echo "Getting services..."
kubectl get services

echo "Fetching the main service..."
kubectl get services $NAME-service