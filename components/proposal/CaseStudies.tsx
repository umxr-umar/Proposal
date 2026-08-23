import Image from "next/image";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SectionHeading } from "./SectionHeading";

export function CaseStudies({ slugs }: { slugs: string[] }) {
  const studies = slugs
    .map((slug) => CASE_STUDIES[slug])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (studies.length === 0) return null;

  return (
    <div id="sec-proof" className="max-w-[760px] mx-auto px-6 py-14">
      <SectionHeading
        eyebrow="Exhibit 03 / The Proof"
        title="The Work Speaks. We Don't Have To."
      />

      <div className="flex flex-col gap-6 mt-6">
        {studies.map((cs) => (
          <div
            key={cs.slug}
            className="rounded-7 border border-border-outline bg-surface overflow-hidden"
          >
            {cs.image && (
              <div className="relative w-full aspect-[16/10] bg-surface-raised">
                <Image
                  src={cs.image}
                  alt={cs.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 760px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="text-xs uppercase tracking-wide text-text-muted mb-1">
                {cs.category}
              </div>
              <h3 className="text-lg font-medium mb-2">{cs.name}</h3>
              <p className="text-sm text-text-muted mb-5">{cs.tagline}</p>

              <div className="grid grid-cols-3 gap-3.5 mb-2">
                {cs.stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-border-outline pl-3">
                    <div className="text-lg font-semibold tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <details className="mt-3 group">
                <summary className="cursor-pointer text-sm font-medium list-none flex items-center gap-1.5 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">&minus;</span>
                  Show Detail
                </summary>
                <div className="pt-3.5 mt-3 border-t border-dashed border-border-outline text-sm text-text-muted flex flex-col gap-2.5">
                  <p>{cs.overview}</p>
                  <p>{cs.finding}</p>
                  {cs.detail && <p>{cs.detail}</p>}
                </div>
              </details>

              {cs.quote && (
                <div className="mt-3.5 rounded-4 bg-fill-input p-4 text-sm italic">
                  &ldquo;{cs.quote}&rdquo;
                  <cite className="block not-italic text-xs text-text-muted mt-2">
                    by {cs.quoteAttribution}
                  </cite>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
