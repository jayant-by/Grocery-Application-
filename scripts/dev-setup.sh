#!/bin/bash

# Cartora Development Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Cartora development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend-node dependencies
echo "📦 Installing backend-node dependencies..."
cd backend-node
npm install
cd ..

# Install backend-django dependencies (optional for local dev)
# Uncomment if you want to run Django locally without Docker
# echo "📦 Installing backend-django dependencies..."
# cd backend-django
# python -m venv venv
# source venv/bin/activate  # On Windows: venv\Scripts\activate
# pip install -r requirements.txt
# cd ..

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env file with your configuration"
echo "  2. Run 'docker-compose up' to start all services"
echo "  3. Access the application at:"
echo "     - Frontend: http://localhost:3000"
echo "     - Node.js API: http://localhost:5000"
echo "     - Django Admin: http://localhost:8000/admin"
echo "     - Nginx Proxy: http://localhost:80"
echo ""
