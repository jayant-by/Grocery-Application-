# Cartora

A modern full-stack e-commerce platform built with microservices architecture.

## 🏗️ Architecture

```
cartora/
├── frontend/        # React + Vite + Tailwind CSS
├── backend-node/    # Node.js + Express + MongoDB (Core APIs)
├── backend-django/  # Django + MongoDB (Admin, Reporting, Background Jobs)
├── nginx/           # Nginx reverse proxy
├── scripts/         # DevOps and automation scripts
└── docs/            # Documentation
```

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Core API**: Node.js + Express
- **Admin & Jobs**: Python + Django
- **Database**: MongoDB
- **Cache/Queue**: Redis
- **Task Queue**: Celery

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Cloud**: AWS / GCP (single region)

## 📋 Prerequisites

- Docker Desktop (latest)
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- Git

## 🛠️ Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd cartora
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start all services with Docker
```bash
docker-compose up -d
```

### 4. Access the applications
- **Frontend**: http://localhost:3000
- **Node.js API**: http://localhost:5000
- **Django Admin**: http://localhost:8000/admin
- **Nginx Proxy**: http://localhost:80

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Node.js Development
```bash
cd backend-node
npm install
npm run dev
```

### Backend Django Development
```bash
cd backend-django
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend Node.js tests
cd backend-node && npm test

# Backend Django tests
cd backend-django && python manage.py test
```

## 📦 Building for Production

```bash
# Build all services
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
