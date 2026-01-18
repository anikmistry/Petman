import React, { useContext, useState } from 'react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.token || res.data.accessToken
      const user = res.data.user || null
      if (token) {
        login(token, user)
        navigate(from, { replace: true })
      } else {
        setError('Login failed: no token returned')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
