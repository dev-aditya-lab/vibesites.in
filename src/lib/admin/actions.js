"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin, requireSuperAdmin } from "@/lib/admin/auth";

// ---------- Auth ----------

export async function signIn(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const next = formData.get("next")?.toString() || "/admin";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    redirect(`/admin/login?error=${encodeURIComponent("Invalid email or password.")}`);
  }

  const { data: profile } = await supabase.from("profiles").select("id").eq("id", data.user.id).single();
  if (!profile) {
    await supabase.auth.signOut();
    redirect(`/admin/login?error=${encodeURIComponent("This account has no admin access.")}`);
  }

  await supabase.from("profiles").update({ last_login_at: new Date().toISOString() }).eq("id", data.user.id);

  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Lead mutations ----------

export async function updateLeadStatus(leadId, status) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", leadId);
  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
}

export async function bulkUpdateStatus(leadIds, status) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).in("id", leadIds);
  if (error) throw error;
  revalidatePath("/admin/leads");
}

export async function addLeadNote(leadId, note) {
  const admin = await requireAdmin();
  if (!note?.trim()) return;
  const supabase = await createClient();
  const { error } = await supabase
    .from("lead_notes")
    .insert({ lead_id: leadId, author_id: admin.id, author_email: admin.email, note: note.trim() });
  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addLeadService(leadId, serviceId) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("lead_services").insert({ lead_id: leadId, service_id: serviceId });
  if (error && error.code !== "23505") throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function removeLeadService(leadId, serviceId) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("lead_services").delete().eq("lead_id", leadId).eq("service_id", serviceId);
  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addLeadLocation(leadId, name) {
  await requireAdmin();
  if (!name?.trim()) return;
  const supabase = await createClient();
  const trimmed = name.trim();
  let { data: location } = await supabase.from("locations").select("id").eq("name", trimmed).maybeSingle();
  if (!location) {
    const { data: created, error: createError } = await supabase
      .from("locations")
      .insert({ name: trimmed })
      .select("id")
      .single();
    if (createError) throw createError;
    location = created;
  }
  const { error } = await supabase.from("lead_locations").insert({ lead_id: leadId, location_id: location.id });
  if (error && error.code !== "23505") throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function removeLeadLocation(leadId, locationId) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("lead_locations").delete().eq("lead_id", leadId).eq("location_id", locationId);
  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addLeadTag(leadId, name) {
  await requireAdmin();
  if (!name?.trim()) return;
  const supabase = await createClient();
  const trimmed = name.trim();
  let { data: tag } = await supabase.from("tags").select("id").eq("name", trimmed).maybeSingle();
  if (!tag) {
    const { data: created, error: createError } = await supabase
      .from("tags")
      .insert({ name: trimmed })
      .select("id")
      .single();
    if (createError) throw createError;
    tag = created;
  }
  const { error } = await supabase.from("lead_tags").insert({ lead_id: leadId, tag_id: tag.id });
  if (error && error.code !== "23505") throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function removeLeadTag(leadId, tagId) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("lead_tags").delete().eq("lead_id", leadId).eq("tag_id", tagId);
  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function bulkAddTag(leadIds, name) {
  await requireAdmin();
  if (!name?.trim()) return;
  const supabase = await createClient();
  const trimmed = name.trim();
  let { data: tag } = await supabase.from("tags").select("id").eq("name", trimmed).maybeSingle();
  if (!tag) {
    const { data: created, error: createError } = await supabase
      .from("tags")
      .insert({ name: trimmed })
      .select("id")
      .single();
    if (createError) throw createError;
    tag = created;
  }
  const rows = leadIds.map((leadId) => ({ lead_id: leadId, tag_id: tag.id }));
  await supabase.from("lead_tags").insert(rows);
  revalidatePath("/admin/leads");
}

export async function deleteLeads(leadIds) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().in("id", leadIds);
  if (error) throw error;
  revalidatePath("/admin/leads");
}

// ---------- Admin management (super_admin only) ----------

export async function createAdminAccount({ email, password, role }) {
  await requireSuperAdmin();
  if (!email?.trim() || !password || password.length < 8) {
    throw new Error("Provide a valid email and a password of at least 8 characters.");
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true,
  });
  if (error) throw error;

  const supabase = await createClient();
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: data.user.id, email: email.trim(), role: role === "super_admin" ? "super_admin" : "admin" });
  if (profileError) throw profileError;

  revalidatePath("/admin/admins");
}
