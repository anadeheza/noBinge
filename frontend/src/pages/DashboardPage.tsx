import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>𖧧 Welcome, {user?.name}</h1>
      <p>Your safe place to recover in peace</p>
      <button onClick={logout} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Log out
      </button>
      <Link to="/calendar">Your diary</Link>

    </div>
    
  )
}