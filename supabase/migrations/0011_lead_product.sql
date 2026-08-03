-- Tags which Vibesites-owned product a lead came from (e.g. 'rewardloop'),
-- distinct from form_type (contact vs quote) and free-text source_page.
-- Nullable/unconstrained on purpose: existing agency leads have no product,
-- and new products can start using a slug here without a migration.
alter table leads
  add column if not exists product text;

create index if not exists leads_product_idx on leads (product);
