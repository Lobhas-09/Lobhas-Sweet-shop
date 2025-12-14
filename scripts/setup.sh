#!/bin/bash

# This script sets up the Sweet Shop Management System environment.

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to install backend dependencies
install_backend() {
  echo "Installing backend dependencies..."
  cd backend
  npm install
  echo "Backend dependencies installed."
}

# Function to install frontend dependencies
install_frontend() {
  echo "Installing frontend dependencies..."
  cd ../frontend
  npm install
  echo "Frontend dependencies installed."
}

# Function to set up environment variables
setup_env() {
  echo "Setting up environment variables..."
  cp .env.example .env
  echo "Environment variables set up."
}

# Main script execution
install_backend
install_frontend
setup_env

echo "Setup complete! You can now run the application."