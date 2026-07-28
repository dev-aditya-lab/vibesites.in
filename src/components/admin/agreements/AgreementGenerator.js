"use client";

import { useState } from "react";
import { Printer, RotateCcw } from "lucide-react";
import {
  AGREEMENT_FIELD_GROUPS,
  AGREEMENT_FIELD_DEFAULTS,
  AGREEMENT_SECTIONS,
  COMMERCIAL_SUMMARY_ROWS,
  CHARGEABLE_ITEMS_ROWS,
  renderRich,
} from "@/data/agreementTemplate";

const inputClasses =
  "w-full rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

function ScheduleRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-2">
      <span className="text-sm text-ink-600">{label}</span>
      <span className="shrink-0 text-right text-sm font-semibold text-ink-950">{value}</span>
    </div>
  );
}

function SummaryRow({ row, values }) {
  const raw = values[row.key];
  const value = raw && String(raw).trim() ? `${row.prefix || ""}${raw}${row.suffix || ""}` : "—";
  return <ScheduleRow label={row.label} value={value} />;
}

function ChargeableRow({ row, values }) {
  const raw = values[row.key];
  const value = raw && String(raw).trim() ? `₹${raw}${row.suffix || ""}` : "—";
  return <ScheduleRow label={row.label} value={value} />;
}

function PartyBox({ heading, name, address, email, phone, gstin, rep, title }) {
  return (
    <div className="rounded-md border border-ink-300 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">{heading}</p>
      <p className="mt-1.5 text-sm font-semibold text-ink-950">{name}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-600">{address}</p>
      <p className="mt-1 text-xs text-ink-600">{email}</p>
      <p className="text-xs text-ink-600">{phone}</p>
      <p className="text-xs text-ink-600">GSTIN: {gstin}</p>
      <p className="mt-2 text-xs text-ink-700">
        Represented by: {rep} ({title})
      </p>
    </div>
  );
}

function SignatureBlock({ heading, name, title, place, agreementDate }) {
  return (
    <div className="print:break-inside-avoid">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">{heading}</p>
      <div className="mt-10 border-b border-ink-500" />
      <p className="mt-1 text-xs text-ink-500">Signature</p>
      <p className="mt-3 text-sm text-ink-900">Name: {name}</p>
      <p className="text-sm text-ink-900">Designation: {title}</p>
      <p className="text-sm text-ink-900">Place: {place}</p>
      <p className="text-sm text-ink-900">Date: {agreementDate}</p>
    </div>
  );
}

function WitnessBlock({ label, details }) {
  return (
    <div className="print:break-inside-avoid">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">{label}</p>
      <div className="mt-8 border-b border-ink-500" />
      <p className="mt-1 text-xs text-ink-500">Signature</p>
      <p className="mt-3 text-sm text-ink-900">Name &amp; address: {details}</p>
    </div>
  );
}

export default function AgreementGenerator() {
  const [values, setValues] = useState(AGREEMENT_FIELD_DEFAULTS);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const reset = () => setValues(AGREEMENT_FIELD_DEFAULTS);
  const print = () => window.print();

  const v = (key) => (values[key] && String(values[key]).trim() ? values[key] : `[${key}]`);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr] print:block">
      {/* print:block fully drops the grid (and any reserved track width for the
          hidden .no-print column) so the printed document uses the page's full
          content width, regardless of how the print engine sizes its viewport. */}
      <div className="no-print flex flex-col gap-5">
        <div className="flex gap-2">
          <button
            onClick={print}
            className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700"
          >
            <Printer className="size-4" />
            Save as PDF
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md border border-ink-300 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-cream-200"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        {AGREEMENT_FIELD_GROUPS.map((group) => (
          <div key={group.label} className="rounded-lg border border-ink-200 bg-cream-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">{group.label}</p>
            <div className="flex flex-col gap-3">
              {group.fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-xs text-ink-500">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    value={values[field.key] ?? ""}
                    onChange={set(field.key)}
                    placeholder={field.label}
                    className={inputClasses}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="print-area rounded-lg border border-ink-200 bg-cream-50 p-8 print:p-0 sm:p-10">
        <article className="mx-auto max-w-3xl text-ink-800 print:max-w-none">
          {/* Letterhead */}
          <header className="flex items-start justify-between gap-4 border-b-2 border-ink-900 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="/vibesites-logo-1000x1000-no-text.png"
                alt=""
                className="size-12 shrink-0 object-contain"
              />
              <div>
                <p className="font-display text-lg font-bold leading-tight text-ink-950">{v("agencyLegalName")}</p>
                <p className="text-xs text-ink-500">
                  {v("agencyEmail")} · {v("agencyPhone")}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right text-xs text-ink-500">
              <p>Ref: {v("agreementRefNo")}</p>
              <p>Date: {v("agreementDate")}</p>
            </div>
          </header>

          <h1 className="mt-6 text-center font-display text-xl font-bold uppercase tracking-wide text-ink-950">
            Client Service Agreement
          </h1>
          <p className="mt-1 text-center text-xs text-ink-500">
            For the design and development of “{v("projectName")}”
          </p>

          {/* Parties */}
          <div className="mt-6 grid grid-cols-2 gap-4 print:break-inside-avoid">
            <PartyBox
              heading="Agency"
              name={v("agencyLegalName")}
              address={v("agencyAddress")}
              email={v("agencyEmail")}
              phone={v("agencyPhone")}
              gstin={v("agencyGstin")}
              rep={v("agencyRepName")}
              title={v("agencyRepTitle")}
            />
            <PartyBox
              heading="Client"
              name={v("clientName")}
              address={v("clientAddress")}
              email={v("clientEmail")}
              phone={v("clientPhone")}
              gstin={v("clientGstin")}
              rep={v("clientRepName")}
              title={v("clientRepTitle")}
            />
          </div>

          {/* Commercial summary */}
          <div className="mt-6 rounded-md border border-teal-700/40 bg-teal-500/5 p-4 print:break-inside-avoid">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Commercial Summary</p>
            <div className="mt-1 divide-y divide-ink-200">
              {COMMERCIAL_SUMMARY_ROWS.map((row) => (
                <SummaryRow key={row.key} row={row} values={values} />
              ))}
            </div>
          </div>

          {/* Chargeable items schedule */}
          <div className="mt-6 print:break-inside-avoid">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Schedule of Additional / Chargeable Items
            </p>
            <div className="mt-1 divide-y divide-ink-200">
              {CHARGEABLE_ITEMS_ROWS.map((row) => (
                <ChargeableRow key={row.key} row={row} values={values} />
              ))}
            </div>
          </div>

          {/* Numbered clauses */}
          <div className="mt-8 flex flex-col gap-6">
            {AGREEMENT_SECTIONS.map((section) => (
              <div key={section.title} className="print:break-inside-avoid">
                <h2 className="font-display text-[15px] font-semibold text-ink-900">{section.title}</h2>
                <div className="mt-2 flex flex-col gap-2">
                  {section.body.map((block, i) =>
                    typeof block === "string" ? (
                      <p key={i} className="text-sm leading-relaxed text-ink-700">
                        {renderRich(block, values)}
                      </p>
                    ) : block.ol ? (
                      <ol key={i} className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-700">
                        {block.ol.map((item, j) => (
                          <li key={j}>{renderRich(item, values)}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul key={i} className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-700">
                        {block.ul.map((item, j) => (
                          <li key={j}>{renderRich(item, values)}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Signatures */}
          <div className="mt-10 border-t border-ink-300 pt-8 print:break-inside-avoid">
            <h2 className="font-display text-[15px] font-semibold text-ink-900">25. Signatures</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-10">
              <SignatureBlock
                heading={`For ${v("agencyLegalName")}`}
                name={v("agencyRepName")}
                title={v("agencyRepTitle")}
                place={v("agencyPlace")}
                agreementDate={v("agreementDate")}
              />
              <SignatureBlock
                heading={`For ${v("clientName")}`}
                name={v("clientRepName")}
                title={v("clientRepTitle")}
                place={v("clientPlace")}
                agreementDate={v("agreementDate")}
              />
            </div>
            <div className="mt-10 grid grid-cols-2 gap-10">
              <WitnessBlock label="Witness 1" details={v("witness1Details")} />
              <WitnessBlock label="Witness 2" details={v("witness2Details")} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
