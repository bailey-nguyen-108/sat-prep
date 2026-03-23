# Supabase Setup

Use this after the codebase-level Supabase integration is in place.

## 1. Create a Supabase project

- Create a new Supabase project
- Copy:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## 2. Add environment variables

Create `.env.local` from [/.env.example](/Users/baileynguyen/Library/CloudStorage/OneDrive-Personal/playground/sat-prep/.env.example).

## 3. Run the schema

In the Supabase SQL editor, run:
- [docs/supabase-schema.sql](/Users/baileynguyen/Library/CloudStorage/OneDrive-Personal/playground/sat-prep/docs/supabase-schema.sql)

This creates:
- `profiles`
- `questions`
- `practice_sessions`
- `practice_session_answers`

The app will then auto-seed the question bank on first use with:
- 20 Math questions
- 20 Reading & Writing questions

## 4. Create a student user

- You can create a test user directly from the app on `/login`
- The app will create or sync the matching `profiles` row automatically

## 5. Next implementation step

After the schema is applied, the live student flow should work:
- sign in via Supabase Auth
- create a practice session
- fetch questions from `questions`
- persist answers in `practice_session_answers`
- save and read results from `practice_sessions`
