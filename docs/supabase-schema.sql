create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  target_score integer,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  subject text not null check (subject in ('math', 'reading-writing')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  subtopic text not null,
  prompt text not null,
  choice_a text not null,
  choice_b text not null,
  choice_c text not null,
  choice_d text not null,
  correct_choice text not null check (correct_choice in ('A', 'B', 'C', 'D')),
  explanation text not null,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create table if not exists public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  difficulty text not null,
  mode text not null check (mode in ('timed', 'untimed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  score integer,
  correct_count integer,
  question_count integer,
  weak_subtopics text[] not null default '{}'
);

create table if not exists public.practice_session_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.practice_sessions(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  selected_choice text check (selected_choice in ('A', 'B', 'C', 'D')),
  is_correct boolean not null default false,
  position integer not null
);

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.practice_session_answers enable row level security;

drop policy if exists "profiles are self readable" on public.profiles;
drop policy if exists "students can read published questions" on public.questions;
drop policy if exists "students can read own sessions" on public.practice_sessions;
drop policy if exists "students can create own sessions" on public.practice_sessions;
drop policy if exists "students can update own sessions" on public.practice_sessions;
drop policy if exists "students can read own answers" on public.practice_session_answers;
drop policy if exists "students can create own answers" on public.practice_session_answers;

create policy "profiles are self readable" on public.profiles
for select using (auth.uid() = id);

create policy "students can read published questions" on public.questions
for select using (status = 'published');

create policy "students can read own sessions" on public.practice_sessions
for select using (auth.uid() = user_id);

create policy "students can create own sessions" on public.practice_sessions
for insert with check (auth.uid() = user_id);

create policy "students can update own sessions" on public.practice_sessions
for update using (auth.uid() = user_id);

create policy "students can read own answers" on public.practice_session_answers
for select using (
  exists (
    select 1
    from public.practice_sessions sessions
    where sessions.id = session_id and sessions.user_id = auth.uid()
  )
);

create policy "students can create own answers" on public.practice_session_answers
for insert with check (
  exists (
    select 1
    from public.practice_sessions sessions
    where sessions.id = session_id and sessions.user_id = auth.uid()
  )
);

insert into public.questions (
  subject,
  difficulty,
  subtopic,
  prompt,
  choice_a,
  choice_b,
  choice_c,
  choice_d,
  correct_choice,
  explanation
)
values
  (
    'math',
    'medium',
    'Heart of Algebra',
    'The system of equations 2x + y = 13 and x - y = 2 is solved by the ordered pair (x, y). What is the value of x?',
    '3',
    '5',
    '7',
    '9',
    'B',
    'Add the equations after rewriting x - y = 2 as y = x - 2. Solving gives x = 5.'
  ),
  (
    'math',
    'medium',
    'Systems of equations',
    'If 3x + 2 = 17, what is the value of x?',
    '3',
    '4',
    '5',
    '6',
    'C',
    'Subtract 2 from both sides to get 3x = 15, then divide by 3.'
  ),
  (
    'math',
    'medium',
    'Linear equations',
    'What is the solution to 4x - 8 = 12?',
    '4',
    '5',
    '6',
    '7',
    'B',
    'Add 8 to both sides to get 4x = 20, then divide by 4.'
  );
