import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { AuthResponse } from '../types/auth'
import '../styles/auth.css'

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    setLoading(true)
    try {
      const data: AuthResponse = await api.post('/auth/register', { name, email, password })
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">noBinge 𖧧</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign up</h2>

          {error && <p className="auth-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=" ****** "
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}