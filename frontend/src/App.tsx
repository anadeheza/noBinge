import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { JSX } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CalendarPage from './pages/CalendarPage'  

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user, isLoading } = useAuth()
  if (isLoading) return null

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />  {/* ← agregá esto */}
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}