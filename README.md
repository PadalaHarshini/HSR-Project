# NEET UG Community

This repository contains two independently deployable services:

| Service | Folder | Deploy as |
| --- | --- | --- |
| Student interface | `Frontend` | Static Vite site |
| API | `Backend` | Node.js web service |

## Frontend deployment (Vercel, Netlify, or Cloudflare Pages)

Set the deployment **root directory** to `Frontend`.

- Build command: `npm run build`
- Publish/output directory: `dist`
- Node version: 18 or newer (20 is recommended)

Do not use the repository root as the frontend publish directory: the generated `dist` folder lives inside `Frontend`.

## Backend deployment (Render, Railway, or similar)

Set the deployment **root directory** to `Backend`.

- Build command: `npm install`
- Start command: `npm start`
- Required environment variable: `MONGODB_URI`

Copy the format in `Backend/.env.example` and add the real hosted MongoDB URI in the provider’s environment-variable settings. Never commit the real URI into `.env`.

After deployment, visit `/api/health` on the API URL. A successful response includes `"ok": true` and the database connection state.
