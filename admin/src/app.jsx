import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import Reservations from './components/Reservations'
import Calendar from './components/Calendar'
import Statistics from './components/Statistics'
import SideBar from './components/SideBar'
import './styles/index.css'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const handleLogout = () => {
    setToken(null)
  }

  return (
    <Router basename="/admin">
      {!token ? (
        <Routes>
          <Route path="*" element={<LoginForm onLoginSuccess={setToken} />} />
        </Routes>
      ) : (
        <div style={{ display: 'flex' }}>
          <SideBar onLogout={handleLogout} />
          <div style={{width: '100%'}}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard token={token} onLogout={handleLogout} />} />
              <Route path="/reservations" element={<Reservations token={token} onLogout={handleLogout} />} />
              <Route path="/stats" element={<Statistics token={token} onLogout={handleLogout} />} />
              <Route path="/calendar" element={<Calendar token={token} onLogout={handleLogout} />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  )
}
