import { clsx } from "clsx";

/** Merge class names, filtering falsy values. */
export function cn(...inputs) {
  return clsx(...inputs);
}

/** Slugify a string for use in URLs. */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
