# Gaon Connect BFB

A full-stack web application for community issue reporting and service provider management in rural areas.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture Diagrams](#architecture-diagrams)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

Gaon Connect BFB is designed to bridge the gap between rural communities and essential services by providing a platform for reporting issues, tracking complaints, and connecting with local service providers.

## Features

- **Issue Reporting**: Report community issues with location tracking
- **Complaint Tracking**: Monitor status of reported issues with live updates
- **Service Provider Directory**: Find and register local service providers
- **Multi-language Support**: Support for English, Hindi, Marathi, Rajasthani, and Telugu
- **Dark/Light Theme**: User preference-based theming
- **Real-time Location**: GPS-based location services
- **Responsive Design**: Mobile-first responsive UI

## Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling framework
- **React Router** - Client-side routing
- **React i18next** - Internationalization
- **Leaflet** - Interactive maps
- **Firebase Auth** - Authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### DevOps
- **Netlify** - Frontend deployment
- **PM2** - Process management (optional)

## Project Structure

```
gaon-connect-bfb/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── _redirects               # Netlify redirects
│   │   ├── bg.avif                  # Background image
│   │   ├── bg/                      # Background images directory
│   │   └── vite.svg                 # Vite logo
│   ├── src/                         # Source code
│   │   ├── components/              # Reusable UI components
│   │   │   ├── auth/                # Authentication components
│   │   │   │   ├── login/           # Login form
│   │   │   │   └── register/        # Registration form
│   │   │   ├── LanguageSwitcher.jsx # Language selection
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── PageBackground.jsx   # Page wrapper with background
│   │   ├── contexts/                # React contexts for state management
│   │   │   ├── authContext/         # Authentication context
│   │   │   ├── LocationContext.jsx  # Location/GPS context
│   │   │   └── ThemeContext.jsx     # Theme (dark/light) context
│   │   ├── firebase/                # Firebase configuration
│   │   │   ├── auth.js              # Authentication utilities
│   │   │   └── firebase.js          # Firebase app config
│   │   ├── i18n/                    # Internationalization files
│   │   │   ├── en.js                # English translations
│   │   │   ├── hi.js                # Hindi translations
│   │   │   ├── ma.js                # Marathi translations
│   │   │   ├── ra.js                # Rajasthani translations
│   │   │   ├── te.js                # Telugu translations
│   │   │   └── index.js             # i18n configuration
│   │   ├── pages/                   # Page components
│   │   │   ├── ComplaintTracker.jsx # Complaint tracking page
│   │   │   ├── Home.jsx             # Home page
│   │   │   ├── Profile.jsx          # User profile page
│   │   │   ├── Report.jsx           # Issue reporting page
│   │   │   └── ServiceProvider.jsx  # Service provider directory
│   │   ├── App.css                 # Global styles
│   │   ├── App.jsx                 # Main App component
│   │   ├── index.css               # CSS variables and imports
│   │   ├── main.jsx                # Application entry point
│   │   └── assets/                 # Static assets (images, icons)
│   ├── .env                        # Environment variables
│   ├── .gitignore                  # Git ignore rules
│   ├── eslint.config.js            # ESLint configuration
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies and scripts
│   ├── README.md                   # Client README
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── vite.config.js              # Vite configuration
├── server/                         # Backend Node.js application
│   ├── models/                     # Mongoose models
│   │   ├── Report.js               # Report schema
│   │   └── ServiceProvider.js      # Service provider schema
│   ├── routes/                     # API routes
│   │   ├── reportRoutes.js         # Report-related endpoints
│   │   └── serviceProviderRoutes.js # Service provider endpoints
│   ├── .env                        # Server environment variables
│   ├── .gitignore                  # Server git ignore
│   ├── package.json                # Server dependencies
│   ├── server.js                   # Express server entry point
│   └── README.md                   # Server README
├── .gitignore                      # Root git ignore
├── netlify.toml                    # Netlify deployment config
└── README.md                       # This file
```

## Architecture Diagrams

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │   Express API   │    │    MongoDB      │
│   (Vite)        │◄──►│   (Node.js)     │◄──►│   Database      │
│                 │    │                 │    │                 │
│ - Components    │    │ - Routes        │    │ - Reports       │
│ - Contexts      │    │ - Middleware    │    │ - Providers     │
│ - Pages         │    │ - Controllers   │    │ - Users         │
│ - Firebase Auth │    │ - Models        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   External APIs │
                    │                 │
                    │ - Nominatim     │
                    │   (Geocoding)   │
                    └─────────────────┘
```

### Data Flow Diagram

```
User Interaction → React Component → Context/API Call → Express Route
                                                            │
                                                            ▼
                                                     Database Operation
                                                            │
                                                            ▼
                                                     Response → Context Update → UI Update
```

### Component Hierarchy

```
App
├── AuthProvider
│   └── LocationProvider
│       └── ThemeProvider
│           └── Router
│               └── PageBackground
│                   ├── Navbar
│                   │   ├── LanguageSwitcher
│                   │   └── Theme Toggle
│                   └── Routes
│                       ├── Home
│                       ├── Report
│                       ├── ServiceProvider
│                       ├── ComplaintTracker
│                       └── Profile
```

### Database Schema

```
Reports Collection
├── _id: ObjectId
├── reportId: String (unique)
├── name: String
├── location: String
├── coords: { lat: Number, lon: Number }
├── phone: String (optional)
├── issue: String
├── description: String
├── status: String (enum)
├── createdAt: Date
└── updatedAt: Date

ServiceProviders Collection
├── _id: ObjectId
├── name: String
├── phone: String (optional)
├── service: String
├── profession: String
├── experience: String
├── location: String
├── coords: { lat: Number, lon: Number }
├── files: [String] (file URLs)
├── createdAt: Date
└── updatedAt: Date
```

### API Endpoints

```
POST   /api/report          # Create new report
GET    /api/report/:id      # Get report by ID
GET    /api/report          # Get all reports (with filters)

POST   /api/providers       # Register service provider
GET    /api/providers       # Get all providers (with location filter)
GET    /api/providers/:id   # Get provider by ID
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Firebase project (for authentication)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gaon-connect-bfb
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   # Create .env file with MongoDB URI
   echo "REPORT_MONGODB_URI=mongodb://localhost:27017/gaonconnect" > .env
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   # Create .env file with Firebase config
   cp .env.example .env
   # Edit .env with your Firebase credentials
   npm run dev
   ```

## Usage

1. Start the backend server: `cd server && npm start`
2. Start the frontend: `cd client && npm run dev`
3. Open http://localhost:5173 in your browser

### Environment Variables

#### Client (.env)
```
VITE_FIREBASE_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

#### Server (.env)
```
REPORT_MONGODB_URI=mongodb://localhost:27017/gaonconnect
PORT=5000
```

## API Documentation

### Reports API

#### Create Report
```http
POST /api/report
Content-Type: application/json

{
  "name": "John Doe",
  "location": "Main Street",
  "coords": { "lat": 28.6139, "lon": 77.2090 },
  "phone": "+91-9876543210",
  "issue": "accident",
  "description": "Car accident at intersection"
}
```

#### Get Reports
```http
GET /api/report?status=pending&limit=10
```

### Service Providers API

#### Register Provider
```http
POST /api/providers
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "phone": "+91-9876543210",
  "service": "plumber",
  "profession": "Plumber",
  "experience": "5 years",
  "location": "Downtown",
  "coords": { "lat": 28.6139, "lon": 77.2090 }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines
- Follow ESLint configuration
- Use meaningful commit messages
- Test API endpoints with Postman/Insomnia
- Ensure responsive design on mobile devices
- Maintain i18n translations for new text

## License

This project is licensed under the ISC License.
