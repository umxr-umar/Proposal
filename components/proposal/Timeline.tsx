import type { TimelineStep } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";

export function Timeline({ timeline }: { timeline: TimelineStep[] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div id="sec-timeline" className="max-w-[760px] mx-auto px-6 py-14">
      <SectionHeading eyebrow="Exhibit 05 / The Timeline" title="Start To Finish" />
      <div className="flex flex-col">
        {timeline.map((step, i) => (
          <div
            key={step.name}
            className={cnBorder(i)}
          >
            <div className="text-xs text-text-muted min-w-[88px] pt-0.5">
              {step.duration}
            </div>
            <div>
              <div className="font-semibold mb-1">{step.name}</div>
              <div className="text-sm text-text-muted">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function cnBorder(i: number) {
  const base = "flex gap-5 py-5";
  return i === 0 ? base : `${base} border-t border-border-outline`;
}
