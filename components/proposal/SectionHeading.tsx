export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-5">
      <div className="text-xs tracking-wide uppercase flex items-center gap-2.5 mb-4">
        <span className="w-5 h-px bg-border-outline inline-block" />
        <span className="text-text-muted">{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-semibold text-balance">{title}</h2>
    </div>
  );
}
