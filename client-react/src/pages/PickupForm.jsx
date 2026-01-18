import React, { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function PickupForm() {
  const [wastes, setWastes] = useState({ plastic: false, glass: false, metal: false, paper: false })
  const [quantity, setQuantity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function toggle(key) {
    setWastes((s) => ({ ...s, [key]: !s[key] }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const selected = Object.keys(wastes).filter((k) => wastes[k])
    if (selected.length === 0) return setError('Select at least one waste type')
    if (!quantity) return setError('Select estimated quantity')
    setLoading(true)
    try {
      const res = await api.post('/pickups', { types: selected, quantity })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create pickup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '1rem auto' }}>
      <h1 className="text-2xl font-bold mb-4">Schedule a Pickup</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="p-3 border rounded cursor-pointer">
            <input type="checkbox" checked={wastes.plastic} onChange={() => toggle('plastic')} /> Plastic
          </label>
          <label className="p-3 border rounded cursor-pointer">
            <input type="checkbox" checked={wastes.glass} onChange={() => toggle('glass')} /> Glass
          </label>
          <label className="p-3 border rounded cursor-pointer">
            <input type="checkbox" checked={wastes.metal} onChange={() => toggle('metal')} /> Metal
          </label>
          <label className="p-3 border rounded cursor-pointer">
            <input type="checkbox" checked={wastes.paper} onChange={() => toggle('paper')} /> Paper
          </label>
        </div>
        <div>
          <label>Estimated Quantity (kg)</label>
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option value="">Select quantity</option>
            <option value="1-2">1-2</option>
            <option value="3-5">3-5</option>
            <option value="6-10">6-10</option>
            <option value="10+">10+</option>
          </select>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading ? 'Scheduling...' : 'Continue'}</button>
      </form>
    </div>
  )
}
