# PETman React Client (scaffold)

This folder contains a Vite + React scaffold for migrating the existing PETman front-end.

Quick start

1. From `client-react` install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
npm run preview
```

Next steps

- Migrate pages from `client/src/*` into `client-react/src/pages`.
- Implement auth context and protected routes.
- Wire API calls to Express routes (server runs at root `server.js`).
