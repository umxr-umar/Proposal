import { SectionHeading } from "./SectionHeading";

export function Situation({ situation }: { situation?: string }) {
  if (!situation) return null;
  const paragraphs = situation.split(/\n+/).filter(Boolean);

  return (
    <div className="max-w-[760px] mx-auto px-6 py-14">
      <SectionHeading eyebrow="Exhibit 01 / The Situation" title="What We Found" />
      <div className="flex flex-col gap-3.5 text-text-muted">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
