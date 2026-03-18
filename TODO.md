# Weave Our Tapestry — CToDo(AI(ChatGPT)-Summarized Structure)

This file answers:
- What are we building?
- Why are we building it in this order?
- Who owns what?
- What “done” looks like?

Rules:
- Everyone works on their own branch.
- Keep tasks small. Commit often.
- Mark items as DONE only when they can be tested (Swagger or UI).

---

## Project Goal (What “success” looks like)

By March 20 (with buffer before):
- A user can search cultural stories, see results, click one, and read the full story.
- The system is stable enough to demo without “it works on my machine.”

---

## Why we run the backend server

The backend is a server program that listens for requests like:
- GET /api/stories
- GET /api/search?q=dragon

Without running the server (`uvicorn`), the frontend has nothing to talk to.
The database (Neon) stores data permanently, but the server is the “bridge”
that reads/writes to it and returns JSON to the frontend.

---

## Why we use an API

Frontend does NOT directly access the database.
Instead:
Frontend → API (FastAPI) → Database (Neon)

This keeps logic centralized (search, sorting, counting) and keeps DB credentials private.

---

## Timeline (with buffer)

- Sprint 1: Foundation (Feb 25 – Mar 1)
- Sprint 2: Search + Connect UI (Mar 2 – Mar 8)
- Sprint 3: Polish + Demo Freeze (Mar 9 – Mar 12)
- Buffer: Fixes + Styling + Deployment (Mar 13 – Mar 19)
- Submit: Mar 20

---

# Sprint 1 — Foundation (Goal: stable base)

## Dolphin (Backend + PO)
### D1 — Setup / stability docs
- [ done] Add run instructions (backend + frontend)
- [ done] Confirm `.env` is NOT committed
- [ done] Confirm repo structure is stable

Why:
If teammates can’t run the project easily, progress stalls.

Done when:
A teammate can run both servers from the README without help.

---

### D2 — Story Detail API (GET one story)
- [ done] Add endpoint: GET /api/stories/{id}
- [ ] Return 404 if not found
- [done ] Test in Swagger (/docs)

Why:
Frontend needs a story detail page (click result → see full story).

Done when:
- GET /api/stories/1 returns a story (if exists)
- GET /api/stories/99999 returns 404

---

### D3 — API Contract (agreement between frontend + backend)
- [ ] Create/update backend/docs/api_contract.md
- [ ] Define response fields for:
  - GET /api/stories
  - POST /api/stories
  - GET /api/stories/{id}
  - GET /api/search (placeholder for Sprint 2)

Why:
Prevents mismatch between what frontend expects vs backend returns.

Done when:
Paul confirms the contract matches the UI needs.

---

## Titus (Database)
### T1 — Add views counter to Story
- [done ] Add `views` field to Story (default 0)
- [done ] Verify it saves in Neon
- [done ] Verify it appears in GET /api/stories output

Why:
Enables “most viewed” sorting later and teaches DB updates.

Done when:
New stories show views=0 and persist after server restart.

---

## Derrick (Search)
### De1 — Simple Search (working version first)
- [done ] Add endpoint: GET /api/search?q=...
- [done ] Search by scanning title/text (slow but correct)
- [done ] Return: query, total, results[]

Why:
Working search early lets frontend integrate sooner (even before optimization).

Done when:
Searching “dragon” returns relevant stories and total count is correct.

---

## Paul (Frontend)
### P1 — UI layout (no real API yet)
- [ ] Build search page layout (search bar + results container)
- [ ] Build result card layout (title, culture, snippet)
- [ ] Build story detail page layout
- [ ] Use mock JSON (hardcoded)

Why:
Frontend can progress in parallel without waiting for backend search.

Done when:
Netlify shows the pages and navigation with mock data.

---

# Sprint 2 — Connect + Better Search (Goal: real end-to-end flow)

## Derrick
### De2 — Improve search output for UI
- [ ] Add snippet generation (short preview)
- [ ] Add basic scoring (simple number)
- [ ] Support multi-word query

Done when:
Frontend can display search results nicely.

---

## Titus
### T2 — Increment views
- [ ] Add endpoint to increment views when a story is opened
- [ ] Confirm DB updates

Done when:
Opening a story increases views by 1.

---

## Paul
### P2 — Connect UI to backend
- [ ] Replace mock data with real fetch calls
- [ ] Search calls /api/search
- [ ] Clicking a result calls /api/stories/{id}

Done when:
Search works on the real website locally.

---

# Sprint 3 — Polish + Demo Freeze (Goal: stable demo)

Everyone:
- [ ] Add sorting dropdown (relevance / newest / views)
- [ ] Add loading + error states
- [ ] Improve styling consistency
- [ ] Prepare a 2-minute demo script
- [ ] Deployment checks (frontend on Netlify, backend on Render later)

---

## Team Workflow Checklist (Daily)
- [ ] Pull latest main
- [ ] Work on your branch only
- [ ] Commit small changes with clear messages
- [ ] Push end of day
- [ ] Update this TODO checklist