# TaskTracker-fullstack (single-folder)

This is a full-stack Task Tracker with Smart Insights (SQLite backend + React frontend).
It is packaged as a single folder for easy running, GitHub push, and deployment to Render.

## Quickstart (VS Code)

1. Open the repo folder in VS Code.
2. Backend:
   - Open terminal, `cd backend`
   - Copy `.env.example` to `.env` and adjust if needed
   - `npm install`
   - `npm run migrate`
   - `npm run dev` (or `npm start`)
3. Frontend:
   - In a new terminal, `cd frontend`
   - `npm install`
   - `npm run dev`
4. Open the Vite URL (usually http://localhost:5173). Backend is http://localhost:3000

## Deploy to Render (recommended)
- Create a Render account.
- Create two services:
  1. **Web Service** for backend — connect to backend folder, start command `npm start`, set env var `DATABASE_FILE=./task_tracker.db` and run migrations on deploy (Render supports build/start scripts).
  2. **Static Site** for frontend — build command `npm run build`, publish `dist` (Vite output). Or host frontend as a web service and proxy to backend.

See full instructions in docs/render-deploy.md (optional).

