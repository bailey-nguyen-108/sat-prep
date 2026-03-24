# Handoff Brief

## Branch
- `codex/student-desktop-screens`

## Current Goal
- Continue aligning the Next.js student desktop flow with `sat-prep-webapp.pen`.
- Preserve `DESIGN.md` as the visual system and `.pen` as the layout/source-of-truth spec.

## What Is Done
- Supabase-backed student flow scaffold exists in the app.
- Desktop student screens exist in both code and Pencil:
  - `/login`
  - `/student/home`
  - `/student/practice/setup`
  - `/student/practice/session`
  - `/student/review/results`
- Recent design/parity commits:
  - `e9fce62` `Design: refine student desktop screen spec`
  - `5e9a39f` `style(design): FINDING-001 — align shared sidebar shell to pen`
  - `a75c20a` `style(design): FINDING-002 — align session and results structure to pen`

## Important Design Rules
- Read `DESIGN.md` before making visual changes.
- Treat `sat-prep-webapp.pen` like a Figma file:
  - layout
  - section order
  - content density
  - CTA placement
  - navigation structure
- Priority order:
  1. `.pen` fidelity
  2. `DESIGN.md` fidelity
  3. general polish

## Current Known Issues
- The design-review pass was only partially completed.
- High-impact fixes landed for:
  - shared sidebar shell
  - session/results structure
- `login`, `home`, and `practice setup` still need a fresh parity-focused review against the latest `.pen`.
- The local Next dev server can drift into a stale `.next` asset state, especially after `npm run build`.

## Local Dev Notes
- If the UI renders unstyled or "all black", reset dev cleanly:
  1. kill anything on port `3000`
  2. move `.next` out of the repo
  3. run `npm run dev`
- The app is usually reviewed at:
  - `http://localhost:3000/login`
  - `http://localhost:3000/student/home`
  - `http://localhost:3000/student/practice/setup`
  - `http://localhost:3000/student/practice/session`
  - `http://localhost:3000/student/review/results`

## Suggested Next Steps
1. Re-run a narrow `design-review` for `login`, `home`, and `practice setup` on a clean tree.
2. Capture fresh before/after screenshots after restarting dev cleanly.
3. Compare live screens directly against `sat-prep-webapp.pen`.
4. Keep one commit per design finding.
5. After parity is in good shape, run a final QA pass on the student flow.

## Files To Look At First
- `DESIGN.md`
- `sat-prep-webapp.pen`
- `src/app/login/page.tsx`
- `src/app/student/home/page.tsx`
- `src/app/student/practice/setup/page.tsx`
- `src/components/practice/PracticeSessionClient.tsx`
- `src/app/student/review/results/page.tsx`
- `src/components/layout/AppSidebar.tsx`
- `src/app/globals.css`
