# PETman Website (Local Preview)

Simple static marketing site for PETman (green-themed). Tailwind is included via CDN in `index.html`.

## Quick preview (Windows cmd)

Open a terminal and run:

```cmd
cd /d d:\PETman\petmanweb
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Alternative (Node):

```cmd
cd /d d:\PETman\petmanweb
npx serve .
```

## Files

- `index.html` — main site (hero, services, pricing, contact)
- `app.js` — navigation toggle, smooth scroll, contact form UX

## Notes

- Tailwind is loaded from CDN for quick iteration. For production, consider installing Tailwind and building CSS for performance.
- To deploy: upload the folder to any static hosting (Netlify, Vercel, GitHub Pages). For Netlify, drag & drop the folder or connect your Git repo.

## Next steps you might want me to do

- Wire the contact form to Firebase/your backend to persist requests.
- Convert to a Vite/React app or add a build step for Tailwind.
- Add images and SEO meta tags per page.

