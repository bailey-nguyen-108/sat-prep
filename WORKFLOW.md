# Development Workflow - SAT Prep App

## Team Roles

- **Bailey (Product/Design)** - Requirements, design system, UI designs, architecture decisions
- **Huy (Mobile Developer)** - Flutter implementation, iOS/Android builds, Firebase integration

---

## Branch Strategy

```
master (production-ready, protected)
  │
  ├── develop (integration branch)
  │     │
  │     ├── feature/* (Huy: Implementation work)
  │     └── docs/* (Bailey: Requirement/architecture updates - only when needs discussion)
```

### Branch Types

| Branch Prefix | Owner | Purpose | Example |
|--------------|-------|---------|---------|
| `feature/*` | Huy | New features, bug fixes | `feature/login-screen` |
| `docs/*` | Bailey | Major requirements/architecture changes that need discussion | `docs/add-social-login` |

**Note:** Bailey commits design updates directly to `develop` (no branches). Only branch for major breaking changes or when Huy explicitly requests it.

---

## Bailey's Workflow: Updating Designs

### Simplified Workflow (No Branches!)

**You (Bailey):**
1. Open `sat-prep-mobile.pen` in Pencil.dev
2. Make your design changes
3. Save the file
4. Tell Claude: **"Push design: [brief description]"**

**Claude automatically:**
- ✅ Stages `sat-prep-mobile.pen` and related files
- ✅ Updates `DESIGN.md` decision log (if significant)
- ✅ Commits with detailed message including screen IDs, changes, and impact on Huy
- ✅ Pushes directly to `develop`
- ✅ Notifies you with commit hash

**No branches, no PRs, no overhead.** Huy will get your changes when he runs `git pull origin develop`.

### Example

```
You: "Push design: Changed login button to darker blue"

Claude:
[Executes automatically]
✅ Staged sat-prep-mobile.pen
✅ Updated DESIGN.md decision log
✅ Committed: "Design: Change login button to darker blue

Screen: 7WE8A - Login Screen
Changed primary button #2563EB → #1D4ED8 for better contrast (WCAG AA)

Impact on Huy:
- Update lib/core/constants/app_colors.dart primaryBlue constant
- Estimated effort: 5 minutes"

✅ Pushed to origin/develop
📌 Commit: abc1234

🔔 Huy will see this on next git pull
```

### When to Branch (Rare Exceptions)

Only create `design/*` branches when:

1. **Huy explicitly requests it**
   - Example: "I'm halfway through implementing login. Can you branch your changes?"
   - You: "Branch design: [description]" (Claude creates branch + PR)

2. **Major breaking redesign**
   - Complete UI overhaul that invalidates weeks of work
   - You: "Branch design: Complete redesign of practice flow" (Claude creates branch + PR for discussion)

3. **Experimental design** (not sure if you'll keep it)
   - You: "Branch design: Trying minimalist navigation" (Claude creates branch, you can delete if you don't like it)

**Default: Just commit directly to develop.**

---

## Bailey's Workflow: Updating Requirements

### Scenario: You want to add a new feature (e.g., social login)

**Step 1: Create a GitHub Issue first**
```bash
gh issue create \
  --title "Add social login (Google & Apple)" \
  --label "enhancement" \
  --body "## User Story
As a student, I want to sign in with Google or Apple so I can avoid creating another password.

## Requirements
- [ ] Google Sign-In for iOS and Android
- [ ] Apple Sign-In for iOS
- [ ] Link social accounts to existing email accounts
- [ ] Update Firestore security rules

## Design Notes
- Add 'Sign in with Google' and 'Sign in with Apple' buttons below existing login form
- See Figma/Pencil for button designs (TBD)

## Architecture Impact
- Update Firebase Auth configuration
- Add new Cloud Function: \`linkSocialAccount\`
- Update \`auth_service.dart\` in Flutter

## Estimated Effort
- Design: 2 hours
- Backend: 4 hours
- Mobile: 6 hours

## Acceptance Criteria
- [ ] Users can sign in with Google on iOS and Android
- [ ] Users can sign in with Apple on iOS
- [ ] Existing users can link social accounts
- [ ] All tests pass

/cc @huy-username"
```

**Step 2: Create a docs branch**
```bash
git checkout develop
git pull origin develop
git checkout -b docs/add-social-login
```

**Step 3: Update ARCHITECTURE.md**
Add a new section or update existing sections:
```markdown
### Social Authentication (Added 2026-03-20)

**Firebase Auth Configuration:**
- Enable Google Sign-In provider
- Enable Apple Sign-In provider (iOS only)

**New Cloud Function:**
\`\`\`typescript
export const linkSocialAccount = functions.https.onCall(async (data, context) => {
  // Link social auth to existing email account
  // Prevent duplicate accounts
});
\`\`\`

**Flutter Implementation:**
- Use \`google_sign_in\` package
- Use \`sign_in_with_apple\` package
- Update \`lib/core/services/firebase_auth_service.dart\`
```

**Step 4: Update design if needed**
- Update `sat-prep-mobile.pen` to add social login buttons
- Take screenshots

**Step 5: Commit and create PR**
```bash
git add docs/ARCHITECTURE.md sat-prep-mobile.pen
git commit -m "Add social login to requirements

- Added Google Sign-In and Apple Sign-In
- Updated architecture with new Cloud Function
- Updated login screen design with social buttons

Closes #5"

git push -u origin docs/add-social-login

gh pr create \
  --base develop \
  --title "Add social login feature requirements" \
  --body "## Summary
Adding Google and Apple Sign-In to improve user onboarding.

## Changes
- Updated ARCHITECTURE.md with Firebase Auth configuration
- Added new Cloud Function: \`linkSocialAccount\`
- Updated login screen design with social buttons

## Next Steps for Huy
1. Review architecture changes
2. Estimate implementation time
3. Ask questions in issue #5

Closes #5

@huy-username Please review and provide feedback"
```

---

## Huy's Workflow: Implementing Features

### Scenario: Huy implements the login screen

**Step 1: Pull latest develop**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/login-screen
```

**Step 2: Implement code**
- Reference `sat-prep-mobile.pen` for designs
- Follow `DESIGN.md` for colors, spacing, fonts
- Follow `docs/ARCHITECTURE.md` for structure

**Step 3: Commit and push**
```bash
git add lib/features/auth/
git commit -m "Implement login screen

- Created login_screen.dart with email/password form
- Added auth_provider.dart for Firebase Auth
- Implemented form validation
- Matched Pencil designs (node ID: 7WE8A)

Colors and spacing follow DESIGN.md spec."

git push -u origin feature/login-screen
```

**Step 4: Create Pull Request**
```bash
gh pr create \
  --base develop \
  --title "Implement login screen" \
  --body "## Implementation
Built login screen following Pencil designs and DESIGN.md specs.

## Checklist
- [x] Matches Pencil design (7WE8A)
- [x] Uses colors from DESIGN.md
- [x] Firebase Auth integration
- [x] Form validation
- [x] Error handling
- [ ] Unit tests (in progress)

## Screenshots
iOS Simulator:
![iOS](screenshots/login-ios.png)

Android Emulator:
![Android](screenshots/login-android.png)

## Questions for Bailey
- Forgot password flow not designed yet - should I stub it out?
- Loading state animation - fade or spinner?

@bailey-nguyen-108"
```

---

## Merging Strategy

### Daily Workflow

**Bailey:**
1. Morning: Check if Huy has any PRs or questions
2. Review Huy's PRs for design compliance
3. Make design/requirement updates in separate branches
4. Create PRs with clear screenshots and impact notes

**Huy:**
1. Morning: Pull latest `develop` branch
2. Check for new design/requirement PRs from Bailey
3. Implement features in `feature/*` branches
4. Create PRs with screenshots and questions

### Weekly Sync

**Every Friday:**
1. Review open PRs together (video call or async)
2. Merge completed features to `develop`
3. Plan next week's work (create issues)
4. Update CHANGELOG.md with completed work

### When to Merge to Master

Only merge `develop` → `master` when:
- ✅ All MVP features complete
- ✅ All tests passing
- ✅ iOS and Android builds successful
- ✅ Ready for TestFlight/Play Store internal testing

---

## Communication Channels

### GitHub Issues
**Use for:**
- New feature requests
- Bug reports
- Design questions
- Architecture discussions

**Example Issues:**
- `[DESIGN] Update button corner radius` (Bailey creates)
- `[FEATURE] Implement practice session flow` (Huy creates)
- `[BUG] Login form validation not working` (Huy creates)
- `[QUESTION] Should we cache AI explanations?` (Huy asks Bailey)

### GitHub Pull Requests
**Use for:**
- All code and design changes
- Review and approval process
- Inline comments on specific changes

### Slack/Email
**Use for:**
- Urgent questions (response needed < 4 hours)
- Blocking issues
- Quick clarifications
- Weekly sync scheduling

### Video Calls
**Use for:**
- Weekly planning (30 min)
- Complex architecture discussions
- Onboarding/handoff sessions
- Quarterly retrospectives

---

## File-Specific Workflows

### Updating `sat-prep-mobile.pen` (Pencil Designs)

**Problem:** Pencil files are binary, so git diffs are useless.

**Solution:**
1. Always create a `design/*` branch
2. Export before/after screenshots to `images/design-updates/`
3. Document changes in PR description with screenshots
4. Tag affected screen IDs (e.g., "7WE8A - Login Screen")
5. List exact changes (color codes, spacing values)

**Example PR Description:**
```markdown
## Design Changes: Login Screen

### Screen ID: 7WE8A

### Changes
| Element | Before | After | Reason |
|---------|--------|-------|--------|
| Primary button color | #2563EB | #1D4ED8 | Better contrast (WCAG AA) |
| Input field border | 1px | 2px | More visible on light bg |
| Logo size | 48px | 56px | Better visual hierarchy |

### Screenshots
Before: ![Before](images/design-updates/login-before.png)
After: ![After](images/design-updates/login-after.png)

### Impact on Huy
- Update `app_colors.dart`: `primaryBlue = Color(0xFF1D4ED8)`
- Update `custom_button.dart`: No changes needed (uses theme)
- Estimated time: 5 minutes
```

### Updating `DESIGN.md`

**When Bailey updates:**
- Add entry to "Decisions Log" section
- Update relevant sections (colors, spacing, etc.)
- Create PR with clear rationale

**When Huy has questions:**
- Create GitHub issue: `[DESIGN QUESTION] Should buttons have shadows?`
- Bailey responds with decision + updates DESIGN.md

### Updating `docs/ARCHITECTURE.md`

**When requirements change:**
1. Create issue first (discuss with Huy)
2. Get Huy's estimate and feedback
3. Update ARCHITECTURE.md
4. Create PR with clear "Impact on Implementation" section

**When Huy finds issues:**
- Create issue: `[ARCHITECTURE] Missing Stripe webhook event handling`
- Discuss solution
- Bailey updates ARCHITECTURE.md

---

## Conflict Resolution

### Design Conflicts

**Scenario:** Huy implements a feature, but Bailey updates the design before Huy finishes.

**Resolution:**
1. Bailey's design PR goes to `develop` first
2. Huy rebases `feature/*` branch on latest `develop`
3. Huy updates implementation to match new design
4. If major rework needed: Discuss on Slack/video call

### Requirement Conflicts

**Scenario:** Huy implements Feature A, but Bailey realizes Feature B needs to ship first.

**Resolution:**
1. Pause Feature A PR (don't merge to `develop`)
2. Prioritize Feature B (Huy switches to new `feature/B` branch)
3. Once Feature B merged, resume Feature A
4. Update project timeline in issue tracker

### Merge Conflicts

**Scenario:** Both Bailey and Huy modify the same file (e.g., DESIGN.md).

**Resolution:**
1. Huy pulls latest `develop`
2. `git rebase develop` (not merge - keeps history clean)
3. Resolve conflicts locally
4. Push force: `git push --force-with-lease`
5. If unclear: Ask Bailey on Slack

---

## Example Weekly Workflow

### Monday
- **Bailey:** Review Huy's weekend progress, create issues for week
- **Huy:** Pull latest `develop`, plan feature work

### Tuesday-Thursday
- **Bailey:** Work on design updates, answer Huy's questions
- **Huy:** Implement features, create PRs

### Friday (Weekly Sync)
- **Both:** 30-min video call
  - Review PRs together
  - Merge completed work to `develop`
  - Plan next week (create issues)
  - Update CHANGELOG.md

---

## Tools Setup

### For Bailey

**Install GitHub CLI:**
```bash
brew install gh
gh auth login
```

**Useful commands:**
```bash
# Create issue
gh issue create --title "Add dark mode" --label "enhancement"

# Create PR with template
gh pr create --base develop --fill

# Review Huy's PR
gh pr review 5 --approve
gh pr review 5 --request-changes --body "Button color doesn't match DESIGN.md"

# Check PR status
gh pr list
gh pr view 5
```

### For Huy

**Setup remotes:**
```bash
git clone https://github.com/bailey-nguyen-108/sat-prep-app.git
cd sat-prep-app
git checkout develop
git pull origin develop
```

**Daily commands:**
```bash
# Start new feature
git checkout develop && git pull origin develop
git checkout -b feature/practice-session

# Push work
git push -u origin feature/practice-session

# Create PR
gh pr create --base develop --fill
```

---

## Changelog Management

Update `CHANGELOG.md` every Friday during weekly sync:

```markdown
# Changelog

## [Unreleased]

### Added (Week of 2026-03-17)
- Login screen UI (Huy)
- Register screen UI (Huy)
- Firebase Auth integration (Huy)
- Updated button colors in design system (Bailey)

### Changed
- Primary blue color: #2563EB → #1D4ED8 (Bailey)

### Fixed
- Form validation edge cases (Huy)

## [0.1.0] - 2026-03-19

### Added
- Initial project setup (Bailey)
- Complete design system (Bailey)
- Architectural documentation (Bailey)
- 8 mobile screen designs in Pencil (Bailey)
```

---

## Quick Reference

### Bailey's Checklist: Updating Designs
- [ ] Create `design/*` branch from `develop`
- [ ] Make changes to `.pen` file
- [ ] Export before/after screenshots
- [ ] Update DESIGN.md decisions log
- [ ] Commit with descriptive message
- [ ] Create PR with screenshots and impact notes
- [ ] Tag Huy for review

### Bailey's Checklist: Updating Requirements
- [ ] Create GitHub issue first
- [ ] Create `docs/*` branch from `develop`
- [ ] Update ARCHITECTURE.md or relevant docs
- [ ] Update designs if needed
- [ ] Commit with clear message
- [ ] Create PR linking to issue
- [ ] Get Huy's estimate and feedback

### Huy's Checklist: Implementing Features
- [ ] Pull latest `develop`
- [ ] Create `feature/*` branch
- [ ] Reference Pencil designs and DESIGN.md
- [ ] Implement code following ARCHITECTURE.md
- [ ] Take screenshots (iOS and Android)
- [ ] Commit with descriptive message
- [ ] Create PR with screenshots and questions
- [ ] Tag Bailey for review

---

## Emergency Contacts

| Person | Role | Slack | Email | Timezone |
|--------|------|-------|-------|----------|
| Bailey | Product/Design | @bailey | bailey@saola.co | UTC+7 |
| Huy | Mobile Dev | @huy | huy@example.com | UTC+7 |

---

## Appendix: Common Scenarios

### Scenario 1: Bailey updates colors while Huy is implementing

**Timeline:**
- Monday: Huy starts `feature/login-screen`
- Wednesday: Bailey updates primary blue color in `design/update-colors`
- Thursday: Bailey's PR merged to `develop`
- Friday: Huy needs to rebase

**Huy's actions:**
```bash
git checkout feature/login-screen
git fetch origin
git rebase origin/develop
# Update app_colors.dart with new color
git add lib/core/constants/app_colors.dart
git rebase --continue
git push --force-with-lease
```

### Scenario 2: Huy has a design question mid-implementation

**Flow:**
1. Huy creates issue: `[DESIGN QUESTION] Should error messages be red or amber?`
2. Bailey responds within 24 hours with decision
3. Bailey updates DESIGN.md if needed
4. Huy continues implementation

### Scenario 3: Major requirement change requires rework

**Flow:**
1. Bailey creates issue: `[BREAKING] Switch from Stripe to RevenueCat`
2. Video call scheduled to discuss impact
3. Bailey updates ARCHITECTURE.md in `docs/switch-to-revenuecat` branch
4. Huy estimates rework time (e.g., 2 weeks)
5. Decision: Delay other features, prioritize this change
6. Both update their branches accordingly

---

**Last Updated:** 2026-03-19
**Version:** 1.0
