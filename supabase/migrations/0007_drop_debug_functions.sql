-- Removes the temporary diagnostic functions used to trace the anon-insert
-- RLS/RETURNING issue (see submitLead in src/lib/leads.js for the fix).
drop function if exists debug_whoami();
drop function if exists debug_leads_policies();
drop function if exists debug_direct_insert();
