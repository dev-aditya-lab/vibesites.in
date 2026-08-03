import { LEAD_STATUSES, FORM_TYPES, PRODUCTS } from "@/lib/admin/constants";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

export default function LeadsFilterBar({ services, locations, tags, current }) {
  return (
    <form method="GET" className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-200 bg-cream-50 p-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="q" className="text-xs font-medium text-ink-500">
          Search
        </label>
        <input
          id="q"
          name="q"
          type="text"
          defaultValue={current.q}
          placeholder="Name, email, company…"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="formType" className="text-xs font-medium text-ink-500">
          Form
        </label>
        <select id="formType" name="formType" defaultValue={current.formType} className={inputClasses}>
          <option value="">Contact + Quote</option>
          {FORM_TYPES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product" className="text-xs font-medium text-ink-500">
          Product
        </label>
        <select id="product" name="product" defaultValue={current.product} className={inputClasses}>
          <option value="">All products</option>
          {PRODUCTS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-xs font-medium text-ink-500">
          Status
        </label>
        <select id="status" name="status" defaultValue={current.status} className={inputClasses}>
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="service" className="text-xs font-medium text-ink-500">
          Service
        </label>
        <select id="service" name="service" defaultValue={current.service} className={inputClasses}>
          <option value="">All services</option>
          {services.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-xs font-medium text-ink-500">
          Location
        </label>
        <select id="location" name="location" defaultValue={current.location} className={inputClasses}>
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l.id} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tag" className="text-xs font-medium text-ink-500">
          Tag
        </label>
        <select id="tag" name="tag" defaultValue={current.tag} className={inputClasses}>
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sort" className="text-xs font-medium text-ink-500">
          Sort
        </label>
        <select id="sort" name="sort" defaultValue={current.sort} className={inputClasses}>
          <option value="created_at.desc">Newest first</option>
          <option value="created_at.asc">Oldest first</option>
          <option value="name.asc">Name A–Z</option>
        </select>
      </div>

      <button type="submit" className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700">
        Apply filters
      </button>
      {(current.q || current.status || current.service || current.location || current.tag || current.formType || current.product) && (
        <a href="/admin/leads" className="rounded-md border border-ink-300 px-4 py-2 text-sm text-ink-700 hover:bg-cream-200">
          Clear
        </a>
      )}
    </form>
  );
}
