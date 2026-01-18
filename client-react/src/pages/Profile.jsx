import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

export default function Profile() {
  const { user, token, logout } = useContext(AuthContext)
  const [profile, setProfile] = useState(user)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!profile && token) {
      setLoading(true)
      api.get('/auth/me')
        .then((res) => setProfile(res.data))
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [token])

  if (!token) return <div>Please log in to view your profile.</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">User Profile</h2>
      {loading && <p>Loading...</p>}
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name || profile.fullname || '—'}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || '—'}</p>
          <p><strong>Location:</strong> {profile.location || '—'}</p>
          <div className="mt-3">
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </div>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  )
}
