-- Tsuurait Nurgeen: Supabase schema
-- Run in Supabase dashboard > SQL Editor.

-- ============================================================
-- Phase 1: contact form
-- ============================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- The API route uses the service role key (bypasses RLS).
-- Enable RLS so the anon key cannot read or write messages directly.
alter table public.messages enable row level security;

-- ============================================================
-- Phase 2: admin panel (not built yet, scaffold only)
-- ============================================================

-- create table if not exists public.projects (
--   id uuid primary key default gen_random_uuid(),
--   year text,
--   image_url text,
--   text text,
--   "order" int,
--   created_at timestamptz default now()
-- );

-- create table if not exists public.news (
--   id uuid primary key default gen_random_uuid(),
--   date date,
--   title text,
--   image_url text,
--   body text,
--   published boolean default false,
--   created_at timestamptz default now()
-- );
