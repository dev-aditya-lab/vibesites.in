import { createClient } from "@/lib/supabase/client";

/**
 * Inserts a lead + its service tags. Runs entirely client-side against the
 * publishable (anon) key — RLS on `leads`/`lead_services` allows public
 * INSERT only, no SELECT, so this can never read back other people's leads.
 *
 * The id is generated here (not left to the column default) because Postgres
 * RLS treats `INSERT ... RETURNING` as requiring a SELECT policy too — and
 * anon intentionally has none. Supplying the id upfront means we never need
 * to read the row back to link `lead_services`.
 */
export async function submitLead({
  name,
  email,
  phone,
  whatsappNumber,
  company,
  locationText,
  message,
  budgetRange,
  serviceSlugs = [],
  sourcePage,
  formType = "quote",
  product,
}) {
  const supabase = createClient();
  const leadId = crypto.randomUUID();

  const { error: leadError } = await supabase.from("leads").insert({
    id: leadId,
    name,
    email: email || null,
    phone: phone || null,
    whatsapp_number: whatsappNumber || null,
    company: company || null,
    location_text: locationText || null,
    message: message || null,
    budget_range: budgetRange || null,
    source_page: sourcePage || null,
    form_type: formType,
    product: product || null,
  });

  if (leadError) throw leadError;

  const slugs = serviceSlugs.filter(Boolean);
  if (slugs.length > 0) {
    const { data: matchedServices, error: servicesError } = await supabase
      .from("services")
      .select("id")
      .in("slug", slugs);

    if (!servicesError && matchedServices?.length) {
      const rows = matchedServices.map((service) => ({ lead_id: leadId, service_id: service.id }));
      await supabase.from("lead_services").insert(rows);
    }
  }

  return { id: leadId };
}
