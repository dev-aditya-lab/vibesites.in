-- Distinguishes which public form a lead came from (Contact vs Quote),
-- independent of source_page (a quote can be submitted from /pricing or any
-- /services/[slug] page — form_type is what the admin panel filters/groups on).

alter table leads
  add column if not exists form_type text not null default 'quote'
  check (form_type in ('contact', 'quote'));

create index if not exists leads_form_type_idx on leads (form_type);
