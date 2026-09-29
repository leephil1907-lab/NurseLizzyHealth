-- Nurse Lizzy Health admin content store.
-- Run this in the Supabase SQL editor after creating your project.
-- Admin access is granted through app_metadata.role='admin' (never user_metadata).

create table if not exists public.admin_content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('article', 'guide', 'page', 'resource', 'setting')),
  slug text not null,
  title text not null default '',
  summary text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(kind, slug)
);

grant select on public.admin_content to anon;
grant select, insert, update, delete on public.admin_content to authenticated;

create index if not exists admin_content_kind_status_idx on public.admin_content(kind, status);
create index if not exists admin_content_updated_at_idx on public.admin_content(updated_at desc);

create or replace function public.set_admin_content_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists admin_content_updated_at on public.admin_content;
create trigger admin_content_updated_at
before update on public.admin_content
for each row execute function public.set_admin_content_updated_at();

alter table public.admin_content enable row level security;

-- Published entries may be read publicly once the public site is connected to this CMS.
drop policy if exists "Public can read published content" on public.admin_content;
create policy "Public can read published content"
on public.admin_content for select to anon, authenticated
using (status = 'published');

-- Only an owner account granted the protected app_metadata role can manage content.
drop policy if exists "Admin role can manage content" on public.admin_content;
create policy "Admin role can manage content"
on public.admin_content for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
