# PETman React Route Map

Public routes

- `/` — Home / Landing page (from `client/index.html`)
- `/login` — Login page (auth)
- `/register` — Register page (auth)
- `/shop` — Shop / static pages (if present)

Pickups

- `/pickups` — List of pickups (calls `GET /api/pickups`)
- `/pickups/new` — Create pickup form (POST `/api/pickups`)
- `/pickups/:id` — Pickup detail / edit (GET/PUT/DELETE `/api/pickups/:id`)

User areas (Protected)

- `/dashboard` — `UserDashboard` (protected; requires auth token)
- `/profile` — User profile / settings (protected)

API endpoints (backend)

- `POST /api/auth/register` — create user
- `POST /api/auth/login` — authenticate user, return token
- `GET /api/pickups` — list pickups
- `POST /api/pickups` — create pickup (auth)
- `GET /api/pickups/:id` — pickup detail
- `PUT /api/pickups/:id` — update pickup (auth)
- `DELETE /api/pickups/:id` — delete pickup (auth)

Auth strategy

- Use JWT stored in `localStorage` (or `httpOnly` cookie if server supports it).
- Provide `AuthContext` to expose `user`, `token`, `login()`, `logout()`.
- Implement `RequireAuth` route wrapper to redirect to `/login` when unauthenticated.

Notes

- Start by migrating `userDashboard` and `pickups` list to validate API integration.
- Serve React dev server on different port and configure CORS on Express (already enabled).
- For production, build React and serve static files from Express `dist`/`build` folder.
