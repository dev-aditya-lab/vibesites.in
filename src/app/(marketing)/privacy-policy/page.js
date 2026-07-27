import LegalLayout from "@/components/sections/LegalLayout";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Privacy Policy",
  description: "How Vibesites collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 1, 2026">
      <div>
        <p>
          Vibesites (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy
          explains what information we collect when you interact with our website or services, how we use it, and
          the choices you have.
        </p>
      </div>

      <div>
        <h2>Information we collect</h2>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Contact details submitted through our contact form or WhatsApp (name, email, phone number)</li>
          <li>Project details you share with us during scoping and onboarding</li>
          <li>Communications you send us via email, WhatsApp, or our contact form</li>
        </ul>
        <p>
          We also automatically collect limited technical information — such as browser type, device type, and
          pages visited — through standard analytics tools to understand how our site is used.
        </p>
      </div>

      <div>
        <h2>How we use your information</h2>
        <ul>
          <li>To respond to inquiries and provide quotes for our services</li>
          <li>To deliver, manage, and support projects you&apos;ve engaged us for</li>
          <li>To send project-related updates and, occasionally, relevant service updates</li>
          <li>To improve our website and services based on aggregate usage patterns</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </div>

      <div>
        <h2>WhatsApp communication</h2>
        <p>
          Much of our client communication happens over WhatsApp. Messages exchanged there are subject to
          WhatsApp&apos;s own privacy policy in addition to this one. We retain conversation history only as long as
          needed to support your project and our business records.
        </p>
      </div>

      <div>
        <h2>Data retention</h2>
        <p>
          We retain personal information for as long as necessary to fulfill the purposes outlined in this policy,
          including any legal, accounting, or reporting requirements.
        </p>
      </div>

      <div>
        <h2>Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information at any time by
          contacting us at {siteConfig.email}. We will respond to verified requests within a reasonable timeframe.
        </p>
      </div>

      <div>
        <h2>Cookies and analytics</h2>
        <p>
          Our website may use cookies and similar technologies to understand site usage and improve performance. You
          can control cookie preferences through your browser settings.
        </p>
      </div>

      <div>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be reflected by an updated &ldquo;last
          updated&rdquo; date at the top of this page.
        </p>
      </div>

      <div>
        <h2>Contact us</h2>
        <p>
          Questions about this policy can be sent to {siteConfig.email} or via WhatsApp at{" "}
          {siteConfig.whatsapp.display}.
        </p>
      </div>
    </LegalLayout>
  );
}
