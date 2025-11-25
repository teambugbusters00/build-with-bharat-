import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Report from './pages/Report'
import ServiceProvider from './pages/ServiceProvider'
import ComplaintTracker from './pages/ComplaintTracker'
import Profile from './pages/Profile'
import Login from './components/auth/login'
import Register from './components/auth/register'
import PageBackground from './components/PageBackground'

const App = () => {
  return (
    <Router>
      <PageBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/service-provider" element={<ServiceProvider />} />
          <Route path="/complaint-tracker" element={<ComplaintTracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </PageBackground>
    </Router>
  )
}

export default App
