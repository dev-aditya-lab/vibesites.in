import LegalLayout from "@/components/sections/LegalLayout";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the Vibesites website and engagement of our services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" updated="July 1, 2026">
      <div>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Vibesites website and any services you
          engage us to provide. By using our website or engaging our services, you agree to these Terms.
        </p>
      </div>

      <div>
        <h2>Our services</h2>
        <p>
          Vibesites provides web design and development, e-commerce, mobile app development, SEO, content, and
          related digital services as described on our Services and Pricing pages. Specific project scope,
          deliverables, timeline, and cost are confirmed in writing (including via WhatsApp or email) before work
          begins.
        </p>
      </div>

      <div>
        <h2>Project engagement</h2>
        <ul>
          <li>Projects begin once scope is agreed upon and any required deposit is received.</li>
          <li>Timelines listed on our Services and Pricing pages are typical estimates, not guarantees, and can vary based on scope, revisions, and how quickly you provide feedback and content.</li>
          <li>Revision rounds are defined per plan; requests beyond the included rounds may incur additional cost, which we&apos;ll always confirm before proceeding.</li>
        </ul>
      </div>

      <div>
        <h2>Payment terms</h2>
        <p>
          Unless otherwise agreed in writing, standard terms are 50% payable to begin work and 50% payable on
          delivery. Larger Scale and Enterprise projects may follow a milestone-based schedule outlined in your
          proposal. Late payments may pause project work until resolved.
        </p>
      </div>

      <div>
        <h2>Ownership and intellectual property</h2>
        <p>
          Upon full and final payment, ownership of the final delivered design files and custom code transfers to
          you. We retain the right to showcase completed work in our portfolio and marketing materials unless you
          request otherwise in writing. Third-party assets (fonts, stock imagery, plugins, platforms) remain subject
          to their own licenses.
        </p>
      </div>

      <div>
        <h2>Client responsibilities</h2>
        <p>
          Timely delivery depends on you providing necessary content, feedback, access credentials, and approvals.
          Delays on your end may extend the project timeline accordingly.
        </p>
      </div>

      <div>
        <h2>Warranties and limitations</h2>
        <p>
          We build to modern standards and test across common devices and browsers, but we cannot guarantee
          uninterrupted or error-free operation of any website or application, particularly where third-party
          services, plugins, or hosting providers are involved. Our liability for any claim related to our services
          is limited to the amount paid for the specific project in question.
        </p>
      </div>

      <div>
        <h2>Termination</h2>
        <p>
          Either party may terminate an engagement with written notice. You remain responsible for payment for work
          completed up to the termination date. See our Refund Policy for details on refund eligibility.
        </p>
      </div>

      <div>
        <h2>Changes to these terms</h2>
        <p>We may update these Terms periodically. Continued use of our services after changes constitutes acceptance of the updated Terms.</p>
      </div>

      <div>
        <h2>Contact</h2>
        <p>
          Questions about these Terms can be sent to {siteConfig.email} or via WhatsApp at{" "}
          {siteConfig.whatsapp.display}.
        </p>
      </div>
    </LegalLayout>
  );
}
