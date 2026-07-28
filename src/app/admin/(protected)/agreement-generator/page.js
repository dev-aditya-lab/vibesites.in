import AgreementGenerator from "@/components/admin/agreements/AgreementGenerator";

export const metadata = { title: "Agreement Generator" };

export default function AgreementGeneratorPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="no-print">
        <h1 className="font-display text-2xl text-ink-950">Agreement Generator</h1>
        <p className="mt-1 text-sm text-ink-600">
          Fill in the fields on the left to generate a Client Service Agreement, then use “Save as PDF” to print or
          save it. Any field left blank appears as a bracketed placeholder in the document.
        </p>
      </div>

      <AgreementGenerator />
    </div>
  );
}
