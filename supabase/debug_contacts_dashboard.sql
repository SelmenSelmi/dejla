-- Run this in Supabase SQL Editor.
-- It returns useful debug info, then resets the policies needed by the contact form and admin dashboard.

-- 1) Check if rows actually exist in the table.
select count(*) as total_contacts_in_table from public.contacts;

-- 2) Preview recent rows directly in SQL Editor.
select id, name, email, phone, inquiry_subject, message, created_at
from public.contacts
order by created_at desc
limit 20;

-- 3) Check currently installed RLS policies for this table.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'contacts'
order by policyname;

-- 4) Reset permissions and policies for the current app setup.
alter table public.contacts enable row level security;

grant insert on table public.contacts to anon;
grant insert on table public.contacts to authenticated;
grant select on table public.contacts to authenticated;

drop policy if exists "Allow public contact form inserts" on public.contacts;
drop policy if exists "Allow temporary admin dashboard reads" on public.contacts;
drop policy if exists "Allow admin user contact reads" on public.contacts;

create policy "Allow public contact form inserts"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow admin user contact reads"
  on public.contacts
  for select
  to authenticated
  using ((select auth.uid()) = '05a84b26-e666-48d2-aa9d-8d17f8d66163'::uuid);

-- 5) Confirm final policies.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'contacts'
order by policyname;

-- 6) Optional test insert. Uncomment this block, run it once, then refresh /admin.
-- insert into public.contacts (name, email, phone, inquiry_subject, message)
-- values ('Dashboard Test', 'test@example.com', '+216 00 000 000', 'Supabase test', 'This row was inserted from SQL Editor.');
