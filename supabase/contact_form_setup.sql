create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  inquiry_subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

grant insert on table public.contacts to anon;
grant insert on table public.contacts to authenticated;
grant select on table public.contacts to authenticated;

drop policy if exists "Allow public contact form inserts" on public.contacts;
create policy "Allow public contact form inserts"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow temporary admin dashboard reads" on public.contacts;
drop policy if exists "Allow admin user contact reads" on public.contacts;
create policy "Allow admin user contact reads"
  on public.contacts
  for select
  to authenticated
  using ((select auth.uid()) = '05a84b26-e666-48d2-aa9d-8d17f8d66163'::uuid);
