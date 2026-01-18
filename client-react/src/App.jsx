import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import Pickups from './pages/Pickups'
import PickupForm from './pages/PickupForm'
import PickupDetail from './pages/PickupDetail'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth'
import Header from './components/Header'
import DashboardLayout from './components/DashboardLayout'

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pickups" element={<Pickups />} />
          <Route path="/pickups/new" element={<RequireAuth><PickupForm /></RequireAuth>} />
          <Route path="/pickups/:id" element={<PickupDetail />} />

          <Route path="/dashboard" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<div>Settings (coming soon)</div>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
