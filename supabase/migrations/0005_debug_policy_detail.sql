create or replace function debug_leads_policies()
returns jsonb as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'policyname', policyname,
    'permissive', permissive,
    'roles', roles,
    'cmd', cmd,
    'qual', qual,
    'with_check', with_check
  )), '[]'::jsonb)
  from pg_policies
  where tablename = 'leads';
$$ language sql stable security invoker;

grant execute on function debug_leads_policies() to anon, authenticated;
