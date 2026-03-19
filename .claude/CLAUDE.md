# gstack

Use the /browse skill from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.

Available skills:
- /office-hours
- /plan-ceo-review
- /plan-eng-review
- /plan-design-review
- /design-consultation
- /review
- /ship
- /browse
- /qa
- /qa-only
- /design-review
- /setup-browser-cookies
- /retro
- /debug
- /document-release

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.

All font choices, colors, spacing, and aesthetic direction are defined there. Do not deviate without explicit user approval.

**Key decisions:**
- Typography: Fraunces (display) + DM Sans (body)
- Colors: Blue primary (#2563EB) + Amber accent (#F59E0B)
- Aesthetic: Refined Utility (thoughtfully minimal with warmth)
- Motion: Intentional animations (but NEVER on practice question screens)

In QA mode, flag any code that doesn't match DESIGN.md.
