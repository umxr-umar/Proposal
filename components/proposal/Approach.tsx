import { SectionHeading } from "./SectionHeading";

export function Approach({ approachNotes }: { approachNotes?: string }) {
  const notes = approachNotes?.split(/\n+/).filter(Boolean) ?? [];

  return (
    <div id="sec-approach" className="max-w-[820px] mx-auto px-6 py-16 border-t border-border">
      <SectionHeading eyebrow="02 / The Approach" title="How We'll Build It" />
      <p className="text-lg text-ink-muted max-w-[640px] mb-10">
        Most agencies just build websites. We build websites specifically
        engineered to convert visitors into customers, not just to look
        good. Every project runs on the same formula:
      </p>

      <div className="flex gap-x-12 gap-y-8 flex-wrap mb-10">
        {[
          { pct: "80", label: "Research" },
          { pct: "10", label: "Design" },
          { pct: "10", label: "Development" },
        ].map((step) => (
          <div key={step.label}>
            <div className="font-display font-light text-6xl leading-none">
              {step.pct}
              <span className="text-2xl align-top">%</span>
            </div>
            <div className="text-sm text-ink-muted mt-3 uppercase tracking-wide">
              {step.label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-lg text-ink-muted max-w-[640px]">
        Most of the actual work happens before a single screen is designed:
        researching competitors, studying what&apos;s already working,
        finding the real gap. Design and build move fast because the
        thinking is already done.
      </p>

      {notes.length > 0 && (
        <div className="flex flex-col gap-4 text-lg text-ink-muted max-w-[640px] mt-4">
          {notes.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
