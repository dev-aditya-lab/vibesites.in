-- Temporary diagnostic function, removed in the next migration.
create or replace function debug_whoami()
returns jsonb as $$
  select jsonb_build_object(
    'current_user', current_user::text,
    'session_user', session_user::text,
    'auth_role', auth.role(),
    'auth_uid', auth.uid(),
    'can_insert_leads', has_table_privilege('anon', 'public.leads', 'INSERT'),
    'can_select_leads', has_table_privilege('anon', 'public.leads', 'SELECT'),
    'can_insert_services', has_table_privilege('anon', 'public.services', 'INSERT'),
    'rls_enabled', (select relrowsecurity from pg_class where oid = 'public.leads'::regclass),
    'policy_count', (select count(*) from pg_policies where tablename = 'leads')
  );
$$ language sql stable security invoker;

grant execute on function debug_whoami() to anon, authenticated;
