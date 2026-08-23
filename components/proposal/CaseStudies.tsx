import Image from "next/image";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SectionHeading } from "./SectionHeading";

export function CaseStudies({ slugs }: { slugs: string[] }) {
  const studies = slugs
    .map((slug) => CASE_STUDIES[slug])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (studies.length === 0) return null;

  return (
    <div id="sec-proof" className="max-w-[900px] mx-auto px-6 py-16 border-t border-border">
      <SectionHeading eyebrow="03 / The Proof" title="The Work Speaks. We Don't Have To." />

      <div className="flex flex-col gap-20 mt-4">
        {studies.map((cs, i) => (
          <div
            key={cs.slug}
            className={`flex flex-col md:flex-row gap-10 items-center ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {cs.image && (
              <div className="relative w-full md:w-1/2 aspect-square rounded-3 overflow-hidden bg-surface-muted shrink-0">
                <Image
                  src={cs.image}
                  alt={cs.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="w-full md:w-1/2">
              <h3 className="font-display font-normal text-2xl mb-3">{cs.name}</h3>
              <p className="text-ink-muted mb-6 max-w-[420px]">{cs.tagline}</p>

              <div className="flex gap-8 flex-wrap mb-5">
                {cs.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display font-light text-3xl leading-none tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-ink-muted mt-2 max-w-[110px] leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <details className="group">
                <summary className="cursor-pointer text-sm font-medium list-none flex items-center gap-1.5 [&::-webkit-details-marker]:hidden text-accent">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">&minus;</span>
                  Show Detail
                </summary>
                <div className="pt-4 mt-3 border-t border-border text-sm text-ink-muted flex flex-col gap-3 max-w-[420px]">
                  <p>{cs.overview}</p>
                  <p>{cs.finding}</p>
                  {cs.detail && <p>{cs.detail}</p>}
                </div>
              </details>

              {cs.quote && (
                <div className="mt-5 border-l-2 border-accent pl-4 text-sm italic max-w-[420px]">
                  &ldquo;{cs.quote}&rdquo;
                  <cite className="block not-italic text-xs text-ink-muted mt-2">
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
