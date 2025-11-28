import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Report from './pages/Report'
import ServiceProvider from './pages/ServiceProvider'
import ComplaintTracker from './pages/ComplaintTracker'
import CommunityUpdates from './pages/CommunityUpdates'
import Profile from './pages/Profile'
import Login from './components/auth/login'
import Register from './components/auth/register'
import PageBackground from './components/PageBackground'
import Footer from './components/Footer'
import Garden from './components/Garden'

const App = () => {
  return (
    <Router>
      <Garden />
      <PageBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/service-provider" element={<ServiceProvider />} />
          <Route path="/complaint-tracker" element={<ComplaintTracker />} />
          <Route path="/community-updates" element={<CommunityUpdates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </PageBackground>
      <Footer />
    </Router>
  )
}

export default App
