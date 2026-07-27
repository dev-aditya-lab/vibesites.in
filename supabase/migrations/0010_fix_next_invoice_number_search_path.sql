-- Pin search_path on next_invoice_number (flagged by the security advisor),
-- matching the is_admin()/is_super_admin() convention.

create or replace function next_invoice_number()
returns text as $$
  select 'INV-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('invoice_number_seq')::text, 4, '0');
$$ language sql set search_path = public;
