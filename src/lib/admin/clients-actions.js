"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";
import { computeInvoiceStatus } from "@/lib/admin/invoice-utils";

const revalidateClient = (clientId) => {
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
};

// ---------- Clients ----------

export async function createClientRecord({ name, company, email, phone, address, source }) {
  await requireAdmin();
  if (!name?.trim()) throw new Error("Client name is required.");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: name.trim(),
      company: company?.trim() || null,
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      address: address?.trim() || null,
      source: source?.trim() || null,
    })
    .select("id")
    .single();
  if (error) throw error;
  revalidatePath("/admin/clients");
  return data.id;
}

export async function updateClientRecord(clientId, fields) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("clients").update(fields).eq("id", clientId);
  if (error) throw error;
  revalidateClient(clientId);
}

export async function addClientNote(clientId, note) {
  const admin = await requireAdmin();
  if (!note?.trim()) return;
  const supabase = await createClient();
  const { error } = await supabase
    .from("client_notes")
    .insert({ client_id: clientId, author_id: admin.id, author_email: admin.email, note: note.trim() });
  if (error) throw error;
  revalidatePath(`/admin/clients/${clientId}`);
}

// ---------- Quotations ----------

export async function createQuotation(clientId, { planKey, planName, amount, status, validUntil, notes, serviceIds }) {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotations")
    .insert({
      client_id: clientId,
      plan_key: planKey || null,
      plan_name: planName || null,
      amount: Number(amount) || 0,
      status: status || "draft",
      valid_until: validUntil || null,
      notes: notes?.trim() || null,
    })
    .select("id")
    .single();
  if (error) throw error;

  if (serviceIds?.length) {
    const rows = serviceIds.map((service_id) => ({ quotation_id: data.id, service_id }));
    await supabase.from("quotation_services").insert(rows);
  }

  revalidateClient(clientId);
  return data.id;
}

export async function updateQuotationStatus(quotationId, clientId, status) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("quotations").update({ status }).eq("id", quotationId);
  if (error) throw error;
  revalidateClient(clientId);
}

/** Converts an accepted quotation straight into a project, copying its quoted services. */
export async function convertQuotationToProject(quotationId, clientId, { projectName, websiteDomain, revisionsIncluded, startDate, deliveryDate }) {
  await requireAdmin();
  if (!projectName?.trim()) throw new Error("Project name is required.");
  const supabase = await createClient();

  const { data: quotation, error: qError } = await supabase
    .from("quotations")
    .select("id, plan_key, plan_name, quotation_services(service_id)")
    .eq("id", quotationId)
    .single();
  if (qError) throw qError;

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      client_id: clientId,
      quotation_id: quotationId,
      project_name: projectName.trim(),
      website_domain: websiteDomain?.trim() || null,
      plan_key: quotation.plan_key,
      plan_name: quotation.plan_name,
      revisions_included: Number(revisionsIncluded) || 0,
      start_date: startDate || null,
      delivery_date: deliveryDate || null,
    })
    .select("id")
    .single();
  if (error) throw error;

  const serviceIds = (quotation.quotation_services ?? []).map((qs) => qs.service_id);
  if (serviceIds.length) {
    const rows = serviceIds.map((service_id) => ({ project_id: project.id, service_id }));
    await supabase.from("project_services").insert(rows);
  }

  await supabase.from("quotations").update({ status: "accepted" }).eq("id", quotationId);

  revalidateClient(clientId);
  return project.id;
}

// ---------- Projects ----------

export async function createProject(clientId, { projectName, websiteDomain, planKey, planName, revisionsIncluded, startDate, deliveryDate, serviceIds }) {
  await requireAdmin();
  if (!projectName?.trim()) throw new Error("Project name is required.");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      client_id: clientId,
      project_name: projectName.trim(),
      website_domain: websiteDomain?.trim() || null,
      plan_key: planKey || null,
      plan_name: planName || null,
      revisions_included: Number(revisionsIncluded) || 0,
      start_date: startDate || null,
      delivery_date: deliveryDate || null,
    })
    .select("id")
    .single();
  if (error) throw error;

  if (serviceIds?.length) {
    const rows = serviceIds.map((service_id) => ({ project_id: data.id, service_id }));
    await supabase.from("project_services").insert(rows);
  }

  revalidateClient(clientId);
  return data.id;
}

export async function updateProjectStatus(projectId, clientId, status) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update({ status }).eq("id", projectId);
  if (error) throw error;
  revalidateClient(clientId);
}

export async function updateProjectDetails(projectId, clientId, fields) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update(fields).eq("id", projectId);
  if (error) throw error;
  revalidateClient(clientId);
}

export async function incrementRevisionsUsed(projectId, clientId, delta) {
  await requireAdmin();
  const supabase = await createClient();
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("revisions_used")
    .eq("id", projectId)
    .single();
  if (fetchError) throw fetchError;

  const nextValue = Math.max(0, (project.revisions_used ?? 0) + delta);
  const { error } = await supabase.from("projects").update({ revisions_used: nextValue }).eq("id", projectId);
  if (error) throw error;
  revalidateClient(clientId);
}

// ---------- Agreements ----------

export async function addAgreement(clientId, { projectId, agreementType, driveLink, signedDate, notes }) {
  await requireAdmin();
  if (!driveLink?.trim()) throw new Error("A Google Drive link is required.");
  const supabase = await createClient();
  const { error } = await supabase.from("agreements").insert({
    client_id: clientId,
    project_id: projectId || null,
    agreement_type: agreementType || "initial",
    drive_link: driveLink.trim(),
    signed_date: signedDate || null,
    notes: notes?.trim() || null,
  });
  if (error) throw error;
  revalidateClient(clientId);
}

export async function deleteAgreement(agreementId, clientId) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("agreements").delete().eq("id", agreementId);
  if (error) throw error;
  revalidateClient(clientId);
}

// ---------- Invoices & payments ----------

export async function createInvoice(clientId, { projectId, type, totalAmount, dueDate, driveLink }) {
  await requireAdmin();
  const total = Number(totalAmount);
  if (!total || total <= 0) throw new Error("Total amount must be greater than zero.");
  const supabase = await createClient();

  const { data: numberRow, error: numberError } = await supabase.rpc("next_invoice_number");
  if (numberError) throw numberError;

  const status = computeInvoiceStatus({ totalAmount: total, amountPaid: 0, dueDate: dueDate || null });

  const { error } = await supabase.from("invoices").insert({
    client_id: clientId,
    project_id: projectId || null,
    invoice_number: numberRow,
    type: type || "other",
    total_amount: total,
    amount_paid: 0,
    due_date: dueDate || null,
    status,
    drive_link: driveLink?.trim() || null,
  });
  if (error) throw error;
  revalidateClient(clientId);
}

export async function recordInvoicePayment(invoiceId, clientId, { amount, paidDate, paymentMethod, note }) {
  await requireAdmin();
  const amt = Number(amount);
  if (!amt || amt <= 0) throw new Error("Payment amount must be greater than zero.");
  const supabase = await createClient();

  const { error: paymentError } = await supabase.from("invoice_payments").insert({
    invoice_id: invoiceId,
    amount: amt,
    paid_date: paidDate || new Date().toISOString().slice(0, 10),
    payment_method: paymentMethod?.trim() || null,
    note: note?.trim() || null,
  });
  if (paymentError) throw paymentError;

  const { data: invoice, error: fetchError } = await supabase
    .from("invoices")
    .select("total_amount, due_date, invoice_payments(amount)")
    .eq("id", invoiceId)
    .single();
  if (fetchError) throw fetchError;

  const amountPaid = (invoice.invoice_payments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
  const status = computeInvoiceStatus({ totalAmount: invoice.total_amount, amountPaid, dueDate: invoice.due_date });

  const { error } = await supabase
    .from("invoices")
    .update({
      amount_paid: amountPaid,
      status,
      paid_date: status === "paid" ? paidDate || new Date().toISOString().slice(0, 10) : null,
      payment_method: paymentMethod?.trim() || null,
    })
    .eq("id", invoiceId);
  if (error) throw error;

  revalidateClient(clientId);
  revalidatePath("/admin/payments");
}

// ---------- Maintenance subscriptions ----------

export async function createMaintenanceSubscription(clientId, { projectId, monthlyAmount, billingDay, nextDueDate }) {
  await requireAdmin();
  const amount = Number(monthlyAmount);
  if (!amount || amount <= 0) throw new Error("Monthly amount must be greater than zero.");
  if (!nextDueDate) throw new Error("Next due date is required.");
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_subscriptions").insert({
    client_id: clientId,
    project_id: projectId || null,
    monthly_amount: amount,
    billing_day: Number(billingDay) || 1,
    next_due_date: nextDueDate,
  });
  if (error) throw error;
  revalidateClient(clientId);
  revalidatePath("/admin/maintenance");
}

export async function updateMaintenanceStatus(subscriptionId, clientId, status) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_subscriptions").update({ status }).eq("id", subscriptionId);
  if (error) throw error;
  revalidateClient(clientId);
  revalidatePath("/admin/maintenance");
}

/** Marks the current billing cycle paid and rolls next_due_date forward by one month. */
export async function markMaintenanceCyclePaid(subscriptionId, clientId) {
  await requireAdmin();
  const supabase = await createClient();
  const { data: sub, error: fetchError } = await supabase
    .from("maintenance_subscriptions")
    .select("next_due_date")
    .eq("id", subscriptionId)
    .single();
  if (fetchError) throw fetchError;

  const base = new Date(sub.next_due_date);
  const nextDue = new Date(base);
  nextDue.setMonth(nextDue.getMonth() + 1);

  const today = new Date().toISOString().slice(0, 10);
  const { error } = await supabase
    .from("maintenance_subscriptions")
    .update({ last_paid_date: today, next_due_date: nextDue.toISOString().slice(0, 10) })
    .eq("id", subscriptionId);
  if (error) throw error;

  revalidateClient(clientId);
  revalidatePath("/admin/maintenance");
}

// ---------- Service history ----------

export async function addServiceHistoryEntry(clientId, { projectId, serviceName, amount, date, notes }) {
  await requireAdmin();
  if (!serviceName?.trim()) throw new Error("Service name is required.");
  const supabase = await createClient();
  const { error } = await supabase.from("service_history").insert({
    client_id: clientId,
    project_id: projectId || null,
    service_name: serviceName.trim(),
    amount: amount ? Number(amount) : null,
    date: date || new Date().toISOString().slice(0, 10),
    notes: notes?.trim() || null,
  });
  if (error) throw error;
  revalidateClient(clientId);
}
