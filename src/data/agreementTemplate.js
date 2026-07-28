// Client Service Agreement — template + placeholder field definitions.
// Used by the admin "Agreement Generator" page to render a fillable, printable contract.

export const AGREEMENT_FIELD_GROUPS = [
  {
    label: "Agency (your side)",
    fields: [
      { key: "agencyLegalName", label: "Agency legal name", default: "Vibesites" },
      { key: "agencyAddress", label: "Agency registered address" },
      { key: "agencyEmail", label: "Agency email", default: "hello@vibesites.in" },
      { key: "agencyPhone", label: "Agency phone / WhatsApp" },
      { key: "agencyGstin", label: "Agency GSTIN (if applicable)" },
      { key: "agencyRepName", label: "Agency signatory — name" },
      { key: "agencyRepTitle", label: "Agency signatory — designation" },
      { key: "agencyPlace", label: "Place of signing (Agency)" },
    ],
  },
  {
    label: "Client",
    fields: [
      { key: "clientName", label: "Client full name / company name" },
      { key: "clientAddress", label: "Client address" },
      { key: "clientEmail", label: "Client email" },
      { key: "clientPhone", label: "Client phone" },
      { key: "clientGstin", label: "Client GSTIN (if applicable)" },
      { key: "clientRepName", label: "Client signatory — name" },
      { key: "clientRepTitle", label: "Client signatory — designation" },
      { key: "clientPlace", label: "Place of signing (Client)" },
    ],
  },
  {
    label: "Project scope",
    fields: [
      { key: "projectName", label: "Project / website name" },
      { key: "projectDescription", label: "Short project description" },
      { key: "planSelected", label: "Plan selected", default: "Launch" },
      { key: "pagesIncluded", label: "Pages included", default: "Up to 5" },
      { key: "revisionRoundsIncluded", label: "Revision rounds included", default: "2" },
      { key: "emailAccountsIncluded", label: "Free business email accounts included", default: "1" },
      { key: "estimatedTurnaround", label: "Estimated turnaround", default: "5 business days" },
      { key: "postLaunchSupportDays", label: "Post-launch support period (days)", default: "15" },
      { key: "maintenanceMonths", label: "Free maintenance included (months)", default: "1" },
    ],
  },
  {
    label: "Fees & payment",
    fields: [
      { key: "totalFee", label: "Total project fee (₹)" },
      { key: "advanceAmount", label: "Advance payable to start (₹, 50%)" },
      { key: "balanceAmount", label: "Balance payable on completion (₹, 50%)" },
      { key: "extraPageRate", label: "Rate per additional page (₹)" },
      { key: "extraRevisionRate", label: "Rate per additional revision round (₹)" },
      { key: "extraEmailRate", label: "Rate per additional email account (₹ / year)" },
      { key: "footerBrandingRemovalFee", label: "Fee to remove agency footer branding (₹)" },
      { key: "emailSubscriptionCost", label: "Email subscription cost after maintenance (₹ / year)" },
      { key: "minimumTenureDays", label: "Minimum mandatory service tenure (days)", default: "60" },
      { key: "lateFeeInterestRate", label: "Interest on overdue payments (% per month)", default: "1.5" },
      { key: "deliverableAcceptanceDays", label: "Deliverable review / deemed-acceptance period (days)", default: "7" },
    ],
  },
  {
    label: "Dates, reference & jurisdiction",
    fields: [
      { key: "agreementRefNo", label: "Agreement reference number" },
      { key: "effectiveDate", label: "Agreement effective date", type: "date" },
      { key: "agreementDate", label: "Date of signing", type: "date" },
      { key: "jurisdictionCity", label: "Governing law — city / state" },
      { key: "governingCountry", label: "Governing country", default: "India" },
    ],
  },
  {
    label: "Execution & witnesses",
    fields: [
      { key: "witness1Details", label: "Witness 1 — name & address" },
      { key: "witness2Details", label: "Witness 2 — name & address" },
    ],
  },
];

export const AGREEMENT_FIELDS = AGREEMENT_FIELD_GROUPS.flatMap((g) => g.fields);

export const AGREEMENT_FIELD_DEFAULTS = Object.fromEntries(
  AGREEMENT_FIELDS.map((f) => [f.key, f.default || ""])
);

const FIELD_LABELS = Object.fromEntries(AGREEMENT_FIELDS.map((f) => [f.key, f.label]));

export function fillTemplate(text, values) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const v = values?.[key];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v);
    return `[${FIELD_LABELS[key] || key}]`;
  });
}

// Renders a filled string into React nodes, turning **text** into <strong>
// so important legal/commercial terms can be visually highlighted.
export function renderRich(text, values) {
  const filled = fillTemplate(text, values);
  const parts = filled.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// Rows shown in the highlighted "Commercial Summary" schedule at the top of
// the document, so the key deal terms are visible at a glance.
export const COMMERCIAL_SUMMARY_ROWS = [
  { label: "Plan selected", key: "planSelected" },
  { label: "Pages included", key: "pagesIncluded" },
  { label: "Revision rounds included", key: "revisionRoundsIncluded" },
  { label: "Free business email accounts included", key: "emailAccountsIncluded" },
  { label: "Estimated turnaround", key: "estimatedTurnaround" },
  { label: "Post-launch support period", key: "postLaunchSupportDays", suffix: " days" },
  { label: "Free maintenance included", key: "maintenanceMonths", suffix: " month(s)" },
  { label: "Minimum mandatory service tenure", key: "minimumTenureDays", suffix: " days" },
  { label: "Total project fee", key: "totalFee", prefix: "₹" },
  { label: "Advance payable (to start work)", key: "advanceAmount", prefix: "₹" },
  { label: "Balance payable (on completion)", key: "balanceAmount", prefix: "₹" },
];

// Rows shown in the "Schedule of Additional / Chargeable Items" table.
export const CHARGEABLE_ITEMS_ROWS = [
  { label: "Additional page beyond Plan limit", key: "extraPageRate", suffix: " / page" },
  { label: "Additional revision round beyond Plan limit", key: "extraRevisionRate", suffix: " / round" },
  { label: "Additional business email account beyond Plan limit", key: "extraEmailRate", suffix: " / account / year" },
  {
    label: "Removal / customization of agency footer branding (Launch & Growth only)",
    key: "footerBrandingRemovalFee",
    suffix: " one-time",
  },
  {
    label: "Business email subscription after free maintenance period ends",
    key: "emailSubscriptionCost",
    suffix: " / account / year",
  },
  { label: "Interest on overdue payments", key: "lateFeeInterestRate", suffix: "% per month" },
];

// Each section: { title, body: Array<string | { ol: string[] } | { ul: string[] }> }
// Bold important commercial/legal terms inline with **double asterisks** —
// rendered via renderRich().
export const AGREEMENT_SECTIONS = [
  {
    title: "1. Parties",
    body: [
      "This Client Service Agreement (“**Agreement**”) is made and entered into as of **{{effectiveDate}}** (“**Effective Date**”), reference number {{agreementRefNo}}, by and between the parties described below.",
    ],
  },
  {
    title: "2. Background & Recitals",
    body: [
      "WHEREAS, the Agency is engaged in the business of website and application design, development, and related digital services; and",
      "WHEREAS, the Client wishes to engage the Agency to design, develop, and deliver the project described in Section 4 (the “**Project**”), on the terms and conditions of this Agreement, and the Agency agrees to provide such services accordingly;",
      "NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows.",
    ],
  },
  {
    title: "3. Definitions",
    body: [
      {
        ul: [
          "“**Deliverables**” means the website, application, designs, source code, and any other work product the Agency creates for the Client under this Agreement and the applicable Plan.",
          "“**Plan**” means the pricing tier selected by the Client (Launch / Growth / Scale / Enterprise) as published on the Agency's Pricing page, defining the standard scope, inclusions, and limits of the Project, as recorded in the Commercial Summary above.",
          "“**Go-Live**” means the date the Deliverables are first published to a live, production environment accessible to the public.",
          "“**Support Period**” means the post-launch bug-fix support window included with the Client's Plan, measured from Go-Live.",
          "“**Maintenance Period**” means the free maintenance window included with the Client's Plan, measured from Go-Live, during which the Agency performs routine upkeep as described in Section 8.",
          "“**Minimum Tenure**” means the minimum mandatory duration of engagement described in Section 8, applicable to all services under this Agreement.",
          "“**Confidential Information**” has the meaning given in Section 12.",
          "“**Change Order**” means a written document signed or confirmed in writing by both Parties, describing a change to scope, fees, or timeline.",
        ],
      },
    ],
  },
  {
    title: "4. Scope of Services & Project Details",
    body: [
      "The Agency shall design, develop, and deliver the Project in accordance with the inclusions, limits, and specifications of the selected Plan, as set out in the Commercial Summary above:",
      {
        ul: [
          "Project / website name: **{{projectName}}**",
          "Project description: {{projectDescription}}",
          "Plan selected: **{{planSelected}}**",
        ],
      },
      "Any feature, page, integration, or deliverable not expressly listed in the Commercial Summary or in the selected Plan's published inclusions is considered **out of scope** and is chargeable under Section 6 and the Schedule of Additional / Chargeable Items, or requires a separate written Change Order.",
      "Specific design direction, content, and functional requirements shall be confirmed in writing (email or WhatsApp) prior to the start of development and form part of this Agreement by reference.",
    ],
  },
  {
    title: "5. Project Timeline & Delivery",
    body: [
      {
        ul: [
          "Work begins once this Agreement is signed and the advance payment under Section 6 is received in full.",
          "The estimated turnaround stated in the Commercial Summary is a good-faith estimate based on standard scope and timely Client cooperation — it is **not a guaranteed delivery date** and may extend if scope changes, revisions exceed included rounds, or the Client delays feedback, content, or approvals.",
          "The Agency will notify the Client promptly, in writing, of any material delay and the reason for it.",
          "Delivery is deemed complete when the Deliverables are made available to the Client for review, or published to Go-Live at the Client's direction, whichever occurs first.",
        ],
      },
    ],
  },
  {
    title: "6. Fees, Payment Terms & Additional Charges",
    body: [
      "6.1 Payment schedule. Unless otherwise agreed in a written Change Order, **50% of the total project fee is payable in advance** before work begins, and the **remaining 50% is payable on project completion**, before final handover of source code and Go-Live credentials. For Scale and Enterprise Plans, the Parties may agree in writing to a milestone-based schedule instead of the above.",
      "6.2 Late payment & interest. If any payment is overdue by more than 7 days, the Agency may pause work and withhold Go-Live access or handover until the outstanding amount is settled, and may charge interest at **{{lateFeeInterestRate}}% per month** on the overdue amount.",
      "6.3 Additional / chargeable items. Items in the Schedule of Additional / Chargeable Items above are not included in the base Plan fee and are billed separately, quoted and confirmed in writing before being carried out.",
      "6.4 Taxes. All fees stated are exclusive of applicable taxes (e.g., GST) unless stated otherwise, which shall be added to invoices as required by law.",
      "6.5 Refunds. Refund eligibility is governed by the Agency's published Refund Policy in effect as of the Effective Date, which is incorporated into this Agreement by reference.",
    ],
  },
  {
    title: "7. Client Responsibilities & Access",
    body: [
      {
        ul: [
          "The Client shall provide, in a timely manner, all content, branding assets, credentials, and approvals reasonably required for the Agency to perform the Services.",
          "The Client shall grant the Agency timely access to any third-party accounts, domains, hosting, or platforms necessary to complete the Project, and shall be responsible for the accuracy and legality of any content, data, or materials it supplies.",
          "Delays caused by the Client's failure to provide the above in a timely manner shall extend timelines accordingly and shall not constitute a breach by the Agency.",
          "The Client is responsible for maintaining its own backups of any content or data it provides, in addition to any backups the Agency may maintain.",
        ],
      },
    ],
  },
  {
    title: "8. Maintenance, Support & Minimum Tenure",
    body: [
      {
        ul: [
          "**Post-launch support.** The Agency shall provide bug-fix support (correcting defects in Agency-built functionality) for **{{postLaunchSupportDays}} days from Go-Live**, at no additional charge, as part of the selected Plan.",
          "**Free maintenance.** The Agency shall provide routine maintenance (minor updates, monitoring, and upkeep as reasonably defined by the Agency) for **{{maintenanceMonths}} month(s) from Go-Live**, at no additional charge, as part of the selected Plan.",
          "**Minimum tenure.** A **minimum service tenure of {{minimumTenureDays}} days is mandatory** for this engagement and applies to all services under this Agreement, including any ongoing support, hosting, or maintenance retainer, regardless of the Plan selected. Early termination by the Client before the Minimum Tenure has elapsed does not entitle the Client to a refund of fees already paid for the remaining tenure, except as set out in the Agency's Refund Policy.",
          "Support and maintenance do **not** cover: new feature requests, design changes, third-party service outages, issues caused by Client-side edits, or content updates — these are chargeable separately at the Agency's then-current rates, quoted in advance.",
          "After the Support Period and Maintenance Period lapse, continued support/maintenance is available only under a separate paid retainer agreed in writing.",
        ],
      },
    ],
  },
  {
    title: "9. Relationship of the Parties; Sub-contracting",
    body: [
      "The Agency is an independent contractor. Nothing in this Agreement creates a partnership, joint venture, agency, or employer-employee relationship between the Parties. The Agency may, at its discretion, engage employees, freelancers, or sub-contractors to perform the Services, provided the Agency remains responsible for the quality and delivery of the Deliverables.",
    ],
  },
  {
    title: "10. Intellectual Property & Ownership",
    body: [
      {
        ul: [
          "Upon receipt of **full and final payment** of all amounts due under this Agreement, ownership of the final delivered source code, design files, and content created specifically for the Project transfers to the Client.",
          "Until full and final payment is received, all Deliverables remain the property of the Agency, and no license (express or implied) is granted to the Client to use, publish, or exploit them.",
          "The Agency retains the right to display the completed Project in its portfolio, case studies, and marketing materials, unless the Client requests otherwise in writing.",
          "Pre-existing Agency tools, frameworks, boilerplate code, and internal know-how used to build the Deliverables remain the Agency's property and are licensed to the Client for use solely as part of the Deliverables.",
          "Third-party assets incorporated into the Project (fonts, stock imagery, plugins, libraries, platforms, and similar) remain subject to their own respective licenses, and the Client is responsible for any ongoing license or subscription fees associated with them after handover.",
        ],
      },
    ],
  },
  {
    title: "11. Hosting, Domain & Third-Party Services",
    body: [
      "Unless otherwise agreed in writing, the domain name and hosting account for the Project shall be registered and owned in the **Client's name**, with the Agency configuring access as required to complete the Project. Where the Agency provisions or manages hosting, domain, email, or other third-party services on the Client's behalf, the Client remains responsible for the ongoing costs, renewals, and compliance with the terms of those third-party services, except where expressly covered by the Agency during the Maintenance Period under Section 8. The Agency is not liable for outages, price changes, or policy changes made by such third parties.",
    ],
  },
  {
    title: "12. Confidentiality",
    body: [
      "Each Party agrees to keep confidential any non-public business, technical, or financial information disclosed by the other Party in connection with this Agreement (“**Confidential Information**”), and to use it solely for the purpose of performing this Agreement. This obligation does not apply to information that is or becomes publicly available through no fault of the receiving Party, or that is required to be disclosed by law. This Section survives termination of this Agreement.",
    ],
  },
  {
    title: "13. Data Protection & Privacy",
    body: [
      "Where the Agency processes personal data on the Client's behalf as part of the Project (e.g., website form submissions, customer records), the Agency shall implement reasonable technical and organizational measures to protect such data, and the Client remains responsible for ensuring its own compliance with applicable data protection and privacy laws relevant to its business and end users.",
    ],
  },
  {
    title: "14. Acceptance of Deliverables",
    body: [
      "Upon delivery of the Project (or any milestone), the Client shall have **{{deliverableAcceptanceDays}} days** to review the Deliverables and notify the Agency in writing of any material non-conformance with the agreed scope. If no such written notice is received within that period, the Deliverables shall be **deemed accepted**. Requests raised after this period, or requests outside the agreed scope, shall be treated as additional work under Section 6.",
    ],
  },
  {
    title: "15. Warranties & Disclaimers",
    body: [
      {
        ul: [
          "The Agency warrants that it will perform the Services in a professional manner consistent with generally accepted industry standards, and will test the Deliverables across common, current devices and browsers.",
          "Except as expressly stated in this Agreement, the Deliverables are provided “**as is**”, and the Agency disclaims all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law.",
          "The Agency does not guarantee specific business outcomes (e.g., search rankings, sales, or traffic), uninterrupted operation, or error-free performance, particularly where third-party services, plugins, or hosting providers are involved.",
        ],
      },
    ],
  },
  {
    title: "16. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, neither Party shall be liable to the other for any **indirect, incidental, special, or consequential damages**, or for loss of profits, revenue, or data, arising out of or related to this Agreement. The Agency's total aggregate liability for any and all claims arising under or in connection with this Agreement shall **not exceed the total fees actually paid** by the Client for the specific Project giving rise to the claim.",
    ],
  },
  {
    title: "17. Indemnification",
    body: [
      "The Client agrees to indemnify and hold harmless the Agency from any claims, damages, or expenses (including reasonable legal fees) arising from: (a) content, data, or materials the Client supplies that infringe third-party rights or violate applicable law; or (b) the Client's use of the Deliverables in violation of this Agreement or applicable law. The Agency agrees to indemnify the Client against third-party claims that the Deliverables, as originally built by the Agency (excluding third-party assets and Client-supplied content), directly infringe a third party's intellectual property rights.",
    ],
  },
  {
    title: "18. Termination & Survival",
    body: [
      {
        ul: [
          "Either Party may terminate this Agreement upon written notice if the other Party materially breaches this Agreement and fails to cure such breach within **14 days** of receiving notice.",
          "The Client may terminate for convenience upon written notice, subject to payment for all Services performed and costs incurred up to the effective date of termination, and subject to the Minimum Tenure requirement in Section 8.",
          "Upon termination, the Agency shall deliver all Deliverables completed and paid for up to that date, and each Party shall return or destroy the other's Confidential Information upon request.",
          "Refund eligibility upon termination is governed by the Agency's published Refund Policy.",
          "Sections 6 (as to amounts accrued), 9, 10, 12, 13, 16, 17, and 20 shall **survive** any termination or expiry of this Agreement.",
        ],
      },
    ],
  },
  {
    title: "19. Force Majeure",
    body: [
      "Neither Party shall be liable for any delay or failure to perform its obligations (other than payment obligations) due to causes beyond its reasonable control, including natural disasters, internet or power outages, acts of government, or other events of force majeure, for as long as such event continues.",
    ],
  },
  {
    title: "20. Dispute Resolution & Governing Law",
    body: [
      "The Parties shall first attempt to resolve any dispute arising out of this Agreement through good-faith negotiation. If unresolved within 30 days, the dispute shall be subject to the **exclusive jurisdiction of the courts at {{jurisdictionCity}}**, and this Agreement shall be governed by the laws of **{{governingCountry}}**.",
    ],
  },
  {
    title: "21. Notices & Communication",
    body: [
      "All formal notices under this Agreement shall be in writing and delivered by email to the addresses stated above, or such other address as either Party notifies in writing. Routine project communication may be conducted via email or WhatsApp, and written confirmations exchanged through these channels are treated as valid records for the purposes of this Agreement.",
    ],
  },
  {
    title: "22. Amendments, Assignment & Waiver",
    body: [
      "This Agreement may only be amended by a written Change Order signed (including via email confirmation) by both Parties. Neither Party may assign this Agreement without the other's prior written consent, except that the Agency may assign this Agreement in connection with a merger, acquisition, or sale of substantially all its business. No failure or delay by either Party in exercising any right under this Agreement shall operate as a waiver of that right.",
    ],
  },
  {
    title: "23. Execution, Electronic Signatures & Stamp Duty",
    body: [
      "This Agreement may be executed in counterparts, including by electronic signature or by written acceptance over email/WhatsApp, each of which shall be deemed an original. Electronic signatures and records are recognized as legally valid and enforceable under the Information Technology Act, 2000, subject to the essential elements of a valid contract under the Indian Contract Act, 1872. Where physically executed, this Agreement shall be stamped in accordance with the applicable Stamp Act; where executed electronically, applicable stamp duty (if any) shall be borne as agreed between the Parties or as required by law.",
    ],
  },
  {
    title: "24. Entire Agreement & Severability",
    body: [
      "This Agreement, together with the Agency's published Terms of Service, Privacy Policy, and Refund Policy referenced herein, constitutes the **entire agreement** between the Parties regarding the Project and supersedes all prior discussions or agreements on the subject. If any provision of this Agreement is held unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
];
