import React, { createContext, useEffect, useState } from 'react'
import api, { setAuthToken } from '../api/api'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      setAuthToken(token)
      // try to fetch current user (if endpoint exists)
      api.get('/auth/me').then((res) => setUser(res.data)).catch(() => setUser(null))
    } else {
      setAuthToken(null)
      setUser(null)
    }
  }, [token])

  function login(newToken, userData) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    if (userData) setUser(userData)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
