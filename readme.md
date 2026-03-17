# BlueConnect - Workforce Service Discovery & Marketplace

BlueConnect is a premium, two-sided marketplace platform connecting users with skilled blue-collar workers. It streamlines the process of discovering, hiring, and tracking services through a modern full-stack architecture.

## 🚀 Key Features

- **Marketplace Workflows**: Seamless job request creation, worker acceptance, and service tracking.
- **Worker Discovery**: Location-based filtering and profession-specific searches for finding the right expert.
- **Role-Based Access Control (RBAC)**: Distinct dashboards and permissions for Users (Hirers) and Workers.
- **Premium UI**: Vibrant, responsive design built with React and Tailwind CSS, featuring glassmorphism and smooth animations.
- **Secure Authentication**: JWT-based security for all API interactions.

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python), SQLModel, PostgreSQL
- **Frontend**: React.js, Tailwind CSS, Lucide icons
- **Database**: PostgreSQL (Relational schema for robust RBAC and job workflows)
- **API**: RESTful architecture with centralized service layer

## 📂 Project Structure

- `/backend_fastapi`: The core FastAPI application including models, routers, and database configuration.
- `/front-end`: The React-based frontend application with premium UI components.

## 🚦 Getting Started

### Backend Setup
1. Navigate to `/backend_fastapi`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Configure your `.env` with `DATABASE_URL`.
4. Start the server: `uvicorn main:app --reload`.

### Frontend Setup
1. Navigate to `/front-end`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.

## 📈 Impact
BlueConnect addresses the challenges of workforce discovery by providing a verified, secure platform for service exchange, improving flexibility for both hirers and professionals.
