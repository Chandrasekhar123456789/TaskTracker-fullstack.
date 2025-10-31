# notes.md

## Design choices
- SQLite (better-sqlite3) for simplicity and portability.
- React + Vite frontend for fast dev and easy deployment.
- Responsive, eco-friendly color palette and lightweight animations in CSS.

## How insights work
- Server aggregates counts by priority/status and computes due-soon and busiest upcoming day.
- Summary is a simple rule-based readable string.

## Improvements
- Add pagination, JWT auth, and charts for timeline visualization.
- Add unit tests and CI for reliability.
