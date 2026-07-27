"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingPlans from "@/components/sections/PricingPlans";
import QuoteForm from "@/components/sections/QuoteForm";

/** Owns which plan the visitor picked so the embedded quote form below can pre-fill its message. */
export default function PricingConversion() {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <>
      <PricingPlans onSelectPlan={(plan) => setSelectedPlan(plan.name)} />

      <section id="get-quote" className="scroll-mt-28 py-8 lg:py-12">
        <Container className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Get a fixed quote"
            title="Tell us a bit more — we'll confirm scope and price."
            align="center"
          />
          <div className="mt-10">
            <QuoteForm
              sourcePage="/pricing"
              initialMessage={selectedPlan ? `I'm interested in the ${selectedPlan} plan.` : ""}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
