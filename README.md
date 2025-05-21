# Infrastructure AI Assistant Web

A modern React-based web interface for the Infrastructure AI Assistant, providing real-time monitoring and troubleshooting for your IT infrastructure.

## Features

- Real-time chat interface with AI assistant
- Infrastructure health monitoring
- Server, database, and network status dashboards
- Responsive design for desktop and mobile

## Prerequisites

- Node.js 16+ and npm/yarn
- Azure Functions Core Tools (for local development)
- Azure account with OpenAI access (for backend)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your configuration:
   ```bash
   cp .env.example .env
   ```
4. Update the `REACT_APP_API_BASE_URL` in `.env` to point to your Azure Function

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Environment Variables

- `REACT_APP_API_BASE_URL`: Base URL for the Azure Function API
- `REACT_APP_DEBUG`: Set to 'true' to enable debug logging

## Deployment

This app can be deployed to any static hosting service (e.g., Azure Static Web Apps, Vercel, Netlify).

## Backend Integration

This frontend is designed to work with the `chatbot-assistant-function` Azure Function app. Ensure the backend is properly configured and running.
