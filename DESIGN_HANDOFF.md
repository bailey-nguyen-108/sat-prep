# Design Handoff — Student Desktop Flow

This document is the developer-facing implementation spec for the current desktop student flow.

Primary visual source of truth:
- `/Users/baileynguyen/Library/CloudStorage/OneDrive-Personal/playground/sat-prep/sat-prep-webapp.pen`

Visual system source of truth:
- `/Users/baileynguyen/Library/CloudStorage/OneDrive-Personal/playground/sat-prep/DESIGN.md`

If this document conflicts with older code, implement this document.
If this document conflicts with `DESIGN.md` on visual styling, keep `DESIGN.md`.
If this document conflicts with the current `.pen` composition, use the `.pen`.

## 0. Spec Maintenance Rule

When Bailey requests an update to `sat-prep-webapp.pen`, that same work pass must also update this document.

Rules:
- Do not treat `.pen` edits as visual-only changes.
- After every `.pen` update, document any affected layout, behavior, copy, or state rules here.
- If a new state is drawn in `.pen`, add that state explicitly to this handoff.
- If an existing rule becomes outdated because of a `.pen` change, rewrite it immediately.
- Engineering should be able to read this document and understand the latest approved behavior without opening the `.pen` file.

## 1. Global Rules

### 1.1 App Shell

All authenticated student screens use the same shell:
- Left sidebar width: `264px`
- Main content area fills the remaining width
- Sidebar background: `#1A1A1A`
- Main background: `#F8FAFC`
- Desktop frame size in design: `1440 x 1024`

### 1.2 Sidebar

Authenticated screens must render the same sidebar structure in this order:
1. Brand
2. Nav
3. Spacer
4. Student footer card

Brand:
- Icon: `book-open-check`
- Icon tile: blue background, 40x40
- Product name: `SAT Prep`

Nav items:
- `Home`
- `Practice`
- `Review`
- `Progress`

Active state:
- Dark active pill background
- 1px blue-tinted inset stroke
- White label text
- Bold label weight

Inactive state:
- Transparent background
- Muted light text
- Normal weight

Student footer card:
- Name: `Bailey Nguyen`
- Meta: `Target 1400 • SAT in 19 days`
- Pill: `7 day streak`

### 1.3 Typography

Use:
- Display/headlines/stat values: `Fraunces`
- Body/UI/buttons/labels: `DM Sans`

### 1.4 Core Colors

Use design tokens from `DESIGN.md`:
- Primary blue: `#42A5F5`
- Coral red accent: `#EF5350`
- Surface: `#FFFFFF`
- Border: `#E2E8F0`
- Text primary: `#0F172A`
- Text secondary: `#475569`
- Success: `#10B981`
- Warning: `#F59E0B`

### 1.5 Interaction Meaning

Do not treat color as decoration only.
Use colors semantically:
- Blue: primary action, selected state, active progress
- Coral red: below-threshold / incorrect / weak-area emphasis
- Green: correct / successful outcome
- Amber: warning / warm-up / secondary caution

## 2. Screen Inventory

Current desktop student screens in scope:
1. `Student Auth Desktop`
2. `Student Home Desktop`
3. `Practice Setup Desktop`
4. `Practice Session Desktop`
5. `Session Results Desktop`
6. `Session Results Desktop — Strong Performance`

## 3. Auth Screen

### 3.1 Structure

Two-column split:
- Left panel: dark gradient hero
- Right panel: login card

### 3.2 Left Panel Content

Order:
1. Brand
2. Hero title
3. Hero subtitle
4. Two stat cards

Hero title:
- `Practice smarter. Score higher.`

Hero subtitle:
- `Target weak skills and build steady momentum for the SAT.`

Stat cards:
- `84%` + `improve weak areas in 2 weeks`
- `12m` + `avg targeted review session`

### 3.3 Right Panel Content

Order:
1. `Welcome back`
2. Subcopy
3. Email field
4. Password field
5. `Keep me signed in` + `Forgot password?`
6. Primary CTA
7. Footer line

Primary CTA:
- `Continue to dashboard`

Footer:
- `New here? Create a student account in under 60 seconds.`

## 4. Home Screen

### 4.1 Header

Do not render a hero CTA on Home.

Render only:
- Headline: `Good afternoon, {firstName}.`
- Subtitle: `You are one strong review block away from raising your Math consistency this week.`

### 4.2 Metrics Row

Exactly 3 cards:
1. `Current streak`
2. `Accuracy`
3. `Questions reviewed`

Rules:
- Card 1 background: blue
- Card 2 background: white with border
- Card 3 background: coral red

Label rule:
- Use `Accuracy`
- Do not use `Math accuracy`

### 4.3 Lower Content

Home no longer includes:
- `Start targeted practice`
- `Next best session`
- `Today’s study plan`

Home currently includes only:
- `Recent sessions`
- `Weak areas to revisit`

These two cards should sit directly below the metrics row.

### 4.4 Recent Sessions Card

Title:
- `Recent sessions`

Each row displays:
- session label on left
- score on right

No divider lines between rows.

### 4.5 Weak Areas Card

Title:
- `Weak areas to revisit`

Each row displays:
- topic on left
- accuracy percentage on right

Color rule:
- if topic accuracy `< 70%`, percentage should be coral red or amber depending on severity

No divider lines between rows.

## 5. Practice Setup Screen

### 5.1 Header

Title:
- `Build your next practice block`

Subtitle:
- `Choose a focused session, then we’ll pull questions from the approved bank that best match your current level and weak areas.`

### 5.2 Left Column Option Cards

Render exactly 3 option cards:
1. `Section`
2. `Difficulty`
3. `Number of questions`

Layout rule:
- these three cards should visually match the `.pen` geometry
- each card uses centered vertical composition, not top-aligned composition
- label row and chip row should sit centered within the card height with even vertical breathing room above and below
- do not compress the cards to fit more content; match the approved desktop proportions from the `.pen`

#### Section

Allowed options:
- `Math`
- `Reading`

Do not render:
- `Writing`
- `Reading & Writing`

Only one option can be selected.

#### Difficulty

Current design includes:
- `Easy warm-up`

Do not invent extra difficulty options unless design is updated.

#### Number of questions

Allowed options:
- `10`
- `20`
- `50`

This replaces the older `Mode` control.

Do not render:
- `Timed`
- `Untimed`

### 5.3 Summary Card

Card title:
- `Session summary`

Summary content must update from the selected controls.

At minimum it should reflect:
- chosen question count
- target subject/area
- approved bank sourcing

Primary CTA:
- `Start practice session`

### 5.4 Lower Row

Do not render a lower row on the Practice Setup screen.

Removed from the approved design:
- `Question count preview`
- `What to expect`
- any helper badge or pill associated with those removed cards

## 6. Practice Session Screen

### 6.1 Header

Top left:
- eyebrow subject line
- `Question {n} of {total}`
- progress bar

Top right:
- timer card with label and value

### 6.2 Main Question Card

Content order:
1. Question prompt
2. Answer choice A
3. Answer choice B
4. Answer choice C
5. Answer choice D
6. Hint/support block

### 6.3 Navigator Rail

Right rail contains:
1. `Question navigator`
2. supporting body copy
3. small question chips
4. summary line
5. `Session snapshot`

Snapshot rows:
- `Answered`
- `Flagged`
- `Remaining`

Question chip visual states:
- answered question: solid blue fill, white text
- unanswered question: neutral light fill, dark text, 1px border
- flagged question: solid coral red fill, white text

If a question is flagged, its navigator chip must render in coral red so the flagged state is visible before submission review.
Do not use blue to mean merely `current`. Blue indicates `answered`.

### 6.4 Footer Actions

Render exactly 3 actions in this order:
1. `Previous question`
2. `Flag for later`
3. `Next question`

#### Flag for later

This is not a destructive action.
It means:
- mark current question as flagged
- student may leave it unanswered
- student can return later before final submission

Visual rules:
- white secondary button
- coral red `flag` icon
- label: `Flag for later`

Behavior rules:
- clicking flag should not auto-submit an answer
- flagged unanswered questions remain unanswered
- navigator and session snapshot must increment flagged count

## 7. Standard Results Screen

This is the results state for sessions where at least one tracked topic is below `70%`.

### 7.1 Header

Current title:
- `You finished strong.`

Subtitle describes that another review round is needed now.

### 7.2 Score Card

If overall accuracy `< 70%`:
- score card background must be coral red

Current low-accuracy example:
- score: `7 / 12`
- subtitle: `58% accuracy • needs another review block`

Score tray metrics:
- `Correct`
- `Review`
- `Weak areas`

### 7.3 Weak-Area Follow-Up Card

Title:
- `Weak-area follow-up`

This card must contain:
- follow-up explanation text
- weak topic rows
- primary CTA at the bottom of this same card

Primary CTA:
- `Practice weak areas`

Do not render a separate global action row outside this card.

Top row layout rule:
- the left `Session score` card and the right `Weak-area follow-up` card must render at the same height
- do not allow content-driven height drift between these two cards

### 7.4 Question Review Card

Do not render grouped range summaries anymore.

Render:
- title: `Question review`
- short instructional line
- list of individual questions

Pattern:
- collapsed item row
- one item can be shown expanded in design

Collapsed row must show:
- question label, e.g. `Question 8`
- status on right, e.g. `Correct`, `Incorrect`, `Flagged`
- chevron

Expanded row must show:
- full question content / question stem
- all answer choices, not just the chosen answer and the correct answer
- for each answer choice:
  - answer label / answer text
  - explanation of why that specific answer is right or wrong
- visual indication of:
  - student answer
  - correct answer

The review panel should be self-contained:
- a student should be able to understand the original question without leaving the results screen
- a student should be able to understand why each answer choice was wrong, not only why the correct answer was right
- the expanded review panel should use full card width with readable answer blocks and generous spacing; do not compress the explanation layout into narrow columns

Important:
- explanation must reference the actual answer content, not only `A/B/C/D`
- assume students do not remember what each letter meant

### 7.5 Status Colors

Use:
- `Incorrect` → coral red
- `Correct` → green
- `Flagged` → blue

## 8. Strong Results Screen

This is a separate screen variant when no tracked topic is below `70%`.

### 8.1 When to Use

Show this screen when:
- every tracked topic accuracy is `>= 70%`

Do not show weak-area follow-up in this case.

### 8.2 Header

Title:
- `You cleared every target.`

Subtitle should state:
- no follow-up block is required
- next best move is a harder or faster set

### 8.3 Score Card

Keep the score card blue in this state.

Metrics tray should reflect:
- `Under 70%` = `0`

### 8.4 Right Card

Title:
- `No weak-area follow-up needed`

CTA:
- `Try a harder set`

Top row layout rule:
- the left `Session score` card and the right `No weak-area follow-up needed` card must render at the same height
- do not allow content-driven height drift between these two cards

### 8.5 Question Review

Use the same `Question review` accordion pattern as the standard results screen.
Only the data changes.

## 9. Explicit Display Logic

### 9.1 Accuracy Color Logic

Home:
- metric card styling stays fixed by design

Results:
- if overall session accuracy `< 70%` → score card coral red
- if overall session accuracy `>= 70%` and no topic `< 70%` → use strong-results variant with blue score card

Weak-topic rows:
- any topic `< 70%` is visually emphasized

### 9.2 Follow-Up Logic

If any tracked topic `< 70%`:
- show standard results screen
- show `Weak-area follow-up`
- show CTA `Practice weak areas`

If no tracked topic `< 70%`:
- show strong-results screen
- replace weak-area card with `No weak-area follow-up needed`
- CTA becomes `Try a harder set`

### 9.3 Question Review Logic

Question review items should support:
- correct questions
- incorrect questions
- flagged questions
- unanswered questions if session rules allow them

Every expanded question must have:
- question identifier
- student answer letter
- student answer text
- correct answer letter
- correct answer text
- explanation copy

## 10. Non-Negotiables

Developers should not:
- add back removed Home sections
- reintroduce `Writing`
- reintroduce `Timed/Untimed` on setup
- move results CTA out of the weak-area card
- replace question review with grouped range summaries
- show answer letters without answer text in expanded review

If implementation requires a decision not covered here, ask for design clarification before inventing a pattern.

## 11. Exact Layout Tokens

These values are taken from the current `.pen` screens and should be treated as implementation defaults for desktop.

### 11.1 Desktop Canvas

- Desktop design width: `1440px`
- Desktop design height: `1024px`
- Sidebar width: `264px`
- Main content width at full design size: `1176px`
- Main content padding: `40px`

### 11.2 Sidebar Tokens

- Sidebar padding: `32px 24px`
- Sidebar section gap: `24px`
- Nav stack gap: `10px`
- Nav item padding: `14px 16px`
- Brand icon tile: `40 x 40`
- Sidebar footer card padding: `16px`
- Sidebar footer card gap: `12px`
- Sidebar footer pill padding: `10px 12px`
- Sidebar footer pill radius: `9999px`

### 11.3 Card Tokens

Default content card:
- Background: white
- Border: `1px solid #E2E8F0`
- Radius: `16px` or `24px` depending on visual weight
- Standard card padding: `24px`

Large results/session cards:
- Radius: `24px`

Metric cards:
- Internal gap: `8px`
- Standard padding: `24px`

### 11.4 Header Typography Tokens

Desktop page headline:
- Font: `Fraunces`
- Size: `42px`
- Weight: `700`

Desktop page subtitle:
- Font: `DM Sans`
- Size: `16px`
- Line height: `1.35` for Home header
- Standard body/subtitle elsewhere: `1.5`

### 11.5 Button Tokens

Primary button:
- Background: primary blue
- Text: white
- Radius: `8px`
- Padding: `18px 24px`

Secondary button:
- Background: white
- Border: `1px solid #E2E8F0`
- Text: primary text
- Radius: `8px`
- Padding: `18px 24px`

Pill selector:
- Radius: full
- Padding: `14px 18px`

## 12. Data Mapping Contract

Developers should not infer labels or values ad hoc. Use these field mappings.

### 12.1 Auth Screen

- `email` input
- `password` input
- `remember_me` boolean

### 12.2 Home Screen

Headline:
- source: user first name
- fallback name in design: `Bailey`

Metric cards:
- `Current streak` ← `current_streak_days`
- `Accuracy` ← latest or rolling accuracy number
- `Questions reviewed` ← total reviewed count

Weak areas:
- source: weak topics collection
- row shape:
  - `topic_name`
  - `topic_accuracy_percent`

Recent sessions:
- source: recent sessions list
- row shape:
  - `session_label`
  - `session_score_display`

### 12.3 Practice Setup

Section selector:
- enum: `math | reading`

Difficulty selector:
- current visible enum: `easy_warmup`

Question count selector:
- enum: `10 | 20 | 50`

Summary card:
- `question_count`
- `target_focus_label`
- `source_note` = approved bank, not live generation

### 12.4 Practice Session

Top header:
- `subject_label`
- `current_question_index`
- `total_question_count`
- `time_remaining`

Question card:
- `question_prompt`
- `answer_choices[]`
- `selected_choice`
- `hint_text`

Navigator:
- ordered question items
- current question state
- flagged count
- answered count
- remaining count

### 12.5 Results Screens

Score card:
- `correct_count`
- `review_count`
- `weak_area_count`
- `score_display`
- `accuracy_percent`

Weak follow-up card:
- `weak_topics[]`
- each weak topic:
  - `topic_name`
  - `topic_accuracy_percent`

Question review list:
- `question_number`
- `status`
- `student_answer_letter`
- `student_answer_text`
- `correct_answer_letter`
- `correct_answer_text`
- `explanation_text`

## 13. Visibility Rules By State

### 13.1 Home

Show:
- metrics row
- recent sessions
- weak areas

Do not show:
- next best session
- study plan
- hero CTA

### 13.2 Setup

Always show:
- section selector
- difficulty selector
- question count selector
- summary
- preview
- expectation card

Do not show:
- writing
- timed / untimed

### 13.3 Session

Always show:
- question prompt
- all answer options
- navigator rail
- previous action
- flag-for-later action
- next action

Flag state:
- if current question flagged, that state must be reflected in navigator and snapshot counts

### 13.4 Results

Standard results:
- shown if any tracked topic `< 70%`

Strong results:
- shown if all tracked topics `>= 70%`

Do not render both states together.

## 14. Question Review Behavior Spec

This is the most important behavior detail on the results screen.

### 14.1 Accordion Pattern

Each question review item has two states:
- collapsed
- expanded

Collapsed item must show:
- question label, e.g. `Question 4`
- status tag, e.g. `Incorrect`
- chevron indicating expandable state

Expanded item must show all of:
- `Your answer`
- student answer letter
- student answer text
- `Correct answer`
- correct answer letter
- correct answer text
- explanation paragraph

### 14.2 Explanation Writing Rule

Explanation text must answer:
1. why the student’s answer was wrong or right
2. what the correct answer says
3. what reasoning step distinguishes the correct answer from the chosen answer

Bad implementation:
- `Your answer: B`
- `Correct answer: A`
- `You made a sign mistake`

Acceptable implementation:
- `Your answer: B — 5`
- `Correct answer: A — 3`
- explanation text explicitly mentions `5` and `3`

### 14.3 Status Semantics

- `Correct`
  - green text
  - can be expanded to show why it was right
- `Incorrect`
  - coral red text
  - expanded by default in the low-accuracy results example
- `Flagged`
  - blue text
  - means student marked it to revisit
- `Unanswered`
  - if supported, use neutral/dark text with explicit label

### 14.4 Scaling Rule

This design used to group results by ranges.
That is no longer the intended pattern.

For 10, 20, or 50 questions:
- always render a per-question review list
- do not compress the UI into range summaries
- if many questions exist, use vertical scrolling, pagination, or virtualization in code
- do not change the visual model back to grouped rows

## 15. Empty, Loading, and Error States

The `.pen` file is a happy-path spec. Engineering must still implement the missing states below.

### 15.1 Home Empty States

If no recent sessions:
- render `Recent sessions` card
- body text: short empty-state copy
- do not leave the card blank

If no weak areas:
- either show strongest topics or a positive no-weak-area message
- do not leave the card blank

### 15.2 Setup Loading States

If setup metadata is loading:
- show the full card structure
- replace pills and summary values with skeleton content
- do not shift layout after load

### 15.3 Session Loading / Error

While loading a question:
- preserve page structure
- question card may show skeleton blocks

If question fetch fails:
- show inline error message inside main content area
- keep nav shell visible

### 15.4 Results Loading / Error

While loading results:
- preserve score card and review card structure with skeletons

If result data fails:
- show inline error with recovery CTA
- do not render partial mismatched cards

## 16. Responsive Guidance

This document is the desktop spec.

For widths below desktop:
- do not simply scale this layout proportionally
- preserve component order, but use intentional stacking
- maintain the same state logic
- keep question review as an accordion/list, not a table

If mobile/tablet designs do not yet exist:
- developers should not invent new IA
- ask for explicit design review after first responsive pass

## 17. Acceptance Criteria By Screen

### 17.1 Auth Acceptance

- left hero and right form are both visible on desktop
- fonts match design system
- brand lockup matches product branding
- primary CTA is blue

### 17.2 Home Acceptance

- no hero CTA
- no next best session card
- no study plan card
- `Accuracy` label is present
- only `Recent sessions` and `Weak areas to revisit` appear below metrics

### 17.3 Setup Acceptance

- `Math` and `Reading` only
- `Writing` absent
- `Number of questions` present
- `10`, `20`, `50` choices present
- `Timed` and `Untimed` absent

### 17.4 Session Acceptance

- footer action order is:
  - previous
  - flag for later
  - next
- flag button uses coral red flag icon
- flag action does not imply answer submission

### 17.5 Standard Results Acceptance

- if accuracy `< 70%`, score card is coral red
- weak-area CTA is inside the weak-area card
- no separate action row
- question review is per-question accordion
- expanded panel shows answer text, not only letters

### 17.6 Strong Results Acceptance

- only shown when no topic `< 70%`
- score card remains blue
- weak-area follow-up replaced with positive no-follow-up message
- CTA is `Try a harder set`
- question review uses the same accordion pattern

## 18. Developer Questions That Should Trigger Design Review

Stop and ask for review if any of these come up:
- screen needs another card to fill empty space
- engineer wants to reintroduce grouped breakdown rows
- engineer wants to add more setup options not in design
- engineer is unsure whether a low-accuracy state is “red enough”
- engineer wants to collapse answer text to letters only

The rule is simple:
- if the implementation requires inventing product behavior or layout not written here, escalate instead of improvising.
