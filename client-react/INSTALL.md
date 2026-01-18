# Install and Run (client-react)

From the project root or directly inside `client-react` run:

CMD (Windows):

```cmd
cd /d D:\PETman\petmanweb\client-react
npm install
npm run dev
```

PowerShell:

```powershell
Set-Location D:\PETman\petmanweb\client-react
npm install
npm run dev
```

Useful scripts:

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run format` — run Prettier
- `npm run test` — run Vitest

Notes:

- If `npm install` fails in PowerShell due to execution policy, run from CMD or adjust PowerShell execution policy.
- The Express server runs from the repo root (`server.js`) and exposes the API at `/api`.
