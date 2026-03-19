# Changelog

All notable changes to the SAT Prep App project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- (No changes yet)

### Changed
- (No changes yet)

### Fixed
- (No changes yet)

---

## [0.1.0] - 2026-03-19

### Added
- Initial project setup and repository structure
- Complete design system specification (DESIGN.md)
  - Typography: Fraunces (display) + DM Sans (body)
  - Colors: Primary Blue (#2563EB) + Accent Amber (#F59E0B)
  - Spacing, layout, and motion guidelines
- Comprehensive architectural documentation (docs/ARCHITECTURE.md)
  - Tech stack: Flutter, React/Next.js, Firebase, OpenAI, Stripe
  - Complete data models with Firestore security rules
  - Cloud Functions API design
  - Mobile app and web dashboard structures
  - Security architecture and threat model
  - Performance optimization strategies
  - Deployment and testing plans
- Mobile app UI designs (sat-prep-mobile.pen)
  - 8 complete screens: Login, Home, Session Setup, Question, Results, Paywall, Subscription, Profile
  - Component library with reusable UI elements
- Web dashboard designs (sat-prep.pen)
- Developer onboarding documentation (README.md)
- Collaborative workflow documentation (WORKFLOW.md)
- GitHub repository setup (private)

### Design Decisions
- Chose "Refined Utility" aesthetic: thoughtfully minimal with warmth
- Selected Fraunces serif for display to differentiate from competitors (all use sans-serif)
- Selected Amber accent (#F59E0B) to break from ed-tech's cool color palette
- Intentional motion strategy: animations everywhere EXCEPT practice question screens

### Technical Decisions
- Flutter for mobile (single codebase, excellent Firebase integration)
- React + Next.js for web dashboard (industry standard, full-stack capabilities)
- Firebase as BaaS (faster development, auto-scaling, no infrastructure management)
- OpenAI GPT-4 for AI explanations (best quality for educational content)
- Stripe for payments (industry standard, excellent mobile SDK)
- Freemium model: 5 free sessions, then $9.99/month subscription

---

## Update Instructions

Update this file every Friday during weekly sync. Format:

```markdown
## [Unreleased]

### Added (Week of YYYY-MM-DD)
- Feature name (Developer name)
- Another feature (Developer name)

### Changed
- What changed and why (Developer name)

### Fixed
- Bug description (Developer name)
```

When releasing to production, move `[Unreleased]` section to a new version:

```markdown
## [0.2.0] - YYYY-MM-DD

(Move unreleased items here)
```
