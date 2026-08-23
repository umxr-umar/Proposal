export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="text-xs tracking-wide uppercase text-ink-muted mb-4">
        {eyebrow}
      </div>
      <h2 className="font-display font-normal text-4xl text-balance">
        {title}
      </h2>
    </div>
  );
}
