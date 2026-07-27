"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { buildWhatsAppLink } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

const budgets = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+", "Not sure yet"];

const inputClasses =
  "w-full rounded-xl border border-ink-300 bg-cream-50 px-4 py-3.5 text-ink-900 placeholder:text-ink-400 transition-colors duration-300 focus:border-rust-500 focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Hi Vibesites! I'd like to talk about a project.`,
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.service && `Service: ${form.service}`,
      form.budget && `Budget: ${form.budget}`,
      form.message && `Details: ${form.message}`,
    ].filter(Boolean);
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      className="flex flex-col gap-5 rounded-2xl border border-ink-200 bg-cream-50 p-7 shadow-soft-md sm:p-9"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-700">
            Your name
          </label>
          <input id="name" required value={form.name} onChange={update("name")} placeholder="Jordan Lee" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-700">
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-ink-700">
            Service you need
          </label>
          <select id="service" value={form.service} onChange={update("service")} className={inputClasses}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-ink-700">
            Estimated budget
          </label>
          <select id="budget" value={form.budget} onChange={update("budget")} className={inputClasses}>
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
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-700">
          Tell us about your project
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="What are you building, and what does success look like?"
          className={inputClasses}
        />
      </div>

      <Button type="submit" size="lg" icon={false} className="mt-2 w-full sm:w-fit">
        <Send className="size-4" strokeWidth={2.25} />
        Send via WhatsApp
      </Button>
      <p className="text-xs text-ink-500">
        Submitting opens WhatsApp with your details pre-filled — nothing is sent until you hit send there.
      </p>
    </motion.form>
  );
}
