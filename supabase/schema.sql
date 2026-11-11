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

-- Certificates shown in the horizontal row on the home page. The admin panel's
-- "Гэрчилгээ нэмэх" button will insert here once Supabase is connected.
-- create table if not exists public.certificates (
--   id uuid primary key default gen_random_uuid(),
--   title text not null,
--   issuer text,
--   detail text,
--   image_url text not null,
--   "order" int,
--   created_at timestamptz default now()
-- );

-- The 7 service directions (accordion on the home page). Each can carry its own
-- extra information blocks (text + optional photo) that the admin panel's
-- "Мэдээлэл нэмэх" button will insert once Supabase is connected.
-- create table if not exists public.services (
--   id uuid primary key default gen_random_uuid(),
--   slug text unique not null,
--   title text not null,
--   subtitle text,
--   body_mn text,
--   body_en text,
--   "order" int,
--   created_at timestamptz default now()
-- );
--
-- create table if not exists public.service_items (
--   id uuid primary key default gen_random_uuid(),
--   service_id uuid not null references public.services(id) on delete cascade,
--   title text not null,
--   body text,
--   image_url text,
--   "order" int,
--   created_at timestamptz default now()
-- );
