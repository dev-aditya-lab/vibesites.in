import ComingSoon from "@/components/sections/ComingSoon";

export const metadata = {
  title: "Our Team",
  description: "This page is coming soon.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <ComingSoon
      eyebrow="Our team"
      title="Our team page is coming soon."
      description="We're putting this page together. In the meantime, every project is backed by our in-house developers, designers, and support team working side by side."
    />
  );
}
