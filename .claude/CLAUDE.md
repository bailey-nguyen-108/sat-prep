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

**CRITICAL: Always read `DESIGN.md` before ANY Pencil design work or visual decisions.**

All font choices, colors, spacing, and aesthetic direction are defined in DESIGN.md. Do not deviate without explicit user approval.

**When designing in Pencil:**
1. MUST read DESIGN.md first to understand the design system
2. Use ONLY the colors, typography, and spacing defined in DESIGN.md
3. Follow the aesthetic direction: Bold Modern SaaS
4. Never hardcode values - reference the design system

**Key decisions from DESIGN.md:**
- Typography: Fraunces (display) + DM Sans (body)
- Colors: Bright Blue (#42A5F5) primary + Coral Red (#EF5350) accent
- Dark sidebar (#1A1A1A) with light content (#FFFFFF)
- Aesthetic: Bold Modern SaaS (confident, colorful data viz)
- Motion: Intentional animations (but NEVER on practice question screens)
- Spacing: 8px base unit
- Border radius: 4-24px scale

In QA mode, flag any code that doesn't match DESIGN.md.

## Design Update Workflow

**Bailey (the user) is the PM/Designer.** When Bailey updates Pencil designs and says:

**"Push design: [description]"** or **"Design update: [description]"**

Automatically execute this workflow:

1. Stay on `develop` branch (NO branch creation)
2. Stage `sat-prep-mobile.pen` and related files
3. Ask Bailey for rationale if significant change (for DESIGN.md decision log)
4. Commit with detailed message:
   ```
   Design: [description]

   Screen: [Screen ID from Pencil, e.g., 7WE8A - Login Screen]
   Changes: [What changed - colors, spacing, layout]
   Rationale: [Why - user feedback, accessibility, etc.]

   Impact on Huy:
   - [Specific files to update, e.g., app_colors.dart]
   - [Estimated effort, e.g., 5 minutes]
   ```
5. Push to `origin develop`
6. Confirm with commit hash

**No branches, no PRs for design updates.**

**Exception:** If Bailey says **"Branch design: [description]"**, then:
- Create `design/[slug]` branch
- Follow same commit process
- Create PR for discussion

This only happens when:
- Huy explicitly requests branching to avoid conflicts
- Major breaking redesign that needs discussion
- Experimental design Bailey might not keep
