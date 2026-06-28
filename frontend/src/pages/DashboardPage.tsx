import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import MusicPlayer from './MusicPage'
import '../styles/main.css'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [isMusicOpen, setIsMusicOpen] = useState(false)

  return (
    <div className='dashboard-wrapper'>
      <header className='dash-header'>
        <div className='brand'>
          <h1 className='dash-title'>𖧧 Welcome, {user?.name}</h1>
          <p className='dash-subtitle'>Your safe place to recover in peace</p>
        </div>
        <button className='logout-btn' onClick={logout}>
          Log out
        </button>
      </header>

      <main className="widget-grid">
        <Link to="/calendar" className="widget-card" aria-label="Your Diary">
          <img src="/images/diary.png" alt="" className="widget-icon" />
        </Link>

        <Link to="/meditation" className="widget-card" aria-label="Guided Meditation">
          <img src="/images/meditation.png" alt="" className="widget-icon" />
        </Link>

        <button className="widget-card" onClick={() => setIsMusicOpen(true)} aria-label="Cozy Music">
          <img src="/images/music.png" alt="" className="widget-icon" />
        </button>

        <Link to="/meals" className="widget-card" aria-label="Meal Tracker">
          <img src="/images/food.png" alt="" className="widget-icon" />
        </Link>
      </main>

      <div className={`music-drawer-overlay ${isMusicOpen ? 'open' : ''}`} onClick={() => setIsMusicOpen(false)} />
      
      <div className={`music-drawer ${isMusicOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>🎵</h3>
          <button className="close-drawer-btn" onClick={() => setIsMusicOpen(false)}>×</button>
        </div>
        <div className="drawer-content">
          <MusicPlayer />
        </div>
      </div>

      <footer>
        <div className="footer content">⚠︎ This website does not mean to replace medical advice, if you're struggling with mental health or an eating disorder, accept the help from the people that love you and contact a health center, stay safe ♡</div>
        
      </footer>
    </div>
  )
}