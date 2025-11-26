import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n"
import { AuthProvider } from "./contexts/authContext/index.jsx";
import { LocationProvider } from "./contexts/LocationContext.jsx";
import { ThemeProvider } from './contexts/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LocationProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LocationProvider>
    </AuthProvider>
  </StrictMode >,
)
