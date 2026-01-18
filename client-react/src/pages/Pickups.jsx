import React from 'react'
import './pickups.css'

export default function Pickups() {
  return (
    <div className="pk-page">
      <div className="pk-container">
        <h1>Pickup — Waste Details</h1>
        <p className="pk-sub">Tell us what you want to recycle</p>

        <div className="pk-grid">
          <div className="pk-col">
            <label className="pk-card">
              <input type="checkbox" />
              <div>
                <h5>Plastic</h5>
                <p>15TK/kg - 5 points/item</p>
              </div>
            </label>
            <label className="pk-card">
              <input type="checkbox" />
              <div>
                <h5>Glass</h5>
                <p>10TK/kg - 3 points/item</p>
              </div>
            </label>
          </div>

          <div className="pk-col">
            <label className="pk-card">
              <input type="checkbox" />
              <div>
                <h5>Metal</h5>
                <p>20TK/kg - 8 points/item</p>
              </div>
            </label>
            <label className="pk-card">
              <input type="checkbox" />
              <div>
                <h5>Paper</h5>
                <p>5TK/kg - 2 points/item</p>
              </div>
            </label>
          </div>
        </div>

        <div className="pk-select">
          <label>Estimated Quantity (kg)</label>
          <select defaultValue="" className="pk-select-input">
            <option value="" disabled>
              Select quantity in kg
            </option>
            <option>1-2</option>
            <option>3-5</option>
            <option>6-10</option>
            <option>10+</option>
          </select>
        </div>

        <button className="pk-cta">Continue</button>
      </div>
    </div>
  )
}
