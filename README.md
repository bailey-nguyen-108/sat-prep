# SAT Prep App

A comprehensive mobile SAT prep application (iOS & Android) with a web-based admin dashboard for teachers and administrators.

## Project Overview

This repository contains the complete design specifications, architectural documentation, and UI designs for a mobile SAT prep application built with:

- **Mobile App**: Flutter (iOS & Android)
- **Web Dashboard**: React + TypeScript with Next.js 14
- **Backend**: Firebase (Firestore, Cloud Functions, Auth)
- **AI Provider**: OpenAI GPT-4 for answer explanations
- **Payments**: Stripe ($9.99/month subscription)

## Repository Contents

### 📐 Design System
- **`DESIGN.md`** - Complete design system specification
  - Typography: Fraunces (display) + DM Sans (body)
  - Colors: Primary Blue (#2563EB) + Accent Amber (#F59E0B)
  - Spacing, layout, motion guidelines
  - Implementation notes for Flutter and Next.js

### 🎨 UI Designs (Pencil.dev)
- **`sat-prep-mobile.pen`** - Complete mobile app UI designs (8 screens)
  - Login Screen
  - Home Dashboard
  - Session Setup
  - Question Screen
  - Session Results
  - Paywall Screen
  - Subscription Plans
  - Profile Screen
  - Component Library (buttons, inputs, cards, etc.)

- **`sat-prep.pen`** - Web dashboard designs (admin/teacher portal)

### 📋 Documentation
- **`docs/ARCHITECTURE.md`** - Complete architectural plan including:
  - Tech stack decisions and rationale
  - Data models (Firestore collections)
  - API design (Cloud Functions)
  - Security architecture (Firestore rules, threat model)
  - Mobile app structure and flows
  - Web dashboard structure and flows
  - Error handling strategies
  - Performance optimization
  - Deployment strategy
  - Cost estimation
  - Testing strategy

### 🖼️ Assets
- **`images/`** - Design assets and screenshots

### ⚙️ Configuration
- **`.claude/CLAUDE.md`** - AI assistant instructions for consistent development
- **`.claude/skills/`** - gstack development workflow tools

## Getting Started for Mobile Developer

### Prerequisites
1. Install Flutter SDK (3.27.1 or later)
2. Install Xcode (for iOS development)
3. Install Android Studio (for Android development)
4. Set up Firebase project
5. Configure Stripe account

### Implementation Steps

#### Phase 1: Project Setup
1. Create Flutter project:
   ```bash
   flutter create --org com.satprep --project-name sat_prep mobile_app
   cd mobile_app
   ```

2. Add dependencies to `pubspec.yaml`:
   ```yaml
   dependencies:
     firebase_core: ^2.24.0
     firebase_auth: ^4.15.0
     cloud_firestore: ^4.13.0
     cloud_functions: ^4.5.0
     provider: ^6.1.1
     flutter_stripe: ^10.0.0
     google_fonts: ^6.1.0
     connectivity_plus: ^5.0.2
     shared_preferences: ^2.2.2
   ```

3. Configure Firebase:
   - Create Firebase project in console
   - Add iOS app (Bundle ID: `com.satprep.satPrep`)
   - Add Android app (Package: `com.satprep.sat_prep`)
   - Download `GoogleService-Info.plist` (iOS) and `google-services.json` (Android)
   - Run `flutterfire configure`

#### Phase 2: Core Implementation
Follow the project structure defined in `docs/ARCHITECTURE.md`:

1. **Create core constants** (colors, text styles, spacing from DESIGN.md)
   - `lib/core/constants/app_colors.dart`
   - `lib/core/constants/app_text_styles.dart`

2. **Implement app theme** based on DESIGN.md specifications

3. **Set up Firebase services**
   - Auth service
   - Firestore service
   - Cloud Functions service
   - Stripe service

4. **Create data models**
   - User, Question, Session, Subscription models

5. **Build shared widgets**
   - Custom buttons, text fields, loading overlays
   - Match designs in `sat-prep-mobile.pen`

6. **Implement authentication flow**
   - Login screen
   - Register screen
   - Auth provider with Firebase Auth

7. **Implement practice session flow**
   - Session setup (subject/difficulty selection)
   - Question display (Bluebook-style MCQ)
   - Session results with AI explanations
   - Follow-up adaptive questions

8. **Implement subscription flow**
   - Paywall screen (after 5 free sessions)
   - Subscription plans screen
   - Stripe payment integration

#### Phase 3: Backend Setup
Follow `docs/ARCHITECTURE.md` Section: "API Design (Cloud Functions)"

1. Set up Cloud Functions project
2. Implement required functions:
   - `generateAIExplanation`
   - `selectAdaptiveQuestions`
   - `validateSubscriptionAccess`
   - `stripeWebhook`
   - `generateQuestionWithAI`
   - `trackSessionActivity`

3. Deploy Firestore security rules (see ARCHITECTURE.md)

#### Phase 4: Testing & Deployment
1. Run unit tests, widget tests, integration tests
2. Test on iOS Simulator and Android Emulator
3. Deploy to TestFlight (iOS) and Internal Testing (Android)
4. Deploy Cloud Functions to Firebase
5. Configure Stripe webhooks

## Key Features

### Student Features (Mobile App)
- ✅ Email/password authentication
- ✅ Practice sessions with subject/difficulty selection
- ✅ Bluebook-style multiple-choice questions
- ✅ Immediate scoring and AI-generated explanations
- ✅ Adaptive learning (targets weak sub-topics)
- ✅ Freemium model (5 free sessions, then paywall)
- ✅ Stripe subscription ($9.99/month)
- ✅ Profile management

### Admin/Teacher Features (Web Dashboard)
- ✅ Question bank CRUD with sub-topic tagging
- ✅ AI question generation queue
- ✅ Student performance tracking
- ✅ Digital attendance (last login, session completion)
- ✅ Class management (teachers scoped to assigned classes)
- ✅ Performance charts and analytics

## Design Principles

From `DESIGN.md`:

- **Aesthetic**: Refined Utility - thoughtfully minimal with warmth
- **Typography**: Fraunces for display/hero, DM Sans for body/UI
- **Colors**: Blue primary (#2563EB) for trust, Amber accent (#F59E0B) for warmth
- **Spacing**: 8px base unit, comfortable density
- **Motion**: Intentional animations (but NEVER on practice question screens to preserve focus)

## Important Notes

1. **Follow DESIGN.md strictly** - All visual decisions have been carefully researched and documented
2. **No animations on question screens** - Critical for maintaining student focus
3. **Security first** - Implement Firestore rules as specified in ARCHITECTURE.md
4. **Test subscription flow thoroughly** - Stripe integration must be bulletproof
5. **Use Pencil designs as reference** - All screens are fully designed in `sat-prep-mobile.pen`

## Cost Estimation

From `docs/ARCHITECTURE.md`:
- Monthly costs (1000 active users): ~$75/month
- Break-even: ~8 premium subscribers
- Revenue model: $9.99/month subscription
- Scalability: Costs scale linearly with usage

## Questions or Issues?

Refer to:
1. `docs/ARCHITECTURE.md` for technical implementation details
2. `DESIGN.md` for design system specifications
3. Pencil files (`sat-prep-mobile.pen`, `sat-prep.pen`) for UI references

## License

Proprietary - All rights reserved
