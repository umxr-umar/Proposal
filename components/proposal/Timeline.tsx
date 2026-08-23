import type { TimelineStep } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";

export function Timeline({ timeline }: { timeline: TimelineStep[] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div id="sec-timeline" className="max-w-[820px] mx-auto px-6 py-16 border-t border-border">
      <SectionHeading eyebrow="05 / The Timeline" title="Start To Finish" />
      <div className="flex flex-col">
        {timeline.map((step, i) => (
          <div
            key={step.name}
            className={
              i === 0
                ? "flex gap-6 py-6"
                : "flex gap-6 py-6 border-t border-border"
            }
          >
            <div className="text-sm text-accent min-w-[96px] pt-0.5">
              {step.duration}
            </div>
            <div>
              <div className="font-medium text-lg mb-1">{step.name}</div>
              <div className="text-ink-muted">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
