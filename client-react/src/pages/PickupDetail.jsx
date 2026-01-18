import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function PickupDetail() {
  const { id } = useParams()
  const [pickup, setPickup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.get(`/pickups/${id}`)
      .then((res) => setPickup(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!pickup) return <div>Pickup not found.</div>

  return (
    <div style={{ maxWidth: 800, margin: '1rem auto' }}>
      <h1 className="text-2xl font-bold mb-2">Pickup {pickup._id || id}</h1>
      <p><strong>Types:</strong> {(pickup.types || []).join(', ')}</p>
      <p><strong>Quantity:</strong> {pickup.quantity}</p>
      <p><strong>Status:</strong> {pickup.status || '—'}</p>
      <div className="mt-3">
        <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded">Back</button>
      </div>
    </div>
  )
}
