#!/usr/bin/env bash
set -e

echo "=== Building Frontend ==="
cd frontend
# Clean out any corrupted modules
rm -rf node_modules
# Install dependencies cleanly
npm install
# Use npx to ensure Vite executes with proper permissions
npx vite build
cd ..

echo "=== Installing Backend Dependencies ==="
cd backend
pip install -r requirements.txt
