import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// initialize from localStorage if present
if (typeof window !== 'undefined') {
  const t = localStorage.getItem('token')
  if (t) setAuthToken(t)
}

export default api
