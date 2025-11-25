import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Report from './pages/Report'
import ServiceProvider from './pages/ServiceProvider'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/service-provider" element={<ServiceProvider />} />
      </Routes>
    </Router>
  )
}

export default App
