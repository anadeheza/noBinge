import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/meditation.css'

export default function MeditationPage() {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale')
  const [secondsLeft, setSecondsLeft] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1

        if (phase === 'Inhale') {
          setPhase('Hold')
          return 4
        } else if (phase === 'Hold') {
          setPhase('Exhale')
          return 4
        } else {
          setPhase('Inhale')
          return 4
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [phase])

  const getCircleClass = () => {
    if (phase === 'Inhale') return 'breathing-circle inhale'
    if (phase === 'Hold') return 'breathing-circle hold'
    return 'breathing-circle exhale'
  }

  return (
    <div className="mp">
      <h1 className="mp-title">Breathing Space 𖧧</h1>
      <Link to="/dashboard" className="home-btn" aria-label="Home">
        🏠︎
      </Link>
      
      <div className="mp-layout" style={{ maxWidth: '500px', marginTop: '40px' }}>
        <div className="mp-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', borderRadius: '24px' }}>
          
          <div className="breathing-container">
            <div className={getCircleClass()}>
              <div className="breathing-text">{phase}</div>
              <div className="breathing-timer">{secondsLeft}</div>
            </div>
          </div>

          <p style={{ color: '#5d4037', fontStyle: 'italic', marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
            Clear your mind and breath mindfully.
          </p>

        </div>
      </div>
    </div>
  )
}