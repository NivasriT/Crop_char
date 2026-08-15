import React from 'react'
import 'leaflet/dist/leaflet.css';
import './index.css';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IntroSplash from './components/IntroSplash.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroSplash><Login /></IntroSplash>} />
        <Route path="/login" element={<IntroSplash><Login /></IntroSplash>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard/:category" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)


