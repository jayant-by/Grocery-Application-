# Deployment Guide

## Prerequisites

- Docker and Docker Compose
- AWS/GCP account (for cloud deployment)
- Domain name (optional)
- SSL certificate (for production)

---

## Local Development Deployment

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cartora
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Update MongoDB credentials, JWT secrets, etc.
```

### 3. Install Dependencies

```bash
# Run the setup script
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

### 4. Start Services

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 5. Initialize Database

```bash
# Seed sample data
cd scripts
node seed-data.js
```

### 6. Create Django Superuser

```bash
docker-compose exec backend-django python manage.py createsuperuser
```

### 7. Access Applications

- **Frontend**: http://localhost:3000
- **Node.js API**: http://localhost:5000
- **Django Admin**: http://localhost:8000/admin
- **Nginx Proxy**: http://localhost:80

---

## Production Deployment (AWS)

### Architecture Overview

```
Internet → ALB → ECS Services (Frontend, Backend, etc.) → RDS/DocumentDB
                                                        → ElastiCache (Redis)
```

### 1. AWS Setup

#### Create VPC and Networking

```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create subnets (public and private)
aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.1.0/24
aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.2.0/24
```

#### Set Up DocumentDB (MongoDB)

```bash
aws docdb create-db-cluster \
  --db-cluster-identifier cartora-cluster \
  --engine docdb \
  --master-username admin \
  --master-user-password <secure-password>
```

#### Set Up ElastiCache (Redis)

```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id cartora-redis \
  --engine redis \
  --cache-node-type cache.t3.micro \
  --num-cache-nodes 1
```

### 2. Build and Push Docker Images

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build images
docker-compose -f docker-compose.prod.yml build

# Tag images
docker tag cartora-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-frontend:latest
docker tag cartora-backend-node:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-backend-node:latest
docker tag cartora-backend-django:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-backend-django:latest

# Push images
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-backend-node:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-backend-django:latest
```

### 3. ECS Setup

#### Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name cartora-cluster
```

#### Create Task Definitions

Create task definitions for each service (frontend, backend-node, backend-django, celery).

Example task definition JSON:

```json
{
  "family": "cartora-backend-node",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "backend-node",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/cartora-backend-node:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        { "name": "NODE_ENV", "value": "production" }
      ]
    }
  ]
}
```

#### Create Services

```bash
aws ecs create-service \
  --cluster cartora-cluster \
  --service-name backend-node \
  --task-definition cartora-backend-node \
  --desired-count 2 \
  --launch-type FARGATE
```

### 4. Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name cartora-alb \
  --subnets <subnet-1> <subnet-2> \
  --security-groups <sg-id>

# Create target groups for each service
aws elbv2 create-target-group \
  --name cartora-frontend-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id <vpc-id> \
  --target-type ip

# Create listeners and rules
aws elbv2 create-listener \
  --load-balancer-arn <alb-arn> \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=<tg-arn>
```

### 5. SSL/TLS Setup

```bash
# Request certificate from ACM
aws acm request-certificate \
  --domain-name cartora.com \
  --validation-method DNS

# Add HTTPS listener
aws elbv2 create-listener \
  --load-balancer-arn <alb-arn> \
  --protocol HTTPS \
  --port 443 \
  --certificates CertificateArn=<cert-arn> \
  --default-actions Type=forward,TargetGroupArn=<tg-arn>
```

### 6. Environment Variables

Store secrets in AWS Systems Manager Parameter Store or Secrets Manager:

```bash
aws ssm put-parameter \
  --name /cartora/production/jwt-secret \
  --value <your-jwt-secret> \
  --type SecureString
```

Update task definitions to reference these parameters.

---

## Production Deployment (GCP)

### 1. GCP Setup

```bash
# Set project
gcloud config set project <project-id>

# Enable required APIs
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com
gcloud services enable cloudrun.googleapis.com
```

### 2. Cloud Run Deployment

```bash
# Build and deploy frontend
gcloud builds submit --tag gcr.io/<project-id>/cartora-frontend ./frontend
gcloud run deploy frontend \
  --image gcr.io/<project-id>/cartora-frontend \
  --platform managed \
  --region us-central1

# Deploy backend services similarly
```

### 3. MongoDB Atlas

Use MongoDB Atlas for managed database:

```bash
# Update connection string in environment variables
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cartora
```

---

## Monitoring and Logging

### CloudWatch (AWS)

```bash
# View logs
aws logs tail /ecs/cartora-backend-node --follow

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu \
  --metric-name CPUUtilization \
  --threshold 80
```

### Health Checks

All services expose `/health` endpoints:
- Frontend: `http://frontend:3000/health`
- Backend Node: `http://backend-node:5000/health`
- Django: `http://backend-django:8000/admin/login/`

---

## Scaling

### Auto-scaling (AWS ECS)

```bash
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/cartora-cluster/backend-node \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 10
```

### Horizontal Pod Autoscaling (Kubernetes)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-node-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-node
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## Backup and Recovery

### Database Backups

```bash
# MongoDB backup
mongodump --uri="mongodb://username:password@host/cartora" --out=/backup

# Automated backups with AWS
aws docdb create-db-cluster-snapshot \
  --db-cluster-identifier cartora-cluster \
  --db-cluster-snapshot-identifier cartora-backup-$(date +%Y%m%d)
```

---

## Rollback Strategy

```bash
# ECS rollback
aws ecs update-service \
  --cluster cartora-cluster \
  --service backend-node \
  --task-definition cartora-backend-node:previous-version

# Cloud Run rollback
gcloud run services update-traffic frontend \
  --to-revisions=LATEST=0,previous-revision=100
```

---

## Security Checklist

- [ ] All secrets stored in secure vaults
- [ ] HTTPS enabled for all endpoints
- [ ] Security groups properly configured
- [ ] Database access restricted to backend services only
- [ ] Regular security updates applied
- [ ] WAF rules configured
- [ ] DDoS protection enabled
- [ ] Audit logging enabled
