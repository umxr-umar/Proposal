import { SectionHeading } from "./SectionHeading";

export function Approach({ approachNotes }: { approachNotes?: string }) {
  const notes = approachNotes?.split(/\n+/).filter(Boolean) ?? [];

  return (
    <div id="sec-approach" className="max-w-[760px] mx-auto px-6 py-14">
      <SectionHeading eyebrow="Exhibit 02 / The Approach" title="How We'll Build It" />
      <p className="text-text-muted mb-6">
        Most agencies just build websites. We build websites specifically
        engineered to convert visitors into customers, not just to look
        good. Every project runs on the same formula:
      </p>

      <div className="grid grid-cols-3 gap-px bg-border-outline border border-border-outline rounded-6 overflow-hidden mb-6">
        {[
          { pct: "80%", label: "Research" },
          { pct: "10%", label: "Design" },
          { pct: "10%", label: "Development" },
        ].map((step) => (
          <div key={step.label} className="bg-surface px-5 py-6">
            <div className="text-2xl font-semibold">{step.pct}</div>
            <div className="text-sm font-medium text-text-muted mt-1.5">
              {step.label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-text-muted">
        Most of the actual work happens before a single screen is designed:
        researching competitors, studying what&apos;s already working,
        finding the real gap. Design and build move fast because the
        thinking is already done.
      </p>

      {notes.length > 0 && (
        <div className="flex flex-col gap-3.5 text-text-muted mt-4">
          {notes.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
