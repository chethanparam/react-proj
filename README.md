# Currency Converter

A React.js web application that allows users to convert between different currencies in real time.

Built with React + Vite and deployed to Azure Web App as a Docker container using Azure DevOps CI/CD pipelines.

## Features

- Convert between multiple currencies
- Real-time exchange rate fetching via API
- Clean and simple UI
- Fully containerized using Docker
- Automated CI/CD deployment via Azure DevOps

## Tech Stack

- React.js
- Vite
- Docker (multi-stage build with Nginx)
- Azure Container Registry (ACR)
- Azure Web App for Containers
- Azure DevOps Pipelines

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

### Run with Docker

```bash
docker build -t currency-converter .
docker run -p 80:80 currency-converter
```

Open http://localhost in your browser.

## CI/CD Pipeline

Every push to the `main` branch automatically triggers the Azure DevOps pipeline which:

1. Builds the Docker image
2. Pushes it to Azure Container Registry
3. Deploys it to Azure Web App as a container

## Project Structure

```
currency-converter/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── azure-pipelines.yml
└── package.json
```