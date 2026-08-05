import LegalLayout from "@/components/sections/LegalLayout";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Refund Policy",
  description: "When and how refunds are issued for Vibesites projects.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" updated="July 1, 2026">
      <div>
        <p>
          We want every client to feel confident engaging Vibesites. This policy explains when refunds are available
          and how cancellations are handled across our project-based plans.
        </p>
      </div>

      <div>
        <h2>Before design work begins</h2>
        <p>
          If you cancel before any design work has started, you are eligible for a full refund of your deposit, less
          any payment processing fees already incurred.
        </p>
      </div>

      <div>
        <h2>After design work begins</h2>
        <p>
          Once design work has started, refunds are prorated based on the work completed at the time of
          cancellation. We&apos;ll always provide a clear breakdown of work completed before finalizing any partial
          refund.
        </p>
      </div>

      <div>
        <h2>After development begins</h2>
        <p>
          Once development work has started following your sign-off on final designs, the deposit becomes
          non-refundable, as significant technical work is underway. Any remaining milestone payments not yet made
          are not owed if you cancel at this stage, but completed work will not be delivered until outstanding
          amounts for work performed are settled.
        </p>
      </div>

      <div>
        <h2>After project delivery</h2>
        <p>
          Once a project has been delivered, approved, and the final payment made, it is considered complete and is
          not eligible for a refund. Post-launch issues are covered under your plan&apos;s included support window —
          see your plan details on the Pricing page.
        </p>
      </div>

      <div>
        <h2>Ongoing services</h2>
        <p>
          For monthly retainer services (such as Web Maintenance or SEO), you may cancel at any time with 14 days&apos;
          notice. Fees already paid for the current billing period are non-refundable, but no further charges will
          apply after cancellation takes effect.
        </p>
      </div>

      <div>
        <h2>Third-party costs</h2>
        <p>
          Costs already paid to third parties on your behalf — domain registration, hosting, premium plugins, or app
          store fees — are non-refundable regardless of project stage, as these are paid directly to external
          providers.
        </p>
      </div>

      <div>
        <h2>How to request a refund</h2>
        <p>
          Message us at {siteConfig.email} or via WhatsApp at {siteConfig.whatsapp.display} with your project details.
          We aim to review and resolve refund requests within 5 business days. Once approved, refunds will be
          credited within 5-6 days to the original source of payment.
        </p>
      </div>

      <div>
        <h2>Business details</h2>
        <p>
          {siteConfig.name} is operated by {siteConfig.proprietor}.
        </p>
      </div>
    </LegalLayout>
  );
}
