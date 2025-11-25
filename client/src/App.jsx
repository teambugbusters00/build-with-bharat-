import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Report from './pages/Report'
import ServiceProvider from './pages/ServiceProvider'
import Profile from './pages/Profile'
import Login from './components/auth/login'
import Register from './components/auth/register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/service-provider" element={<ServiceProvider />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
