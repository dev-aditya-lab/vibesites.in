"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { submitLead } from "@/lib/leads";
import { EASE_PREMIUM } from "@/lib/motion";

const budgets = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹75,000", "₹75,000+", "Not sure yet"];

const inputClasses =
  "w-full rounded-xl border border-ink-300 bg-cream-50 px-4 py-3.5 text-ink-900 placeholder:text-ink-400 transition-colors duration-300 focus:border-teal-500 focus:outline-none";

const labelClasses = "mb-2 block text-sm font-medium text-ink-700";

/**
 * Project-quote form — used on Pricing and service-detail pages. Carries the
 * fields an estimate actually needs (service, budget, company, location,
 * WhatsApp) that the general ContactForm deliberately leaves out.
 */
export default function QuoteForm({ defaultServiceSlug = "", initialMessage = "", sourcePage, className }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    company: "",
    service: defaultServiceSlug,
    locationText: "",
    message: initialMessage,
    budgetRange: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialMessage) setForm((f) => ({ ...f, message: initialMessage }));
  }, [initialMessage]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim() && !form.phone.trim() && !form.whatsappNumber.trim()) {
      next.contact = "Add at least one way to reach you — email, phone, or WhatsApp number.";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email doesn't look right.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        whatsappNumber: form.whatsappNumber,
        company: form.company,
        locationText: form.locationText,
        message: form.message,
        budgetRange: form.budgetRange,
        serviceSlugs: form.service ? [form.service] : [],
        sourcePage,
        formType: "quote",
      });
      setStatus("success");
    } catch (err) {
      console.error("Quote submission failed:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
        className={`flex flex-col items-center justify-center gap-4 rounded-2xl border border-teal-300 bg-teal-50 p-8 text-center sm:p-10 ${className ?? ""}`}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            stroke="var(--color-teal-500)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          />
          <motion.path
            d="M17 28.5 L24.5 36 L39 20"
            stroke="var(--color-teal-500)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM, delay: 0.45 }}
          />
        </svg>
        <div>
          <h3 className="font-display text-xl text-ink-900">Got it — thank you.</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            We'll review your project details and follow up with clear scope and pricing.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      className={`flex flex-col gap-5 rounded-2xl border border-ink-200 bg-cream-50 p-7 shadow-soft-md sm:p-9 ${className ?? ""}`}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your name
          </label>
          <input id="name" required value={form.name} onChange={update("name")} placeholder="Jordan Lee" className={inputClasses} />
          {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="jordan@company.com"
            className={inputClasses}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone number
          </label>
          <input id="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+1 555 123 4567" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="whatsappNumber" className={labelClasses}>
            WhatsApp number
          </label>
          <input
            id="whatsappNumber"
            type="tel"
            value={form.whatsappNumber}
            onChange={update("whatsappNumber")}
            placeholder="If different from phone"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company / brand
          </label>
          <input id="company" value={form.company} onChange={update("company")} placeholder="Optional" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="locationText" className={labelClasses}>
            City / location
          </label>
          <input id="locationText" value={form.locationText} onChange={update("locationText")} placeholder="Optional" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={labelClasses}>
            Service you need
          </label>
          <select id="service" value={form.service} onChange={update("service")} className={inputClasses}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>
            Estimated budget
          </label>
          <select id="budget" value={form.budgetRange} onChange={update("budgetRange")} className={inputClasses}>
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Tell us about your project
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="What are you building, and what does success look like?"
          className={inputClasses}
        />
      </div>

      <AnimatePresence>
        {(errors.contact || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>
              {errors.contact ||
                "Something went wrong sending that. Please try again, or message us on WhatsApp instead."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" icon={false} disabled={status === "submitting"} className="mt-2 w-full sm:w-fit">
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" strokeWidth={2.25} />}
        {status === "submitting" ? "Sending…" : "Get a quote"}
      </Button>
    </motion.form>
  );
}
