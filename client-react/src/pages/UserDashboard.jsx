import React, { useEffect, useState, useContext } from 'react'
import './userDashboard.css'
import api from '../api/api'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function UserDashboard() {
  const { user } = useContext(AuthContext)
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api
      .get('/pickups')
      .then((res) => setPickups(res.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load pickups'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="ud-page">
      <header className="ud-header">
        <div className="ud-container">
          <div className="logo">PETman</div>
          <nav className="ud-nav">
            <Link to="/">Home</Link>
            <Link to="/pickups">Pickups</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>

      <section className="ud-main">
        <div className="ud-container ud-grid">
          <aside className="ud-sidebar">
            <h3>Dashboard</h3>
            <ul>
              <li>Overview</li>
              <li>My Pickups</li>
              <li>Settings</li>
            </ul>
          </aside>

          <div className="ud-content">
            <h2>Welcome back{user ? `, ${user.name || user.email}` : ''}</h2>
            <p className="mb-4">Your recent pickups:</p>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && pickups.length === 0 && <p>No pickups yet. <Link to="/pickups/new">Schedule one</Link>.</p>}
            <ul>
              {pickups.map((p) => (
                <li key={p._id} className="p-3 border rounded mb-2">
                  <Link to={`/pickups/${p._id}`} className="font-semibold">{p._id}</Link>
                  <div>Types: {(p.types || []).join(', ')}</div>
                  <div>Quantity: {p.quantity}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
