import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './dashboardLayout.css'

export default function DashboardLayout() {
  return (
    <div className="dl-page">
      <div className="dl-container">
        <aside className="dl-sidebar">
          <h3>Account</h3>
          <ul>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </aside>
        <section className="dl-main">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
