-- Vibesites lead-capture + admin schema
-- Normalized lookup tables (services/locations/tags) + join tables so
-- filtering/reporting stays index-friendly as lead volume grows.

create extension if not exists pgcrypto;

-- ---------- Lookup tables ----------

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz not null default now()
);

-- ---------- Leads ----------

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  whatsapp_number text,
  company text,
  location_text text,
  message text,
  budget_range text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'in_progress', 'converted', 'closed', 'not_interested')),
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx on leads (email);
create index if not exists leads_search_idx on leads
  using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(email, '') || ' ' || coalesce(company, '')));

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
before update on leads
for each row execute function set_updated_at();

-- ---------- Join tables (a lead can carry multiple of each) ----------

create table if not exists lead_services (
  lead_id uuid references leads (id) on delete cascade,
  service_id uuid references services (id) on delete cascade,
  primary key (lead_id, service_id)
);
create index if not exists lead_services_service_idx on lead_services (service_id);

create table if not exists lead_locations (
  lead_id uuid references leads (id) on delete cascade,
  location_id uuid references locations (id) on delete cascade,
  primary key (lead_id, location_id)
);
create index if not exists lead_locations_location_idx on lead_locations (location_id);

create table if not exists lead_tags (
  lead_id uuid references leads (id) on delete cascade,
  tag_id uuid references tags (id) on delete cascade,
  primary key (lead_id, tag_id)
);
create index if not exists lead_tags_tag_idx on lead_tags (tag_id);

-- ---------- Notes timeline (never overwritten, one row per note) ----------

create table if not exists lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads (id) on delete cascade,
  author_id uuid references auth.users (id),
  author_email text,
  note text not null,
  created_at timestamptz not null default now()
);
create index if not exists lead_notes_lead_idx on lead_notes (lead_id, created_at);

-- ---------- Admin profiles (backs Supabase Auth users) ----------

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('super_admin', 'admin')),
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function is_admin()
returns boolean as $$
  select exists (select 1 from profiles where id = auth.uid());
$$ language sql stable security definer set search_path = public;

create or replace function is_super_admin()
returns boolean as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'super_admin');
$$ language sql stable security definer set search_path = public;

-- ---------- Row Level Security ----------

alter table leads enable row level security;
alter table lead_services enable row level security;
alter table lead_locations enable row level security;
alter table lead_tags enable row level security;
alter table lead_notes enable row level security;
alter table services enable row level security;
alter table locations enable row level security;
alter table tags enable row level security;
alter table profiles enable row level security;

-- Public site can create leads (write-only) via the anon key; only admins can read/manage them.
create policy "public can submit leads" on leads
  for insert to anon, authenticated with check (true);
create policy "admins read leads" on leads
  for select to authenticated using (is_admin());
create policy "admins update leads" on leads
  for update to authenticated using (is_admin());
create policy "admins delete leads" on leads
  for delete to authenticated using (is_admin());

create policy "public can tag lead services" on lead_services
  for insert to anon, authenticated with check (true);
create policy "admins manage lead_services" on lead_services
  for all to authenticated using (is_admin());

create policy "public can tag lead locations" on lead_locations
  for insert to anon, authenticated with check (true);
create policy "admins manage lead_locations" on lead_locations
  for all to authenticated using (is_admin());

create policy "public can tag lead tags" on lead_tags
  for insert to anon, authenticated with check (true);
create policy "admins manage lead_tags" on lead_tags
  for all to authenticated using (is_admin());

create policy "admins manage lead_notes" on lead_notes
  for all to authenticated using (is_admin());

-- Lookup tables: public read (dropdowns on the marketing site), admin write.
create policy "public read services" on services for select to anon, authenticated using (true);
create policy "admins write services" on services for insert to authenticated with check (is_admin());
create policy "admins update services" on services for update to authenticated using (is_admin());
create policy "admins delete services" on services for delete to authenticated using (is_admin());

create policy "public read locations" on locations for select to anon, authenticated using (true);
create policy "admins write locations" on locations for insert to authenticated with check (is_admin());
create policy "admins update locations" on locations for update to authenticated using (is_admin());
create policy "admins delete locations" on locations for delete to authenticated using (is_admin());

create policy "public read tags" on tags for select to anon, authenticated using (true);
create policy "admins write tags" on tags for insert to authenticated with check (is_admin());
create policy "admins update tags" on tags for update to authenticated using (is_admin());
create policy "admins delete tags" on tags for delete to authenticated using (is_admin());

-- Profiles: admins can see the admin roster; only super_admin can add/edit/remove admins.
create policy "admins read profiles" on profiles for select to authenticated using (is_admin());
create policy "super_admin insert profiles" on profiles for insert to authenticated with check (is_super_admin());
create policy "super_admin update profiles" on profiles for update to authenticated using (is_super_admin());
create policy "super_admin delete profiles" on profiles for delete to authenticated using (is_super_admin());

-- ---------- Seed lookup data (kept in sync with src/data/services.js) ----------

insert into services (slug, name, category) values
  ('static-website-design', 'Static Website Design', 'web'),
  ('dynamic-website-design', 'Dynamic Website Design', 'web'),
  ('custom-website-design', 'Custom Website Design', 'web'),
  ('basic-website-design', 'Basic Website Design', 'web'),
  ('website-redesign', 'Website Redesign', 'web'),
  ('corporate-website', 'Corporate Website', 'web'),
  ('micro-website', 'Micro Website', 'web'),
  ('landing-page-design', 'Landing Page Design', 'web'),
  ('web-app-development', 'Web App Development', 'web'),
  ('website-migration', 'Website Migration', 'web'),
  ('web-maintenance', 'Web Maintenance', 'web'),
  ('ecommerce-solutions', 'E-Commerce Solutions', 'ecommerce'),
  ('payment-gateway-integration', 'Payment Gateway Integration', 'ecommerce'),
  ('mobile-app-development', 'Mobile App Development', 'apps'),
  ('android-app-development', 'Android App Development', 'apps'),
  ('react-native-app-development', 'React Native App Development', 'apps'),
  ('chatbot-whatsapp-integration', 'Chatbot & WhatsApp Integration', 'apps'),
  ('seo-services', 'SEO', 'marketing'),
  ('content-writing', 'Content Writing', 'marketing'),
  ('ui-ux-audit-redesign', 'UI/UX Audit & Redesign', 'marketing'),
  ('logo-brand-identity', 'Logo & Brand Identity', 'marketing'),
  ('social-media-setup-branding', 'Social Media Page Setup & Branding', 'marketing'),
  ('analytics-tracking-setup', 'Analytics & Tracking Setup', 'marketing'),
  ('wordpress-development', 'WordPress Development', 'platforms'),
  ('shopify-development', 'Shopify Development', 'platforms'),
  ('cms-setup', 'Content Management System Setup', 'platforms'),
  ('api-integration', 'API Integration', 'platforms'),
  ('website-speed-performance-optimization', 'Website Speed & Performance Optimization', 'platforms'),
  ('crm-development', 'CRM Development', 'addons'),
  ('erp-development', 'ERP Development', 'addons'),
  ('business-email', 'Business Email Setup', 'addons'),
  ('domain-registration', 'Domain Registration', 'addons'),
  ('hosting', 'Hosting', 'addons'),
  ('it-consulting', 'IT Consulting', 'addons')
on conflict (slug) do nothing;

-- ---------- Dashboard aggregate views ----------
-- security_invoker means these run under the querying role's own RLS grants
-- (admins only, since lead_services/lead_locations select is admin-gated),
-- rather than the view owner's — so no separate policy is needed here.

create or replace view service_lead_counts
with (security_invoker = on) as
select s.id, s.slug, s.name, s.category, count(ls.lead_id) as lead_count
from services s
left join lead_services ls on ls.service_id = s.id
group by s.id, s.slug, s.name, s.category;

create or replace view location_lead_counts
with (security_invoker = on) as
select l.id, l.name, count(ll.lead_id) as lead_count
from locations l
left join lead_locations ll on ll.location_id = l.id
group by l.id, l.name;
