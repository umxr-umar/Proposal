import type { Proposal } from "@/lib/types";

const CAL_URL = "https://cal.com/umar-d1uf39/15min";

export function Hero({ proposal }: { proposal: Proposal }) {
  return (
    <div className="max-w-[900px] mx-auto px-6 pt-32 pb-24">
      <div className="text-xs tracking-wide uppercase text-ink-muted mb-7">
        Prepared For {proposal.clientName}
      </div>

      <h1 className="font-display font-light italic text-6xl leading-[1.05] text-balance mb-7 max-w-[820px]">
        {proposal.heroHeadline ||
          "We Build Websites That Turn Cold Traffic Into Customers."}
      </h1>

      {proposal.heroLede && (
        <p className="text-lg text-ink-muted max-w-[560px] mb-10">
          {proposal.heroLede}
        </p>
      )}

      <div className="flex gap-3 flex-wrap mb-14">
        <a
          href="#decision"
          className="inline-flex items-center justify-center rounded-2 bg-accent text-accent-ink font-medium text-sm px-6 h-12"
        >
          Accept This Proposal
        </a>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2 border border-border text-ink font-medium text-sm px-6 h-12"
        >
          Book A 15-Min Call
        </a>
      </div>

      <div className="flex gap-x-6 gap-y-2 flex-wrap text-sm text-ink-muted">
        {[
          "100+ Websites Rebuilt From Scratch",
          "60+ Mobile Flows Rebuilt From Scratch",
          "15+ Industries Served",
        ].map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>

      {proposal.personalMessageVideoUrl && (
        <div className="mt-16 rounded-3 bg-surface border border-border p-7">
          <p className="text-xs uppercase tracking-wide text-ink-muted mb-4">
            A Quick Word From Umar
          </p>
          <video
            src={proposal.personalMessageVideoUrl}
            controls
            playsInline
            className="w-full h-auto rounded-2 block"
          />
        </div>
      )}
    </div>
  );
}
