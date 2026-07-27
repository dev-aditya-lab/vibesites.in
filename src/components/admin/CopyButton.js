"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Small inline copy-to-clipboard control — for phone/WhatsApp/email fields in tables and detail views. */
export default function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard API unavailable (non-secure context) — silently no-op.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied" : label ? `Copy ${label}` : "Copy"}
      aria-label={label ? `Copy ${label}` : "Copy"}
      className="inline-flex shrink-0 items-center justify-center rounded p-0.5 text-ink-400 hover:text-teal-600"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}
