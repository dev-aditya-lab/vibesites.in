create or replace function debug_direct_insert()
returns jsonb as $$
declare
  new_id uuid;
  err_msg text;
begin
  begin
    insert into leads (name) values ('rpc-direct-test') returning id into new_id;
    return jsonb_build_object('ok', true, 'id', new_id, 'current_user', current_user::text);
  exception when others then
    get stacked diagnostics err_msg = message_text;
    return jsonb_build_object('ok', false, 'error', err_msg, 'sqlstate', sqlstate, 'current_user', current_user::text);
  end;
end;
$$ language plpgsql security invoker;

grant execute on function debug_direct_insert() to anon, authenticated;
