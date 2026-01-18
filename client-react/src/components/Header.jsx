import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './header.css'

export default function Header() {
  const { user, token, logout } = useContext(AuthContext)

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="brand">
          <Link to="/">
            <img src="/assets/petmanlogo.png" alt="PETman" className="w-10 h-10 inline-block align-middle" />
            <span style={{ marginLeft: 8 }}>PETman</span>
          </Link>
        </div>
        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/pickups">Pickups</Link>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
