import { SectionHeading } from "./SectionHeading";

export function Situation({ situation }: { situation?: string }) {
  if (!situation) return null;
  const paragraphs = situation.split(/\n+/).filter(Boolean);

  return (
    <div className="max-w-[820px] mx-auto px-6 py-16 border-t border-border">
      <SectionHeading eyebrow="01 / The Situation" title="What We Found" />
      <div className="flex flex-col gap-4 text-lg text-ink-muted max-w-[640px]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
