-- Service/location breakdown counts should reflect leads still worth acting
-- on. Without this, closing a lead never changed the number shown next to
-- its service/location, which read as if closing had no effect — confusing.
-- Now closed/not_interested leads drop out of the count.

create or replace view service_lead_counts
with (security_invoker = on) as
select
  s.id,
  s.slug,
  s.name,
  s.category,
  count(ls.lead_id) filter (where l.status not in ('closed', 'not_interested')) as lead_count
from services s
left join lead_services ls on ls.service_id = s.id
left join leads l on l.id = ls.lead_id
group by s.id, s.slug, s.name, s.category;

create or replace view location_lead_counts
with (security_invoker = on) as
select
  loc.id,
  loc.name,
  count(ll.lead_id) filter (where l.status not in ('closed', 'not_interested')) as lead_count
from locations loc
left join lead_locations ll on ll.location_id = loc.id
left join leads l on l.id = ll.lead_id
group by loc.id, loc.name;
