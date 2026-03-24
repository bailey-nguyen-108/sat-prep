# SAT Prep App - CEO-Level Architectural Plan

**Project:** SAT prep responsive web application (all roles: students, teachers, admins)
**Branch:** develop
**Status:** Greenfield - No existing code
**Date:** 2026-03-20 (Updated after CEO review)
**Architecture Version:** 2.0 (Pivoted from mobile-first to web-only)

---

## ⚠️ CEO REVIEW FINDINGS (2026-03-20)

**Review Status:** ✅ COMPLETE
**Review Mode:** HOLD SCOPE (make baseline bulletproof, no expansions)
**Overall Assessment:** 🔴 **ARCHITECTURE NOT LAUNCH-READY** - 144 issues found

### Critical Blockers (Must Fix Before ANY Launch)
**35 CRITICAL ISSUES** across security, data integrity, and infrastructure:

1. **Security (10 issues)**: No API route protection, no CSRF verification, server-side validation missing, Firestore rules bug
2. **Data Flow (7 issues)**: No session state persistence, race conditions, no atomic transactions
3. **Infrastructure (8 issues)**: Wrong deployment platform, no CI/CD, no error tracking, no logging
4. **Testing (5 issues)**: No test automation, no security tests, critical flows untested
5. **Performance (4 issues)**: No caching, no Web Vitals monitoring
6. **Accessibility (1 issue)**: Color contrast failures, no WCAG plan

**Action Plan**: 8 days of work to fix critical issues before writing any feature code.

**Full review report**: See Section 2 below for detailed issue list and recommendations.

---

## Executive Summary

**UPDATED (2026-03-20)**: Project scope changed from mobile-first to responsive web app for all user roles.

Building a responsive SAT prep web application with:
- **Next.js 14 responsive web app** for students, teachers, and admins (mobile & desktop)
- **Firebase backend** for authentication, database, and cloud functions
- **OpenAI GPT-4** for AI-generated answer explanations
- **Stripe** for premium subscriptions ($9.99/month)
- **Vercel** for hosting (changed from Firebase Hosting due to SSR requirements)

## Tech Stack Decisions (UPDATED 2026-03-20)

| Component | Technology | Rationale | Changed? |
|-----------|-----------|-----------|----------|
| **Web App** | **Next.js 14 App Router + React 18 + TypeScript** | Industry standard, SSR/SSG support, excellent DX, responsive design | ✅ UPDATED (was: separate mobile + web) |
| **Styling** | **Tailwind CSS v4** | Utility-first, responsive, matches DESIGN.md specs | ✅ NEW |
| **Hosting** | **Vercel** | Best Next.js support, automatic deployments, edge functions | ✅ CHANGED (was: Firebase Hosting) |
| **Backend** | Firebase (Firestore + Cloud Functions) | BaaS = faster development, auto-scaling, built-in auth | ✅ SAME |
| **Database** | Cloud Firestore | NoSQL, real-time sync, offline support, scales automatically | ✅ SAME |
| **Auth** | Firebase Auth + NextAuth.js | Email/password, session management, role-based custom claims | ✅ UPDATED (added NextAuth) |
| **State Management** | React Context + Zustand (complex state) | Zustand for practice session state, Context for user session | ✅ NEW |
| **Data Fetching** | SWR (client) + React cache() (server) | Client-side caching + server deduplication | ✅ NEW |
| **Forms** | React Hook Form + Zod | Type-safe validation, minimal re-renders | ✅ SAME |
| **AI Provider** | OpenAI GPT-4 | Best explanation quality for educational content | ✅ SAME |
| **Payments** | Stripe | Industry standard, excellent docs, webhook support | ✅ SAME |
| **Testing** | Playwright (E2E) + Vitest (unit) + Testing Library | Modern, fast, Next.js compatible | ✅ NEW |
| **Monitoring** | Sentry (errors) + Vercel Analytics (performance) | Industry standard error tracking + Web Vitals | ✅ NEW |
| **Logging** | Pino (structured logging) | Fast, structured, supports log levels | ✅ NEW |
| **Caching** | Upstash Redis (serverless) | Reduce Firestore costs, improve performance | ✅ NEW |

---

## Section 2: Critical Issues from CEO Review

**Review Date:** 2026-03-20
**Review Mode:** HOLD SCOPE (make baseline bulletproof)
**Reviewer:** CEO-level architectural review agent

### Issue Summary

| Category | Critical 🔴 | High 🟠 | Medium 🟡 | Total |
|----------|------------|---------|-----------|-------|
| **Security & Threat Model** | 10 | 7 | 7 | 24 |
| **Data Flow & Edge Cases** | 7 | 12 | 10 | 29 |
| **Code Quality** | 5 | 4 | 4 | 13 |
| **Testing** | 5 | 5 | 4 | 14 |
| **Performance** | 4 | 5 | 4 | 13 |
| **Observability** | 5 | 5 | 3 | 13 |
| **Deployment** | 3 | 5 | 4 | 12 |
| **Long-Term Trajectory** | 2 | 5 | 6 | 13 |
| **Design & UX** | 3 | 5 | 5 | 13 |
| **TOTAL** | **35** | **48** | **61** | **144** |

### Top 10 Critical Issues (Must Fix Immediately)

1. **ISSUE 107**: Deployment platform incompatible - Firebase Hosting doesn't support Next.js SSR → **Switch to Vercel**
2. **ISSUE 4**: API routes unprotected - Anyone can call `/api/questions/create` directly → **Add middleware protection**
3. **ISSUE 30**: No session state persistence - Refresh/close browser loses progress → **Implement localStorage + Firestore sync**
4. **ISSUE 94**: No logging strategy - Can't debug production issues → **Implement Pino structured logging**
5. **ISSUE 95**: Error tracking tool not chosen - No error monitoring → **Choose Sentry and configure**
6. **ISSUE 108**: No CI/CD pipeline - Manual deploys, no quality gates → **Setup GitHub Actions**
7. **ISSUE 81**: No Web Vitals monitoring - Can't measure performance → **Enable Vercel Analytics**
8. **ISSUE 14**: Firestore security bug - Teachers can read all users (privacy violation) → **Fix security rules**
9. **ISSUE 37**: Session save not atomic - Firestore write can fail partially → **Use Firestore transactions**
10. **ISSUE 133**: Animation risk on practice screens - Violates DESIGN.md rule → **Enforce no-animation zone**

### Immediate Action Plan (Before Writing Code)

**Phase 1: Security & Infrastructure** (3 days)
- [ ] Switch deployment to Vercel (ISSUE 107)
- [ ] Add API route protection middleware (ISSUE 4)
- [ ] Enable CSRF protection in NextAuth (ISSUE 5)
- [ ] Fix Firestore security rules (ISSUE 14)
- [ ] Add server-side validation (Zod) (ISSUE 8)
- [ ] Implement rate limiting (ISSUE 17)
- [ ] Setup Sentry error tracking (ISSUE 95)

**Phase 2: Data Integrity** (2 days)
- [ ] Implement session state persistence (ISSUE 30)
- [ ] Add Firestore transactions for atomic writes (ISSUE 37, 40)
- [ ] Add retry logic for Firestore writes (ISSUE 36)
- [ ] Implement subscription check transaction (ISSUE 29)
- [ ] Add rollback for failed registrations (ISSUE 25)

**Phase 3: Testing & Monitoring** (2 days)
- [ ] Setup GitHub Actions CI/CD (ISSUE 108)
- [ ] Create OpenAI API mocks (ISSUE 72)
- [ ] Add Firestore security rules tests (ISSUE 79)
- [ ] Implement Pino logging (ISSUE 94)
- [ ] Enable Vercel Analytics (ISSUE 81)
- [ ] Add error handling conventions (ISSUE 59)

**Phase 4: Caching & Performance** (1 day)
- [ ] Setup Upstash Redis caching (ISSUE 84, 87)
- [ ] Implement React cache() for server components (ISSUE 58)
- [ ] Add SWR for client-side data fetching (ISSUE 84)
- [ ] Implement SSR optimization (ISSUE 82)

**Phase 5: Accessibility & UX** (1 day)
- [ ] Fix color contrast (amber text → darker) (ISSUE 135)
- [ ] Add ARIA labels to all components (ISSUE 134)
- [ ] Implement skeleton screens (ISSUE 138)
- [ ] Create error message style guide (ISSUE 139)
- [ ] Enforce design tokens (ISSUE 136)

**Total Estimated Time**: ~9 days to make architecture launch-ready

### Recommendations

**Immediate Changes**:
1. Use Vercel for deployment (not Firebase Hosting)
2. Add database abstraction layer to reduce Firebase lock-in
3. Implement comprehensive error handling with try-catch + logging
4. Add Redis caching (Upstash) to reduce Firestore costs
5. Setup CI/CD with automated tests before ANY merges

**Process Improvements**:
1. Require CI to pass before merging (GitHub branch protection)
2. Schedule quarterly tech debt sprints (1 week every 6 months)
3. Create incident runbooks for common failures
4. Automate security scans (npm audit, Dependabot)
5. Document all architectural decisions (ADRs)

**Documentation Needed**:
1. Error message style guide
2. Deployment runbook with rollback procedures
3. Incident response playbooks
4. Developer onboarding guide
5. API documentation (TypeDoc auto-generated)

---

## System Architecture (UPDATED 2026-03-20)

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    RESPONSIVE WEB APP                            │
│                    (Next.js 14 + Tailwind)                       │
├──────────────────────┬──────────────────┬──────────────────────┤
│   STUDENT VIEW       │   TEACHER VIEW   │   ADMIN VIEW         │
│   (Mobile/Desktop)   │   (Desktop)      │   (Desktop)          │
├──────────────────────┼──────────────────┼──────────────────────┤
│ • Login/Register     │ • Login          │ • Login              │
│ • Practice Sessions  │ • View Students  │ • Question Bank CRUD │
│ • Results & Stats    │ • Performance    │ • AI Generation Queue│
│ • Subscription       │ • Assigned       │ • Manage Teachers    │
│ • Profile            │   Classes Only   │ • Manage Classes     │
└──────────────────────┴──────────────────┴──────────────────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    ▼                                ▼
┌─────────────────────────────────────┐  ┌──────────────────────┐
│       VERCEL (Hosting)               │  │  UPSTASH REDIS       │
│                                      │  │  (Caching Layer)     │
│ • Next.js SSR/SSG                   │  │                      │
│ • API Routes                         │  │ • Question cache     │
│ • Middleware (auth, rate limiting)   │  │ • AI explanation     │
│ • Edge Functions                     │  │   cache              │
└─────────────────────────────────────┘  │ • Session state      │
                    │                     └──────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FIREBASE BACKEND                             │
├─────────────────────────────────────────────────────────────────┤
│  Firebase Auth                                                   │
│  - Email/password authentication                                 │
│  - Custom claims for roles (student, teacher, admin)            │
│                                                                   │
│  Cloud Firestore                                                 │
│  - users, questions, sessions, subscriptions, classes           │
│  - Real-time sync, offline support                              │
│                                                                   │
│  Cloud Functions (Node.js)                                       │
│  - generateAIExplanation(questionId, userAnswer)                │
│  - selectAdaptiveQuestions(userId, weakSubtopics)               │
│  - processStripeWebhook(event)                                   │
│  - validateSubscriptionAccess(userId)                            │
└─────────────────────────────────────────────────────────────────┘
                          │                │
                          ▼                ▼
            ┌──────────────────┐   ┌─────────────────┐
            │   OpenAI API     │   │   Stripe API    │
            │   GPT-4 Turbo    │   │   Subscriptions │
            │   (Explanations) │   │   Webhooks      │
            └──────────────────┘   └─────────────────┘
```

---

## Data Model (Cloud Firestore)

### Collections & Document Structure

```typescript
// /users/{userId}
{
  id: string,                    // Firebase UID
  email: string,
  role: 'student' | 'teacher' | 'admin',
  subscriptionStatus: 'free' | 'premium',
  sessionsCompleted: number,     // For free tier limit (5 sessions)
  weakSubtopics: {               // Tracks performance by sub-topic
    [subtopic: string]: {
      correct: number,
      total: number,
      accuracy: number           // calculated: correct/total
    }
  },
  createdAt: timestamp,
  lastLoginAt: timestamp,

  // If teacher:
  assignedClassIds?: string[],

  // If student:
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
}

// /questions/{questionId}
{
  id: string,
  subject: 'Math' | 'Reading',
  difficulty: 'Easy' | 'Medium' | 'Hard',
  subtopic: string,              // e.g., "Algebra - Linear Equations", "Reading Comprehension"
  questionText: string,
  options: string[],             // 4 options (A, B, C, D)
  correctAnswer: number,         // Index 0-3
  explanation: string,           // Pre-written explanation (optional)
  aiGenerated: boolean,          // Whether this question came from AI queue
  status: 'draft' | 'published' | 'archived',
  createdBy: string,             // userId of admin/teacher who created it
  createdAt: timestamp,
  updatedAt: timestamp
}

// /sessions/{sessionId}
{
  id: string,
  userId: string,
  subject: 'Math' | 'Reading',
  difficulty: 'Easy' | 'Medium' | 'Hard',
  questions: {
    questionId: string,
    userAnswer: number | null,   // Index 0-3, null if skipped
    correct: boolean,
    timeSpent: number,           // seconds
    aiExplanation?: string       // Generated if answered incorrectly
  }[],
  score: number,                 // Percentage correct
  startedAt: timestamp,
  completedAt: timestamp,
  followUpSubtopics: string[]    // Weak areas identified for next session
}

// /subscriptions/{subscriptionId}
{
  id: string,                    // Matches Stripe subscription ID
  userId: string,
  stripeCustomerId: string,
  stripePriceId: string,
  status: 'active' | 'canceled' | 'past_due' | 'unpaid',
  currentPeriodStart: timestamp,
  currentPeriodEnd: timestamp,
  cancelAtPeriodEnd: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}

// /classes/{classId}
{
  id: string,
  name: string,
  teacherId: string,
  studentIds: string[],
  createdAt: timestamp
}

// /aiGenerationQueue/{queueId}
{
  id: string,
  subject: 'Math' | 'Reading',
  difficulty: 'Easy' | 'Medium' | 'Hard',
  subtopic: string,
  generatedQuestion: {
    questionText: string,
    options: string[],
    correctAnswer: number,
    explanation: string
  },
  status: 'pending_review' | 'approved' | 'rejected',
  reviewedBy?: string,           // userId of admin who reviewed
  createdAt: timestamp,
  reviewedAt?: timestamp
}
```

### Firestore Security Rules (Critical)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isStudent() {
      return isSignedIn() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'student';
    }

    function isTeacher() {
      return isSignedIn() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }

    function isAdmin() {
      return isSignedIn() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isPremium() {
      return isSignedIn() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.subscriptionStatus == 'premium';
    }

    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn() && (
        request.auth.uid == userId ||  // Users can read their own data
        isTeacher() ||                 // Teachers can read student data
        isAdmin()                      // Admins can read all
      );

      allow create: if isSignedIn() && request.auth.uid == userId;

      allow update: if isSignedIn() && (
        (request.auth.uid == userId && !('role' in request.resource.data)) ||  // Users can't change their own role
        isAdmin()                      // Only admins can update roles
      );

      allow delete: if isAdmin();
    }

    // Questions collection
    match /questions/{questionId} {
      allow read: if isSignedIn() && resource.data.status == 'published';  // All authenticated users can read published questions
      allow read: if isAdmin() || isTeacher();  // Teachers/admins can read all questions

      allow create, update: if isAdmin() || isTeacher();
      allow delete: if isAdmin();
    }

    // Sessions collection
    match /sessions/{sessionId} {
      allow read: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||  // Users can read their own sessions
        isTeacher() ||                               // Teachers can read student sessions
        isAdmin()
      );

      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid;
      allow update: if isSignedIn() && resource.data.userId == request.auth.uid;
      allow delete: if isAdmin();
    }

    // Subscriptions collection
    match /subscriptions/{subscriptionId} {
      allow read: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||
        isAdmin()
      );

      // Only Cloud Functions can write subscriptions (Stripe webhooks)
      allow write: if false;
    }

    // Classes collection
    match /classes/{classId} {
      allow read: if isSignedIn() && (
        resource.data.teacherId == request.auth.uid ||  // Teachers can read their classes
        request.auth.uid in resource.data.studentIds || // Students can read their classes
        isAdmin()
      );

      allow create, update, delete: if isAdmin() || isTeacher();
    }

    // AI Generation Queue
    match /aiGenerationQueue/{queueId} {
      allow read: if isAdmin() || isTeacher();
      allow create: if isAdmin();
      allow update: if isAdmin() && resource.data.status == 'pending_review';
      allow delete: if isAdmin();
    }
  }
}
```

---

## API Design (Cloud Functions)

### Core Cloud Functions

```typescript
// functions/src/index.ts

/**
 * Generate AI explanation for incorrect answer
 * Triggered: HTTPS callable from mobile app
 * Auth: Required (student, teacher, or admin)
 */
export const generateAIExplanation = functions.https.onCall(async (data, context) => {
  // Input: { questionId, userAnswer }
  // 1. Validate auth
  // 2. Fetch question from Firestore
  // 3. Call OpenAI GPT-4 with prompt:
  //    "Explain why answer ${correctAnswer} is correct for this SAT ${subject} question,
  //     and why answer ${userAnswer} is incorrect. Be clear and educational."
  // 4. Return explanation
  // Error handling: OpenAI timeout, rate limit, invalid question ID
});

/**
 * Select adaptive follow-up questions based on weak sub-topics
 * Triggered: HTTPS callable after session completion
 * Auth: Required (student only)
 */
export const selectAdaptiveQuestions = functions.https.onCall(async (data, context) => {
  // Input: { userId, subject, difficulty, numQuestions }
  // 1. Fetch user's weakSubtopics from /users/{userId}
  // 2. Find sub-topics with accuracy < 70%
  // 3. Query /questions for published questions matching:
  //    - subject
  //    - difficulty (same or easier)
  //    - subtopic in weak areas
  // 4. Randomly select {numQuestions} questions
  // 5. Return array of question IDs
  // Edge case: No weak sub-topics → return random questions
});

/**
 * Validate subscription access before starting session
 * Triggered: HTTPS callable before session start
 * Auth: Required (student only)
 */
export const validateSubscriptionAccess = functions.https.onCall(async (data, context) => {
  // Input: none (uses context.auth.uid)
  // 1. Fetch user from /users/{userId}
  // 2. If subscriptionStatus == 'premium' → return { allowed: true }
  // 3. If subscriptionStatus == 'free':
  //    - Check sessionsCompleted < 5 → return { allowed: true, sessionsRemaining: 5 - sessionsCompleted }
  //    - Else → return { allowed: false, paywallTriggered: true }
  // 4. Return result
});

/**
 * Process Stripe webhook events
 * Triggered: Webhook from Stripe
 * Auth: Validates Stripe signature
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  // Events handled:
  // - checkout.session.completed → Create subscription record, update user.subscriptionStatus = 'premium'
  // - customer.subscription.updated → Update subscription status
  // - customer.subscription.deleted → Update user.subscriptionStatus = 'free'
  // - invoice.payment_failed → Update subscription status = 'past_due'

  // Security: Verify Stripe signature with webhook secret
  // Idempotency: Check if event already processed (store processed event IDs)
});

/**
 * Generate SAT questions using OpenAI (admin-only)
 * Triggered: HTTPS callable from admin dashboard
 * Auth: Required (admin only)
 */
export const generateQuestionWithAI = functions.https.onCall(async (data, context) => {
  // Input: { subject, difficulty, subtopic, count }
  // 1. Validate admin role
  // 2. Call OpenAI GPT-4 with prompt to generate {count} SAT-style questions
  // 3. Parse JSON response
  // 4. Add each question to /aiGenerationQueue with status = 'pending_review'
  // 5. Return queue IDs
});

/**
 * Update user login activity (for attendance tracking)
 * Triggered: Firestore onCreate for /sessions/{sessionId}
 * Auth: Service account (background trigger)
 */
export const trackSessionActivity = functions.firestore
  .document('sessions/{sessionId}')
  .onCreate(async (snap, context) => {
    const session = snap.data();
    await admin.firestore().collection('users').doc(session.userId).update({
      lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
      sessionsCompleted: admin.firestore.FieldValue.increment(1)
    });
  });
```

---

## Mobile App (Flutter) - Structure

### Project Structure

```
mobile_app/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_colors.dart
│   │   │   ├── app_text_styles.dart
│   │   │   └── routes.dart
│   │   ├── services/
│   │   │   ├── firebase_auth_service.dart
│   │   │   ├── firestore_service.dart
│   │   │   ├── cloud_functions_service.dart
│   │   │   └── stripe_service.dart
│   │   ├── models/
│   │   │   ├── user_model.dart
│   │   │   ├── question_model.dart
│   │   │   ├── session_model.dart
│   │   │   └── subscription_model.dart
│   │   └── utils/
│   │       ├── validators.dart
│   │       └── error_handler.dart
│   ├── features/
│   │   ├── auth/
│   │   │   ├── screens/
│   │   │   │   ├── login_screen.dart
│   │   │   │   └── register_screen.dart
│   │   │   ├── widgets/
│   │   │   │   └── auth_form.dart
│   │   │   └── providers/
│   │   │       └── auth_provider.dart
│   │   ├── profile/
│   │   │   ├── screens/
│   │   │   │   └── profile_screen.dart
│   │   │   └── providers/
│   │   │       └── profile_provider.dart
│   │   ├── practice/
│   │   │   ├── screens/
│   │   │   │   ├── session_setup_screen.dart      // Select subject & difficulty
│   │   │   │   ├── question_screen.dart            // Bluebook-style MCQ display
│   │   │   │   ├── session_results_screen.dart     // Score & explanations
│   │   │   │   └── explanation_detail_screen.dart  // Full AI explanation
│   │   │   ├── widgets/
│   │   │   │   ├── question_card.dart
│   │   │   │   ├── option_button.dart
│   │   │   │   ├── progress_indicator.dart
│   │   │   │   └── explanation_card.dart
│   │   │   └── providers/
│   │   │       └── session_provider.dart
│   │   ├── subscription/
│   │   │   ├── screens/
│   │   │   │   ├── paywall_screen.dart             // Shown when free limit hit
│   │   │   │   ├── subscription_plans_screen.dart  // $9.99/month plan
│   │   │   │   └── payment_success_screen.dart
│   │   │   ├── widgets/
│   │   │   │   ├── plan_card.dart
│   │   │   │   └── feature_comparison.dart
│   │   │   └── providers/
│   │   │       └── subscription_provider.dart
│   │   └── dashboard/
│   │       ├── screens/
│   │       │   └── home_screen.dart                // Main navigation hub
│   │       └── widgets/
│   │           ├── stats_card.dart
│   │           └── weak_topics_list.dart
│   └── shared/
│       ├── widgets/
│       │   ├── custom_button.dart
│       │   ├── custom_text_field.dart
│       │   ├── loading_overlay.dart
│       │   └── error_dialog.dart
│       └── theme/
│           └── app_theme.dart
├── pubspec.yaml
├── firebase.json
├── .firebaserc
└── README.md
```

### Key Flutter Dependencies

```yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter

  # Firebase
  firebase_core: ^2.24.0
  firebase_auth: ^4.15.0
  cloud_firestore: ^4.13.0
  cloud_functions: ^4.5.0

  # State Management
  provider: ^6.1.1              # Or Riverpod if preferred

  # Payments
  flutter_stripe: ^10.0.0

  # UI
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.9

  # Utilities
  intl: ^0.18.1                 # Date formatting
  connectivity_plus: ^5.0.2     # Network check
  shared_preferences: ^2.2.2    # Local storage

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  mockito: ^5.4.3               # For unit tests
  integration_test:
    sdk: flutter
```

### Critical Mobile App Flows

#### 1. Registration & Login Flow

```
[Launch App]
    │
    ▼
[Check Firebase Auth Session]
    │
    ├─ If authenticated → [Home Screen]
    │
    └─ If not authenticated
          │
          ▼
      [Login Screen]
      ├─ Email + Password input
      ├─ "Sign In" button → Firebase Auth signInWithEmailAndPassword()
      │      │
      │      ├─ Success → Navigate to [Home Screen]
      │      └─ Error (invalid credentials) → Show error dialog
      │
      └─ "Register" link → [Register Screen]
             ├─ Email + Password + Confirm Password
             ├─ "Sign Up" button → Firebase Auth createUserWithEmailAndPassword()
             │      │
             │      ├─ Success:
             │      │   1. Create /users/{uid} document with role='student', subscriptionStatus='free', sessionsCompleted=0
             │      │   2. Navigate to [Home Screen]
             │      │
             │      └─ Error (email exists, weak password) → Show error dialog
             │
             └─ Validation:
                 - Email must be valid format
                 - Password ≥ 8 chars
                 - Passwords must match
```

#### 2. Practice Session Flow

```
[Home Screen]
    │
    ▼
[Tap "Start Practice"]
    │
    ▼
[Session Setup Screen]
    │
    ├─ Select subject: Math or Reading (buttons)
    ├─ Select difficulty: Easy, Medium, Hard (buttons)
    └─ Tap "Start Session"
          │
          ▼
      [Call validateSubscriptionAccess Cloud Function]
          │
          ├─ If allowed == false (free limit hit)
          │      │
          │      └─> [Paywall Screen]
          │            ├─ "You've used 5/5 free sessions"
          │            ├─ "Upgrade to Premium for unlimited access"
          │            └─ "Upgrade Now" → [Subscription Plans Screen]
          │
          └─ If allowed == true
                │
                ▼
            [Fetch questions from Firestore]
            - Query /questions where subject={subject}, difficulty={difficulty}, status='published'
            - Randomly select 10 questions
            - If user has weakSubtopics with accuracy < 70%, prioritize those subtopics
                │
                ▼
            [Question Screen]
            ├─ Display question text
            ├─ Display 4 options (A, B, C, D) as single-select buttons
            ├─ "Next" button (disabled until option selected)
            ├─ Progress indicator: "Question 3/10"
            ├─ Timer: Track time spent on question
            │
            ├─ On "Next" tap:
            │   1. Record userAnswer, timeSpent
            │   2. Move to next question
            │   3. If last question → Show loading overlay "Calculating your score..."
            │
            └─ On last question submit:
                1. Calculate score (# correct / total)
                2. For each incorrect answer:
                   - Call generateAIExplanation Cloud Function
                   - Store explanation in session data
                3. Analyze weak subtopics:
                   - Group questions by subtopic
                   - Calculate accuracy per subtopic
                   - Identify subtopics with < 70% accuracy
                4. Create /sessions/{sessionId} document
                5. Update /users/{userId}:
                   - Increment sessionsCompleted
                   - Update weakSubtopics stats
                6. Call selectAdaptiveQuestions Cloud Function for follow-up questions
                    │
                    ▼
                [Session Results Screen]
                ├─ Score: "7/10 (70%)"
                ├─ "Questions Breakdown" list:
                │   - Question #1: ✓ Correct
                │   - Question #2: ✗ Incorrect → Tap to see AI explanation
                │   - ...
                ├─ "Weak Areas" section:
                │   - "You struggled with: Algebra - Linear Equations (50% accuracy)"
                │   - "Recommended: Practice more questions in this area"
                ├─ "Practice Weak Areas" button → Start new session with follow-up questions
                └─ "Back to Home" button
                    │
                    └─ Tap incorrect question
                          │
                          ▼
                      [Explanation Detail Screen]
                      ├─ Show original question
                      ├─ "Your answer: B (incorrect)"
                      ├─ "Correct answer: C"
                      └─ AI explanation (formatted, clear)
```

#### 3. Subscription Flow

```
[Paywall Screen] or [Profile Screen → "Upgrade to Premium"]
    │
    ▼
[Subscription Plans Screen]
    │
    ├─ "Premium Plan" card:
    │   - $9.99/month
    │   - Unlimited practice sessions
    │   - AI-powered explanations
    │   - Adaptive learning
    │   - Cancel anytime
    │
    └─ "Subscribe Now" button
          │
          ▼
      [Initialize Stripe Payment Sheet]
      1. Call Cloud Function createStripeCheckoutSession:
         - Input: { userId, priceId: "price_xxx" }
         - Returns: { clientSecret, customerId }
      2. Present Stripe Payment Sheet with clientSecret
          │
          ├─ User enters card details
          ├─ Tap "Pay $9.99"
          │
          ├─ Payment success:
          │   1. Stripe webhook → stripeWebhook Cloud Function
          │   2. Update /users/{userId}.subscriptionStatus = 'premium'
          │   3. Create /subscriptions/{subscriptionId}
          │   4. Navigate to [Payment Success Screen]
          │        │
          │        └─> [Home Screen] (subscription now active)
          │
          └─ Payment failed:
              - Show error dialog: "Payment failed. Please check your card details."
              - Return to [Subscription Plans Screen]
```

---

## Web Dashboard (Next.js) - Structure

### Project Structure

```
web_dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                        // Landing/login redirect
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                  // Sidebar nav
│   │   │   ├── page.tsx                    // Dashboard home (role-based redirect)
│   │   │   ├── questions/
│   │   │   │   ├── page.tsx                // Question bank list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx            // Create question form
│   │   │   │   ├── edit/[id]/
│   │   │   │   │   └── page.tsx            // Edit question form
│   │   │   │   └── ai-queue/
│   │   │   │       └── page.tsx            // AI-generated questions pending review
│   │   │   ├── students/
│   │   │   │   ├── page.tsx                // Student list & performance
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx            // Individual student detail
│   │   │   ├── classes/
│   │   │   │   ├── page.tsx                // Class list (admin) or assigned classes (teacher)
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx            // Create class (admin only)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx            // Class detail & student assignments
│   │   │   ├── teachers/
│   │   │   │   ├── page.tsx                // Teacher list (admin only)
│   │   │   │   └── assign/
│   │   │   │       └── page.tsx            // Assign teachers to classes (admin)
│   │   │   └── settings/
│   │   │       └── page.tsx                // Account settings, logout
│   │   └── api/
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts            // NextAuth.js API routes
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── questions/
│   │   │   ├── QuestionForm.tsx
│   │   │   ├── QuestionList.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── QuestionSearchBar.tsx
│   │   │   └── AIQueueItem.tsx
│   │   ├── students/
│   │   │   ├── StudentTable.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   └── AttendanceCalendar.tsx
│   │   ├── classes/
│   │   │   ├── ClassCard.tsx
│   │   │   ├── ClassForm.tsx
│   │   │   └── StudentAssignmentList.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Modal.tsx
│   │       ├── Table.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── admin.ts                    // Firebase Admin SDK (server-side)
│   │   │   ├── client.ts                   // Firebase Client SDK
│   │   │   └── auth.ts                     // Auth helpers
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useQuestions.ts
│   │   │   ├── useStudents.ts
│   │   │   └── useClasses.ts
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── question.ts
│   │   │   ├── session.ts
│   │   │   └── class.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       └── validators.ts
│   ├── middleware.ts                       // Auth middleware (protect routes)
│   └── styles/
│       └── globals.css                     // Tailwind CSS
├── public/
│   ├── favicon.ico
│   └── logo.svg
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── .env.local
└── README.md
```

### Key Next.js Dependencies

```json
// package.json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",

    "firebase": "^10.7.0",
    "firebase-admin": "^12.0.0",
    "next-auth": "^4.24.5",          // Auth session management

    "tailwindcss": "^3.4.0",
    "@headlessui/react": "^1.7.17",  // Accessible UI components
    "@heroicons/react": "^2.1.1",    // Icons

    "react-hook-form": "^7.49.0",    // Form handling
    "zod": "^3.22.4",                // Validation

    "recharts": "^2.10.3",           // Charts for performance data
    "date-fns": "^2.30.0",           // Date utilities

    "axios": "^1.6.2"                // HTTP client
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "eslint": "^8.55.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

### Critical Web Dashboard Flows

#### 1. Admin/Teacher Login Flow

```
[Landing Page] (/login)
    │
    ├─ Email + Password form
    ├─ "Sign In" button
    │
    ▼
[Firebase Auth signInWithEmailAndPassword]
    │
    ├─ Success:
    │   1. Fetch user role from /users/{uid}
    │   2. If role == 'student' → Error: "This portal is for admin/teacher only"
    │   3. If role == 'teacher' or 'admin' → Redirect to /dashboard
    │   4. Set NextAuth session with role claim
    │
    └─ Error → Show error message

[Middleware] (middleware.ts)
    - Every request to /dashboard/* checks NextAuth session
    - If not authenticated → Redirect to /login
    - If role == 'student' → 403 Forbidden
```

#### 2. Question Bank CRUD Flow

```
[Dashboard → Questions] (/dashboard/questions)
    │
    ├─ Search bar: Filter by subject, difficulty, subtopic, keyword
    ├─ "Create Question" button (admin/teacher)
    ├─ "AI Generate" button (admin only)
    │
    ├─ Question list table:
    │   - Columns: Subject, Difficulty, Subtopic, Status, Created By, Actions
    │   - Actions: Edit, Delete, Archive
    │
    └─ Click "Create Question"
          │
          ▼
      [Create Question Form] (/dashboard/questions/new)
      ├─ Subject: Dropdown (Math, Reading)
      ├─ Difficulty: Dropdown (Easy, Medium, Hard)
      ├─ Subtopic: Text input (e.g., "Algebra - Linear Equations")
      ├─ Question Text: Textarea
      ├─ Options: 4 text inputs (A, B, C, D)
      ├─ Correct Answer: Dropdown (0-3)
      ├─ Explanation: Textarea (optional)
      ├─ Status: Dropdown (draft, published)
      │
      └─ "Save Question" button
          │
          ▼
      [Validate form → Create /questions/{id} in Firestore]
          │
          ├─ Success → Redirect to /dashboard/questions with success toast
          └─ Error → Show validation errors

[Click "AI Generate"]
    │
    ▼
[AI Generation Modal]
    ├─ Subject: Dropdown
    ├─ Difficulty: Dropdown
    ├─ Subtopic: Text input
    ├─ Count: Number input (1-10)
    │
    └─ "Generate" button
          │
          ▼
      [Call generateQuestionWithAI Cloud Function]
          │
          ├─ Show loading state
          ├─ Cloud Function calls OpenAI GPT-4
          ├─ Add questions to /aiGenerationQueue with status='pending_review'
          │
          └─ Success → Redirect to /dashboard/questions/ai-queue

[AI Queue Page] (/dashboard/questions/ai-queue)
    ├─ List of questions with status='pending_review'
    ├─ Each item shows: Question text, options, correct answer, explanation
    ├─ Actions: "Approve" (moves to published), "Reject" (deletes), "Edit" (opens edit form)
```

#### 3. Student Performance View

```
[Dashboard → Students] (/dashboard/students)
    │
    ├─ If teacher role: Show only students in assigned classes
    ├─ If admin role: Show all students
    │
    ├─ Table columns:
    │   - Name (email)
    │   - Subscription Status (Free/Premium)
    │   - Sessions Completed
    │   - Average Score (%)
    │   - Last Login (attendance tracking)
    │   - Actions: View Details
    │
    └─ Click "View Details"
          │
          ▼
      [Student Detail Page] (/dashboard/students/[id])
      ├─ Student info: Email, subscription, sessions completed
      ├─ Performance chart (Recharts):
      │   - X-axis: Session date
      │   - Y-axis: Score (%)
      │   - Line chart showing score trend
      ├─ Weak subtopics table:
      │   - Subtopic name
      │   - Accuracy (%)
      │   - Questions attempted
      ├─ Session history table:
      │   - Date, Subject, Difficulty, Score, Time Spent
      │   - Click to expand → see individual question breakdown
      └─ Digital attendance calendar:
          - Highlight days with login activity (lastLoginAt)
          - Show days with session completion
```

#### 4. Teacher-Class Assignment (Admin Only)

```
[Dashboard → Classes] (/dashboard/classes)
    │
    ├─ If admin: Show all classes + "Create Class" button
    ├─ If teacher: Show only assigned classes
    │
    └─ Click "Create Class"
          │
          ▼
      [Create Class Form] (/dashboard/classes/new)
      ├─ Class Name: Text input
      ├─ Assign Teacher: Dropdown (list of teacher accounts)
      ├─ Add Students: Multi-select dropdown (list of student accounts)
      │
      └─ "Save Class" button
          │
          ▼
      [Create /classes/{id} document]
      [Update /users/{teacherId}.assignedClassIds]
          │
          └─ Redirect to class detail page

[Class Detail Page] (/dashboard/classes/[id])
    ├─ Class name, assigned teacher
    ├─ Student list table:
    │   - Name, Sessions Completed, Avg Score, Last Login
    ├─ "Add Students" button (admin only)
    ├─ "Remove Student" action (admin only)
    │
    └─ Performance summary:
        - Average class score
        - Total sessions completed
        - Most common weak subtopics
```

---

## Security Architecture

### Authentication & Authorization Model

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  Firebase Auth                                               │
│  - Email/password authentication                             │
│  - Secure session tokens (JWT)                               │
│  - Custom claims for roles: { role: 'student' | 'teacher' | │
│    'admin' }                                                 │
│  - Token refresh handled automatically                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   AUTHORIZATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Firestore Security Rules (enforced server-side)             │
│                                                               │
│  Role-based access control:                                  │
│                                                               │
│  STUDENTS:                                                   │
│  ✓ Read their own user document                             │
│  ✓ Read published questions                                  │
│  ✓ Create/read/update their own sessions                     │
│  ✓ Read their own subscription                               │
│  ✓ Read classes they belong to                              │
│  ✗ Cannot access other students' data                        │
│  ✗ Cannot access admin/teacher dashboards                    │
│                                                               │
│  TEACHERS:                                                   │
│  ✓ All student permissions +                                │
│  ✓ Read questions (all statuses)                            │
│  ✓ Create/update questions                                   │
│  ✓ Read students in assigned classes                        │
│  ✓ Read sessions of students in assigned classes            │
│  ✓ Read/update assigned classes                             │
│  ✗ Cannot delete questions                                   │
│  ✗ Cannot access students outside assigned classes           │
│  ✗ Cannot modify class assignments                           │
│                                                               │
│  ADMINS:                                                     │
│  ✓ Full read/write access to all collections                │
│  ✓ Can change user roles                                    │
│  ✓ Can create/delete questions                              │
│  ✓ Can create/modify classes and assignments                │
│  ✓ Can access AI generation queue                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Cloud Functions with Service Account privileges            │
│  - Can bypass Firestore security rules                      │
│  - Validate inputs rigorously                                │
│  - Implement additional business logic checks                │
│                                                               │
│  Example: validateSubscriptionAccess                         │
│  - Check if user is Premium OR has free sessions remaining  │
│  - Prevent session start if limit exceeded                   │
│                                                               │
│  Example: stripeWebhook                                      │
│  - Verify Stripe signature before processing                 │
│  - Update subscription status atomically                     │
└─────────────────────────────────────────────────────────────┘
```

### Threat Model & Mitigations

| **Threat** | **Impact** | **Likelihood** | **Mitigation** |
|------------|------------|----------------|----------------|
| **Unauthorized access to other students' data** | High | Medium | Firestore security rules enforce `userId == request.auth.uid` for read/write on sessions and user docs |
| **Privilege escalation (student → admin)** | High | Low | Role stored in `/users/{uid}.role`, only admins can modify. Custom claims in Firebase Auth prevent client-side tampering |
| **Free users bypassing session limit** | Medium | High | `validateSubscriptionAccess` Cloud Function checks `sessionsCompleted` server-side before allowing session start. Client-side checks are advisory only |
| **Payment fraud (fake premium status)** | High | Low | Stripe webhook `stripeWebhook` is the ONLY way to update subscription status. Webhook signature verified. Firestore rule prevents client writes to `/subscriptions` |
| **Injection attacks (XSS, SQL)** | High | Medium | - Firestore is NoSQL (no SQL injection risk)<br>- React/Flutter auto-escape user input (XSS protection)<br>- Server-side validation in Cloud Functions<br>- Content Security Policy headers on web dashboard |
| **API key exposure (OpenAI, Stripe)** | High | Low | - API keys stored in Firebase Functions environment variables (encrypted at rest)<br>- Never sent to client<br>- OpenAI calls only from Cloud Functions<br>- Stripe public key is safe to expose; secret key server-side only |
| **Denial of Service (spam question generation)** | Medium | Medium | - AI question generation restricted to admin role<br>- Rate limiting on Cloud Functions (Firebase default: 1000 req/sec per function)<br>- Monitor Cloud Function invocations |
| **Man-in-the-Middle (MITM)** | High | Low | - All Firebase connections use HTTPS<br>- Mobile app uses certificate pinning (optional but recommended)<br>- Stripe Payment Sheet uses HTTPS |
| **Account takeover (weak passwords)** | High | Medium | - Firebase Auth enforces minimum 6-char password (can increase to 8+ in rules)<br>- Email verification optional but recommended<br>- Consider adding 2FA in future |
| **Data exfiltration (scraping question bank)** | Medium | Medium | - Questions only readable by authenticated users<br>- Rate limiting on Firestore reads<br>- Monitor for unusual read patterns<br>- Consider watermarking questions |
| **Prompt injection (manipulating AI explanations)** | Low | Medium | - User input sanitized before sending to OpenAI<br>- System prompt includes safety instructions<br>- OpenAI's built-in content filtering |

---

## Error Handling & Edge Cases

### Mobile App Error Scenarios

| **Scenario** | **Handling** | **User Sees** | **Logged?** |
|--------------|--------------|---------------|-------------|
| No internet during login | `try-catch` on Firebase Auth call, check connectivity with `connectivity_plus` | "No internet connection. Please try again." (dismissible dialog) | Yes (error type, timestamp) |
| Invalid credentials | Firebase Auth throws `FirebaseAuthException` with code `wrong-password` or `user-not-found` | "Invalid email or password." | Yes (userId attempt, timestamp) |
| Session limit exceeded (free user) | `validateSubscriptionAccess` returns `allowed: false` | Navigate to Paywall Screen with "You've completed 5/5 free sessions. Upgrade to continue!" | Yes (userId, timestamp) |
| AI explanation generation timeout (>30s) | `timeout` parameter on Cloud Function call, fallback to generic explanation | "Explanation is taking longer than expected. Showing fallback explanation." | Yes (questionId, timeout) |
| Stripe payment declined | Stripe SDK throws error, caught in `try-catch` | "Payment failed. Please check your card details." (retry button) | Yes (userId, Stripe error code) |
| Firestore write fails (network issue) | Retry 2x with exponential backoff, then fail | "Failed to save session. Your progress may not be saved. Please try again." | Yes (sessionId, error) |
| No questions match criteria | Query returns empty array | "No questions available for this difficulty. Try a different level." (back button) | Yes (subject, difficulty, timestamp) |
| User closes app mid-session | Auto-save progress to Firestore every 5 questions or on app background event | On restart: "Resume previous session?" (yes → restore state, no → discard) | Yes (sessionId, questionsCompleted) |

### Web Dashboard Error Scenarios

| **Scenario** | **Handling** | **User Sees** | **Logged?** |
|--------------|--------------|---------------|-------------|
| Unauthorized access (student tries to access /dashboard) | Middleware checks role, redirects to /login | "Access denied. This page is for teachers and admins only." | Yes (userId, attemptedRoute) |
| Question creation fails (invalid data) | `react-hook-form` + `zod` validation, catch Firestore errors | Red error messages below invalid fields. "Please fix errors before submitting." | No (client-side validation) |
| AI generation fails (OpenAI rate limit) | Cloud Function catches OpenAI error, returns error code | "AI generation failed. You may have hit the rate limit. Try again in a few minutes." | Yes (error, timestamp) |
| Teacher tries to delete question (insufficient permission) | Firestore security rule denies write, returns permission-denied | "You don't have permission to delete questions. Contact an admin." | Yes (userId, questionId) |
| Slow Firestore query (>5s) | Show loading spinner, timeout after 10s | Loading spinner → "Loading is taking longer than expected. Please refresh the page." | Yes (query, duration) |
| Concurrent edit conflict (two admins edit same question) | Firestore last-write-wins, no optimistic locking by default | No error shown (last save wins). Consider adding version field + conflict detection in future | No |

### Cloud Functions Error Scenarios

| **Function** | **Error** | **Handling** | **Retry?** |
|--------------|-----------|--------------|------------|
| `generateAIExplanation` | OpenAI timeout | Retry 2x with 5s delay, then return generic explanation | Yes |
| `generateAIExplanation` | OpenAI rate limit (429) | Return error to client with message | No (client should retry manually) |
| `selectAdaptiveQuestions` | No questions match weak subtopics | Fall back to random questions of same subject/difficulty | N/A |
| `stripeWebhook` | Invalid signature | Return 400 error immediately, log as potential attack | No |
| `stripeWebhook` | Duplicate event (Stripe retries) | Check if event already processed (store `event.id` in Firestore), skip if duplicate | No (idempotent) |
| `validateSubscriptionAccess` | User document not found | Return error "User not found" | No (investigate data integrity) |
| `trackSessionActivity` | Firestore write fails (network) | Retry 3x with exponential backoff, then fail silently (non-critical) | Yes |

---

## Performance Considerations

### Mobile App Performance

| **Area** | **Optimization** | **Target Metric** |
|----------|------------------|-------------------|
| App launch time | Lazy-load non-critical modules, use `flutter_native_splash` for splash screen | < 2 seconds to first screen |
| Question loading | Cache last 50 questions locally with `shared_preferences`, fetch new batch in background | < 1 second to display question |
| AI explanation generation | Show loading indicator, timeout after 30s, cache explanations in session data | < 5 seconds average response |
| Session submission | Batch Firestore writes (session + user update in transaction), show optimistic UI | < 2 seconds to show results |
| Image loading (if question images added) | Use `cached_network_image` package, compress images to WebP | < 1 second per image |
| Offline mode | Firestore offline persistence enabled, sync on reconnect | Full offline support for reading cached questions |

### Web Dashboard Performance

| **Area** | **Optimization** | **Target Metric** |
|----------|------------------|-------------------|
| Initial page load | Code splitting with Next.js dynamic imports, lazy-load charts | < 3 seconds First Contentful Paint |
| Question list rendering | Pagination (50 questions per page), virtual scrolling with `react-window` if >1000 questions | < 1 second to render page |
| Student performance chart | Use `recharts` with memoization, limit to last 30 sessions by default | < 2 seconds to render chart |
| Search/filter | Debounce search input (300ms), index Firestore queries properly | < 1 second to return results |
| Real-time updates | Use Firestore `onSnapshot` for live data, but limit to current page only | < 500ms to reflect changes |

### Firestore Indexing (Required for performance)

```javascript
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "questions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "subject", "order": "ASCENDING" },
        { "fieldPath": "difficulty", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "questions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "subtopic", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "completedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "role", "order": "ASCENDING" },
        { "fieldPath": "lastLoginAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## Deployment Strategy

### Phase 1: Development Environment Setup

**Mobile App:**
1. Create Flutter project: `flutter create mobile_app`
2. Add Firebase to Flutter:
   - Create Firebase project in console
   - Add iOS app (Bundle ID: `com.yourcompany.satprep`)
   - Add Android app (Package name: `com.yourcompany.satprep`)
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Run `flutterfire configure`
3. Set up Firebase emulator suite for local development:
   - `firebase init emulators` (Auth, Firestore, Functions)
   - Connect Flutter app to emulators in debug mode

**Web Dashboard:**
1. Create Next.js project: `npx create-next-app@latest web_dashboard --typescript`
2. Initialize Firebase Admin SDK with service account JSON
3. Connect to Firebase emulators for local development
4. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   FIREBASE_SERVICE_ACCOUNT_KEY=...
   NEXTAUTH_SECRET=...
   OPENAI_API_KEY=...
   STRIPE_SECRET_KEY=...
   STRIPE_WEBHOOK_SECRET=...
   ```

**Cloud Functions:**
1. Initialize Firebase Functions: `firebase init functions`
2. Set environment variables:
   ```bash
   firebase functions:config:set openai.api_key="sk-..." stripe.secret_key="sk_..."
   ```
3. Deploy to dev environment: `firebase deploy --only functions --project=dev`

### Phase 2: Staging Environment

1. Create separate Firebase project: `satprep-staging`
2. Deploy Cloud Functions, Firestore rules, indexes
3. Deploy web dashboard to Firebase Hosting (staging): `firebase hosting:channel:deploy staging`
4. Build Flutter app for TestFlight (iOS) and Internal Testing (Android):
   - iOS: `flutter build ios --release --flavor staging`
   - Android: `flutter build appbundle --release --flavor staging`
5. Add test users, test questions, test Stripe account (test mode)
6. Run full QA cycle

### Phase 3: Production Deployment

**Initial Launch:**
1. Create production Firebase project: `satprep-prod`
2. Deploy Cloud Functions with production environment variables
3. Deploy Firestore security rules and indexes
4. Deploy web dashboard to Firebase Hosting production
5. Submit mobile apps to App Store and Google Play:
   - iOS: TestFlight beta → App Store review → Public release
   - Android: Internal testing → Closed testing → Open testing → Production
6. Configure Stripe production webhooks pointing to Cloud Functions URL
7. Set up monitoring:
   - Firebase Performance Monitoring (mobile app)
   - Firebase Crashlytics (mobile app)
   - Sentry or LogRocket (web dashboard)
   - Firebase Functions logs and metrics

**Rollout Strategy:**
- Week 1: Soft launch (50 beta users, invite-only)
- Week 2-3: Open beta (public TestFlight/Play Store beta)
- Week 4: Official launch (App Store featured submission, marketing push)

### Phase 4: Post-Launch Operations

**Monitoring:**
- Set up Firebase Alerts for:
  - Cloud Function errors > 5% rate
  - Firestore read/write quota approaching limit
  - Auth errors > 10% rate
  - High latency (p99 > 3s for critical functions)
- Daily review of:
  - New user registrations
  - Subscription conversion rate (free → premium)
  - Session completion rate
  - Average session score
  - AI explanation generation success rate

**Backups:**
- Enable Firestore automated backups (daily)
- Export question bank weekly to Cloud Storage

**Scaling Triggers:**
- > 10,000 concurrent users → Consider Firestore scaling limits
- > 1M OpenAI tokens/day → Negotiate enterprise pricing
- > $1000/month Firebase costs → Review read/write patterns, optimize queries

---

## Testing Strategy

### Mobile App Testing

**Unit Tests:**
- Model parsing (QuestionModel, UserModel, SessionModel)
- Validators (email, password, form inputs)
- Business logic functions (score calculation, weak subtopic identification)

**Widget Tests:**
- QuestionCard renders correctly with options
- OptionButton toggles selection state
- SessionResultsScreen displays score and explanations
- PaywallScreen shows correct sessions remaining

**Integration Tests:**
- Full practice session flow (setup → questions → results)
- Subscription purchase flow (mock Stripe)
- Profile update flow

**E2E Tests (with Firebase Emulator):**
- User registration → Login → Start session → Complete session → View results
- Free user hits limit → Paywall shown → Upgrade → Session allowed
- Teacher login → Access denied (mobile app is student-only)

### Web Dashboard Testing

**Unit Tests:**
- API route handlers (NextAuth callbacks)
- Form validation schemas (Zod)
- Utility functions (date formatters, percentage calculations)

**Component Tests:**
- QuestionForm validates inputs correctly
- StudentTable renders data properly
- PerformanceChart displays chart with correct data

**Integration Tests:**
- Question CRUD flow (create → edit → delete)
- Student performance page loads data correctly
- Class assignment flow

**E2E Tests (with Playwright or Cypress):**
- Admin login → Create question → Publish → Verify appears in mobile app
- Teacher login → View assigned students → Check performance data
- Admin login → Generate AI questions → Review queue → Approve

### Cloud Functions Testing

**Unit Tests:**
- `generateAIExplanation` calls OpenAI with correct prompt
- `selectAdaptiveQuestions` prioritizes weak subtopics correctly
- `stripeWebhook` handles all event types correctly
- `validateSubscriptionAccess` enforces free tier limit

**Integration Tests (with Firebase Emulator):**
- Full session flow triggers `trackSessionActivity`
- Stripe webhook updates subscription status correctly
- AI generation adds questions to queue

**Load Tests:**
- `generateAIExplanation`: 100 concurrent calls → measure latency and error rate
- `validateSubscriptionAccess`: 1000 req/s → check for rate limiting issues

---

## Cost Estimation (Monthly, assuming 1000 active users)

| **Service** | **Usage** | **Cost** |
|-------------|-----------|----------|
| Firebase Firestore | ~5M reads, ~1M writes per month | $25 (reads) + $18 (writes) = $43 |
| Firebase Auth | 1000 MAU | Free (under 50k MAU) |
| Firebase Cloud Functions | ~50k invocations/month | $1 (under 2M invocations free tier) |
| Firebase Hosting | Web dashboard, < 10 GB bandwidth | Free |
| OpenAI GPT-4 | ~10k API calls/month, ~500k tokens | $15 (assuming $0.03/1k input tokens, $0.06/1k output tokens) |
| Stripe | ~50 new subscriptions/month × $9.99 = $500 revenue, 2.9% + $0.30 fee | ~$15 (Stripe fees) |
| Cloud Storage (backups) | 10 GB | $0.20 |
| **Total** | | **~$75/month** |

**Revenue (if 100 premium users at $9.99/month):** $999/month
**Net profit:** $999 - $75 = $924/month (excluding development costs)

**Break-even:** ~8 premium subscribers

**Scalability:** At 10k users with 10% premium conversion:
- Costs: ~$750/month (mostly Firestore and OpenAI)
- Revenue: ~$10k/month
- Net profit: ~$9,250/month

---

## MVP Feature Scope (for initial launch)

### MUST HAVE (Core Product):
- [x] Student mobile app (Flutter)
  - [x] Email/password auth
  - [x] Profile view
  - [x] Practice session (subject + difficulty selection)
  - [x] Bluebook-style MCQ display with single-answer selection
  - [x] Immediate scoring after session
  - [x] AI-generated explanations for incorrect answers
  - [x] Follow-up questions targeting weak sub-topics (simple rule-based)
- [x] Free vs Premium subscription model
  - [x] 5 free sessions limit
  - [x] Paywall screen
  - [x] Stripe payment integration ($9.99/month)
- [x] Admin web dashboard (React + Next.js)
  - [x] Admin/teacher login
  - [x] Question bank CRUD
  - [x] Sub-topic tagging
  - [x] Keyword search
  - [x] Student performance list (session scores)
  - [x] Digital attendance (last login, session completion)
- [x] Teacher account support (scoped to assigned classes)
- [x] AI question generation queue (admin can generate, manually review before publishing)

### NICE TO HAVE (Post-MVP, defer to Phase 2):
- [ ] Social login (Google, Apple) - Adds complexity, not critical for MVP
- [ ] In-app question images/diagrams - Focus on text-only initially
- [ ] Spaced repetition algorithm - Simple rule-based is sufficient for MVP
- [ ] Annual subscription discount - Start with monthly only
- [ ] Push notifications (reminders to practice) - Can add later
- [ ] Detailed analytics dashboard (time spent per question, progress over time) - Basic performance view is enough
- [ ] Gamification (badges, streaks, leaderboards) - Nice but not core
- [ ] Parent/guardian portal - Not requested in requirements
- [ ] Multi-language support - Start with English only
- [ ] Dark mode - Standard light theme for MVP
- [ ] Offline mode for questions (beyond Firestore's built-in caching) - Not critical
- [ ] Video explanations - Text explanations are sufficient
- [ ] Export student data to CSV - Admin can use Firestore console for now

---

## PLAN COMPLETE

This architectural plan provides a comprehensive blueprint for building the SAT prep application from scratch. All critical decisions have been documented, including:

1. **Tech stack**: Flutter (mobile), React + Next.js (web), Firebase (backend), OpenAI (AI), Stripe (payments)
2. **Data model**: Complete Firestore collections with security rules
3. **API design**: Cloud Functions for all backend logic
4. **User flows**: Detailed flows for registration, practice sessions, subscriptions, admin dashboards
5. **Security**: Threat model and mitigations, role-based access control
6. **Error handling**: Comprehensive error scenarios and handling strategies
7. **Performance**: Optimization strategies and target metrics
8. **Deployment**: Multi-phase rollout strategy from dev to production
9. **Testing**: Unit, integration, and E2E tests for all components
10. **Cost analysis**: Monthly cost estimation and break-even analysis
11. **MVP scope**: Clear MUST HAVE vs NICE TO HAVE feature prioritization

**Next steps:**
1. Set up Firebase project and development environment
2. Implement mobile app (Flutter) - authentication, practice sessions, subscriptions
3. Implement web dashboard (Next.js) - question bank, student performance
4. Implement Cloud Functions - AI explanations, adaptive questions, Stripe webhooks
5. Deploy to staging and run QA
6. Deploy to production and launch beta
7. Monitor metrics and iterate

**Estimated development time with CC + gstack:**
- Mobile app: ~4-6 hours (human team would take 2-3 weeks)
- Web dashboard: ~3-4 hours (human team would take 1-2 weeks)
- Cloud Functions: ~2-3 hours (human team would take 1 week)
- Testing & deployment: ~2-3 hours (human team would take 1 week)
- **Total: ~12-16 hours** (human team would take 5-7 weeks)

Compression ratio: **30-40x faster with AI-assisted development**
