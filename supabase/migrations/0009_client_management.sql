-- Client & Agreement Management System
-- Extends the admin panel with the full client lifecycle: quotations, projects
-- (with revision tracking), agreements (Google Drive links), invoices with
-- partial-payment support, recurring maintenance billing, one-off service
-- history, and a client notes timeline (mirrors lead_notes).
--
-- No plans table: plan info is a denormalized snapshot (plan_key/plan_name),
-- matching how leads.budget_range is already free text with no FK — the only
-- source of plan data today is the static src/data/pricing.js module.

-- ---------- Clients ----------

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  address text,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_created_at_idx on clients (created_at desc);
create index if not exists clients_email_idx on clients (email);
create index if not exists clients_search_idx on clients
  using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(company, '') || ' ' || coalesce(email, '')));

drop trigger if exists clients_set_updated_at on clients;
create trigger clients_set_updated_at
before update on clients
for each row execute function set_updated_at();

-- ---------- Quotations ----------

create table if not exists quotations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  plan_key text,
  plan_name text,
  amount numeric(12, 2) not null default 0,
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quotations_client_idx on quotations (client_id);
create index if not exists quotations_status_idx on quotations (status);

drop trigger if exists quotations_set_updated_at on quotations;
create trigger quotations_set_updated_at
before update on quotations
for each row execute function set_updated_at();

create table if not exists quotation_services (
  quotation_id uuid references quotations (id) on delete cascade,
  service_id uuid references services (id) on delete cascade,
  primary key (quotation_id, service_id)
);
create index if not exists quotation_services_service_idx on quotation_services (service_id);

-- ---------- Projects ----------

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  quotation_id uuid references quotations (id) on delete set null,
  project_name text not null,
  website_domain text,
  plan_key text,
  plan_name text,
  revisions_included integer not null default 0,
  revisions_used integer not null default 0,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'delivered', 'in_maintenance', 'on_hold', 'closed')),
  start_date date,
  delivery_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_client_idx on projects (client_id);
create index if not exists projects_status_idx on projects (status);

drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at
before update on projects
for each row execute function set_updated_at();

create table if not exists project_services (
  project_id uuid references projects (id) on delete cascade,
  service_id uuid references services (id) on delete cascade,
  primary key (project_id, service_id)
);
create index if not exists project_services_service_idx on project_services (service_id);

-- ---------- Agreements (Google Drive links only, no upload/e-sign) ----------

create table if not exists agreements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  agreement_type text not null default 'initial'
    check (agreement_type in ('initial', 'addendum', 'renewal')),
  drive_link text not null,
  signed_date date,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists agreements_client_idx on agreements (client_id);
create index if not exists agreements_project_idx on agreements (project_id);

-- ---------- Invoices (supports partial payments via invoice_payments) ----------

create sequence if not exists invoice_number_seq;

create or replace function next_invoice_number()
returns text as $$
  select 'INV-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('invoice_number_seq')::text, 4, '0');
$$ language sql;

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  invoice_number text not null unique,
  type text not null default 'other'
    check (type in ('advance', 'milestone', 'final', 'maintenance', 'other')),
  total_amount numeric(12, 2) not null,
  amount_paid numeric(12, 2) not null default 0,
  due_date date,
  paid_date date,
  payment_method text,
  status text not null default 'pending'
    check (status in ('pending', 'partial', 'paid', 'overdue')),
  drive_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoices_client_idx on invoices (client_id);
create index if not exists invoices_status_idx on invoices (status);
create index if not exists invoices_due_date_idx on invoices (due_date);

drop trigger if exists invoices_set_updated_at on invoices;
create trigger invoices_set_updated_at
before update on invoices
for each row execute function set_updated_at();

-- Append-only payment log — supports "advance now, remainder later" with
-- different dates/methods per partial payment. invoices.amount_paid/status
-- are recomputed and written back by the recording server action (kept as
-- real columns, not a view, so they stay simply queryable/filterable).
create table if not exists invoice_payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices (id) on delete cascade,
  amount numeric(12, 2) not null,
  paid_date date not null default current_date,
  payment_method text,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists invoice_payments_invoice_idx on invoice_payments (invoice_id, paid_date);

-- ---------- Maintenance subscriptions ----------

create table if not exists maintenance_subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  monthly_amount numeric(12, 2) not null,
  billing_day integer not null default 1 check (billing_day between 1 and 28),
  status text not null default 'active'
    check (status in ('active', 'paused', 'cancelled')),
  next_due_date date not null,
  last_paid_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists maintenance_client_idx on maintenance_subscriptions (client_id);
create index if not exists maintenance_next_due_idx on maintenance_subscriptions (next_due_date);

drop trigger if exists maintenance_set_updated_at on maintenance_subscriptions;
create trigger maintenance_set_updated_at
before update on maintenance_subscriptions
for each row execute function set_updated_at();

-- ---------- Service history (one-off/add-on services, past orders) ----------

create table if not exists service_history (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  service_name text not null,
  amount numeric(12, 2),
  date date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists service_history_client_idx on service_history (client_id);

-- ---------- Client notes timeline (mirrors lead_notes exactly) ----------

create table if not exists client_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  author_id uuid references auth.users (id),
  author_email text,
  note text not null,
  created_at timestamptz not null default now()
);
create index if not exists client_notes_client_idx on client_notes (client_id, created_at);

-- ---------- Row Level Security ----------
-- No public-write use case here (unlike leads) — every table is fully
-- authenticated + is_admin() gated, no anon policies.

alter table clients enable row level security;
alter table quotations enable row level security;
alter table quotation_services enable row level security;
alter table projects enable row level security;
alter table project_services enable row level security;
alter table agreements enable row level security;
alter table invoices enable row level security;
alter table invoice_payments enable row level security;
alter table maintenance_subscriptions enable row level security;
alter table service_history enable row level security;
alter table client_notes enable row level security;

create policy "admins manage clients" on clients for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage quotations" on quotations for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage quotation_services" on quotation_services for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage projects" on projects for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage project_services" on project_services for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage agreements" on agreements for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage invoices" on invoices for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage invoice_payments" on invoice_payments for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage maintenance_subscriptions" on maintenance_subscriptions for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage service_history" on service_history for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage client_notes" on client_notes for all to authenticated using (is_admin()) with check (is_admin());

-- ---------- Dashboard aggregate view ----------
-- security_invoker so it runs under the querying admin's own RLS grants.

create or replace view client_summary
with (security_invoker = on) as
select
  c.id as client_id,
  coalesce(sum(i.total_amount - i.amount_paid) filter (where i.status <> 'paid'), 0) as amount_due,
  count(distinct i.id) filter (where i.status <> 'paid' and i.due_date < current_date) as overdue_invoice_count,
  min(ms.next_due_date) filter (where ms.status = 'active') as next_maintenance_due,
  count(distinct p.id) filter (where p.revisions_included > 0 and p.revisions_used >= p.revisions_included) as projects_revisions_exceeded
from clients c
left join invoices i on i.client_id = c.id
left join maintenance_subscriptions ms on ms.client_id = c.id
left join projects p on p.client_id = c.id
group by c.id;
