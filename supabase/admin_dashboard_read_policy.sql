drop policy if exists "Allow temporary admin dashboard reads" on public.contacts;
drop policy if exists "Allow admin user contact reads" on public.contacts;

grant select on table public.contacts to authenticated;

create policy "Allow admin user contact reads"
  on public.contacts
  for select
  to authenticated
  using ((select auth.uid()) = '05a84b26-e666-48d2-aa9d-8d17f8d66163'::uuid);
