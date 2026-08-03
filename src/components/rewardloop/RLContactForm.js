"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import RLButton from "./RLButton";
import { submitLead } from "@/lib/leads";
import { EASE_PREMIUM } from "@/lib/motion";

const inputClasses =
  "w-full rounded-xl border border-black/10 bg-blush-50 px-4 py-3.5 text-[#1a1114] placeholder:text-[#1a1114]/35 transition-colors duration-300 focus:border-brand-500 focus:outline-none";

const labelClasses = "mb-2 block text-sm font-semibold text-[#1a1114]/75";

export default function RLContactForm({ className }) {
  const [form, setForm] = useState({ name: "", restaurant: "", phone: "", city: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.restaurant.trim()) next.restaurant = "Please enter your restaurant's name.";
    if (!form.phone.trim()) next.phone = "Add a phone or WhatsApp number so we can reach you.";
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
        phone: form.phone,
        company: form.restaurant,
        locationText: form.city,
        message: form.message ? `[RewardLoop demo request] ${form.message}` : "[RewardLoop demo request]",
        sourcePage: "/vibeproducts/rewardLoop/contact",
        formType: "contact",
        product: "rewardloop",
      });
      setStatus("success");
    } catch (err) {
      console.error("RewardLoop demo request failed:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
        className={`flex flex-col items-center justify-center gap-4 rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center sm:p-10 ${className ?? ""}`}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            stroke="var(--color-brand-600)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          />
          <motion.path
            d="M17 28.5 L24.5 36 L39 20"
            stroke="var(--color-brand-600)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM, delay: 0.45 }}
          />
        </svg>
        <div>
          <h3 className="font-display text-xl font-extrabold text-[#1a1114]">Got it — thank you.</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1a1114]/65">
            Our team will reach out within 24 hours to set up RewardLoop for your restaurant.
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
      className={`flex flex-col gap-5 rounded-3xl border border-black/5 bg-white p-7 shadow-rl-md sm:p-9 ${className ?? ""}`}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="restaurant" className={labelClasses}>
            Restaurant name
          </label>
          <input
            id="restaurant"
            required
            value={form.restaurant}
            onChange={update("restaurant")}
            placeholder="Spice House"
            className={inputClasses}
          />
          {errors.restaurant && <p className="mt-1.5 text-xs text-brand-600">{errors.restaurant}</p>}
        </div>
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your name
          </label>
          <input id="name" required value={form.name} onChange={update("name")} placeholder="Rahul Sharma" className={inputClasses} />
          {errors.name && <p className="mt-1.5 text-xs text-brand-600">{errors.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone / WhatsApp
          </label>
          <input id="phone" type="tel" required value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" className={inputClasses} />
          {errors.phone && <p className="mt-1.5 text-xs text-brand-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="city" className={labelClasses}>
            City
          </label>
          <input id="city" value={form.city} onChange={update("city")} placeholder="Mumbai" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Tell us about your restaurant (optional)
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="How many outlets, what reward you'd like to offer, etc."
          className={inputClasses}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>Something went wrong sending that. Please try again, or message us on WhatsApp instead.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <RLButton type="submit" size="lg" icon={false} disabled={status === "submitting"} className="mt-2 w-full sm:w-fit">
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" strokeWidth={2.25} />}
        {status === "submitting" ? "Sending…" : "Request a Demo"}
      </RLButton>
    </motion.form>
  );
}
