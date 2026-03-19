# Design System — SAT Prep App

## Product Context
- **What this is:** SAT prep application with Flutter mobile app (iOS & Android) for students and React/Next.js web dashboard for teachers and admins
- **Who it's for:** High school students preparing for the SAT, their teachers, and school administrators
- **Space/industry:** Educational technology / Test prep (competing with Khan Academy SAT prep, Bluebook, Magoosh)
- **Project type:** Mobile app (student practice sessions) + web dashboard (admin/teacher management)

## Aesthetic Direction
- **Direction:** Refined Utility
- **Decoration level:** Intentional (subtle texture like light paper grain, gentle gradients for depth — never garish purple AI slop gradients)
- **Mood:** Premium study tool that respects both the seriousness of the SAT and the fact that teenagers are using it. Thoughtfully minimal with intentional moments of warmth. Feels credible but not boring, focused but not sterile.
- **Reference sites:**
  - [Khan Academy SAT Prep](https://www.khanacademy.org/digital-sat) — clean, minimal, slightly generic
  - [Bluebook](https://bluebook.collegeboard.org/) — official testing interface, very neutral
  - [Magoosh](https://apps.apple.com/us/app/sat-prep-practice-by-magoosh/id1126174656) — bright colors, intuitive layouts

## Typography
- **Display/Hero:** Fraunces (modern serif with optical sizing) — Gives a distinctive, slightly editorial voice that breaks from the sans-serif sea of test prep apps. Feels premium and literate without being stuffy. Use for hero headlines, section titles, and stat values.
- **Body:** DM Sans (geometric sans) — Excellent readability, warm feel, handles data beautifully with built-in tabular numbers. Use for all body text, UI labels, and buttons.
- **UI/Labels:** DM Sans (same as body for consistency)
- **Data/Tables:** DM Sans with `font-variant-numeric: tabular-nums` — Critical for dashboards and performance tables. Numbers align vertically for easy scanning.
- **Code:** JetBrains Mono — Use sparingly for code snippets in explanations (e.g., showing mathematical equations as code)
- **Loading:** Google Fonts CDN (https://fonts.google.com/specimen/Fraunces, https://fonts.google.com/specimen/DM+Sans)
- **Scale:**
  - `xs`: 12px / 0.75rem
  - `sm`: 14px / 0.875rem
  - `base`: 16px / 1rem
  - `lg`: 18px / 1.125rem
  - `xl`: 20px / 1.25rem
  - `2xl`: 24px / 1.5rem
  - `3xl`: 30px / 1.875rem
  - `4xl`: 36px / 2.25rem
  - `5xl`: 48px / 3rem
  - `6xl`: 60px / 3.75rem

## Color
- **Approach:** Restrained with personality — Color is rare and meaningful. Blue + amber breaks from the cold teal/green palette dominating ed-tech.
- **Primary:** `#2563EB` — Confident, serious blue (not corporate cobalt, not playful sky). Use for CTAs, links, primary actions, focus states.
- **Accent:** `#F59E0B` — Warm amber for progress indicators, achievements, streaks, upgrade prompts. Psychologically energizing without being aggressive. This is your differentiator — the warmth that breaks from the cold ed-tech palette.
- **Neutrals:**
  - Warm grays (cream-tinted, never pure white/black)
  - Lightest: `#FAFAF9` (bg-base)
  - Surface: `#FFFFFF` (cards, modals)
  - Border: `#E4E4E7`
  - Text primary: `#18181B`
  - Text secondary: `#52525B`
  - Text tertiary: `#A1A1AA`
  - Darkest: `#18181B`
- **Semantic:**
  - Success: `#10B981` (emerald green for correct answers, achievements)
  - Warning: `#F59E0B` (reuse accent amber for paywall warnings, session limits)
  - Error: `#EF4444` (red for incorrect answers, validation errors)
  - Info: `#3B82F6` (lighter blue for informational messages)
- **Dark mode strategy:**
  - Redesign surfaces (don't just invert colors)
  - Navy-black backgrounds: `#0F172A` (base), `#1E293B` (surface)
  - Reduce saturation 15% on primary/accent colors: Primary → `#3B82F6`, Accent → `#FBBF24`
  - Lighten text: `#F8FAFC` (primary), `#CBD5E1` (secondary), `#64748B` (tertiary)
  - Border: `#334155`

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable (not cramped like Bluebook's testing interface, not spacious like marketing landing pages)
- **Scale:**
  - `2xs`: 2px
  - `xs`: 4px
  - `sm`: 8px (base unit)
  - `md`: 16px (2× base)
  - `lg`: 24px (3× base)
  - `xl`: 32px (4× base)
  - `2xl`: 48px (6× base)
  - `3xl`: 64px (8× base)
  - `4xl`: 96px (12× base)

## Layout
- **Approach:** Hybrid
  - Grid-disciplined for app screens (practice sessions, dashboards, data tables need predictability)
  - Creative-editorial for marketing pages (asymmetric hero sections, pull quotes for testimonials, overlapping elements for visual interest)
- **Grid:**
  - Mobile: 4 columns, 16px gutters
  - Tablet: 8 columns, 24px gutters
  - Desktop: 12 columns, 32px gutters
- **Max content width:** 1200px (comfortable reading line length, scannable data tables)
- **Border radius scale:**
  - `sm`: 4px (small UI elements like badges, tags)
  - `md`: 8px (buttons, inputs, alerts)
  - `lg`: 12px (cards, modals, panels)
  - `xl`: 16px (hero sections, large containers)
  - `2xl`: 24px (marketing page sections)
  - `full`: 9999px (pills, avatar shapes)

## Motion
- **Approach:** Intentional — Subtle entrance animations, meaningful state transitions, scroll-driven reveals on marketing pages. Motion makes the app feel alive without being distracting. Critical: NO animations on practice question screens (focus must be preserved during actual test practice).
- **Easing:**
  - Enter: `ease-out` (cubic-bezier(0, 0, 0.2, 1)) — Elements arrive with confidence
  - Exit: `ease-in` (cubic-bezier(0.4, 0, 1, 1)) — Elements leave quickly
  - Move: `ease-in-out` (cubic-bezier(0.4, 0, 0.2, 1)) — Smooth position changes
- **Duration:**
  - Micro: 50-100ms (hover states, focus rings)
  - Short: 150-200ms (buttons, dropdowns, tooltips)
  - Medium: 250-300ms (modals, side panels, cards entering)
  - Long: 400-500ms (page transitions, scroll-driven reveals)
- **Animation types:**
  - Fade-up: Fade in + translate Y(-8px) — Use for card entrances, stat reveals
  - Scale-fade: Scale(0.95 → 1) + fade — Use for modals, tooltips
  - Slide: Translate X or Y — Use for side panels, notifications
  - Progress: Width or height animation — Use for progress bars, streaks
  - Bounce (subtle): Scale(1 → 1.05 → 1) — Use for success checkmarks, achievement unlocks

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-19 | Initial design system created | Created by /design-consultation based on research of Khan Academy, Bluebook, Magoosh, and 2025 SAT prep landscape |
| 2026-03-19 | Chose Fraunces + DM Sans over all-sans typography | Differentiates from competitors (all use sans-serif). Fraunces gives editorial sophistication, DM Sans handles data/UI beautifully. |
| 2026-03-19 | Chose amber accent over teal/green | Breaks from ed-tech visual conventions (everyone uses cool colors). Amber = warmth + motivation, psychologically energizing. |
| 2026-03-19 | Intentional motion (not minimal) | Students expect polished apps (TikTok, Notion). Static feels dated. BUT: no animations on practice question screens to preserve focus. |
| 2026-03-19 | Polish design + add bottom navigation | Redesigned Question Screen with better progress visualization (gradient bar, clearer title). Redesigned Results Screen with celebration-style score card (trophy icon, white text on blue). Added bottom tab navigation to Home Dashboard for easier app navigation. (Bailey) |

---

## Implementation Notes

### Flutter (Mobile App)
- Use `google_fonts` package for Fraunces and DM Sans
- Define color constants in `lib/core/constants/app_colors.dart`
- Define text styles in `lib/core/constants/app_text_styles.dart`
- Use `Provider` or `Riverpod` for theme state (light/dark mode toggle)
- Disable animations during practice sessions (check current route)

### Next.js (Web Dashboard)
- Load fonts from Google Fonts CDN in `app/layout.tsx`
- Define CSS custom properties in `styles/globals.css`
- Use Tailwind CSS config to map design tokens to utility classes
- Implement dark mode with `next-themes` package
- Use `framer-motion` for intentional animations on marketing pages

### Shared Design Tokens (for both platforms)
Create a shared JSON file with all tokens (colors, spacing, typography scales) that both Flutter and Next.js import. This ensures perfect consistency.

---

## Safe Choices (Category Baseline)
These decisions match what users expect in test prep apps:
1. **Blue as primary color** — Signals trust and credibility. Parents and students expect this in ed-tech.
2. **Clean, minimal layouts** — Test prep apps must feel distraction-free during practice sessions.
3. **Grid-based dashboards** — Teachers and admins expect data to be scannable and organized.

## Risks (Where This Product Gets Its Own Face)
These decisions intentionally break from category conventions:
1. **Fraunces for display typography** — Every competitor uses sans-serif everywhere. A modern serif gives a distinctive, slightly editorial voice. Risk: Might feel too "literary" for some users. Gain: Instant visual differentiation + premium feel. Cost: Test readability on small screens.
2. **Amber accent instead of teal/green** — The whole ed-tech space uses cool colors. Amber is warm, energizing, psychologically associated with achievement. Risk: Less "safe" than green. Gain: Breaks the visual mold, feels more human. Cost: Ensure it doesn't clash with success states (green).
3. **Intentional motion** — Most test prep apps are static. Subtle animations make the app feel modern and alive. Risk: Could distract during focused practice. Gain: Engagement, polish, modern feel. Cost: Must be VERY restrained during practice sessions (no animations on question screens).

---

## When to Deviate
This design system is the baseline. Deviate when:
- **User research reveals a problem** — If students find Fraunces hard to read on small screens, consider switching hero font to DM Sans Bold.
- **A/B testing shows better conversion** — If a different CTA color converts better than blue, test and adopt.
- **Platform conventions conflict** — iOS/Android have strong design opinions. Follow platform conventions for native controls (e.g., iOS back button, Android bottom navigation).

Otherwise, stay consistent. A coherent system beats individually "optimal" but mismatched choices.
