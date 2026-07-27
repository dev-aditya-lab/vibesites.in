import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import TeamGrid from "@/components/sections/TeamGrid";
import Container from "@/components/ui/Container";
import { departments, team } from "@/data/team";

export const metadata = {
  title: "Our Team",
  description: "Meet the 32-person team of designers, engineers, and strategists behind Vibesites.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="32 people, one obsession with the details."
        description="Every project is staffed by specialists, not generalists spread thin — designers who design, engineers who engineer, strategists who strategize."
      />

      {departments.map((dept) => {
        const members = team.filter((m) => m.department === dept);
        if (members.length === 0) return null;
        return (
          <section key={dept} className="border-t border-ink-200 py-16">
            <Container>
              <h2 className="font-display text-2xl text-ink-950 sm:text-3xl">{dept}</h2>
              <TeamGrid members={members} />
            </Container>
          </section>
        );
      })}

      <CTASection
        eyebrow="Join the team"
        title="We're always looking for exceptional people."
        description="If you'd love working on projects like these, send us a message on WhatsApp with your portfolio — we read every one."
      />
    </>
  );
}
