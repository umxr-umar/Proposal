import type { Proposal } from "@/lib/types";

const CAL_URL = "https://cal.com/umar-d1uf39/15min";

export function Hero({ proposal }: { proposal: Proposal }) {
  return (
    <div className="max-w-[820px] mx-auto px-6 pt-28 pb-20">
      {proposal.introVideoUrl && (
        <div className="mb-10 rounded-7 overflow-hidden bg-surface border border-border-outline">
          <video
            src={proposal.introVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
          />
        </div>
      )}

      <div className="text-xs tracking-wide uppercase flex items-center gap-2.5 mb-5">
        <span className="w-5 h-px bg-border-outline inline-block" />
        <span className="text-text-muted">
          Prepared For {proposal.clientName}
        </span>
      </div>

      <h1 className="text-5xl font-semibold leading-[1.08] text-balance mb-5">
        {proposal.heroHeadline ||
          "We Build Websites That Turn Cold Traffic Into Customers."}
      </h1>

      {proposal.heroLede && (
        <p className="text-lg text-text-muted max-w-[560px] mb-9">
          {proposal.heroLede}
        </p>
      )}

      <div className="flex gap-3 flex-wrap mb-11">
        <a
          href="#decision"
          className="inline-flex items-center justify-center rounded-7 bg-fill-button text-surface font-medium text-sm px-5 h-11"
        >
          Accept This Proposal
        </a>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-7 border border-border-outline text-text-primary font-medium text-sm px-5 h-11"
        >
          Book A 15-Min Call
        </a>
      </div>

      <div className="flex gap-2.5 flex-wrap">
        {[
          "100+ Websites Rebuilt From Scratch",
          "60+ Mobile Flows Rebuilt From Scratch",
          "15+ Industries Served",
        ].map((badge) => (
          <span
            key={badge}
            className="text-xs text-text-muted border border-border-outline rounded-full px-3.5 py-1.5"
          >
            {badge}
          </span>
        ))}
      </div>

      {proposal.personalMessageVideoUrl && (
        <div className="mt-14 rounded-7 bg-surface border border-border-outline p-6">
          <p className="text-xs uppercase tracking-wide text-text-muted mb-3">
            A Quick Word From Umar
          </p>
          <video
            src={proposal.personalMessageVideoUrl}
            controls
            playsInline
            className="w-full h-auto rounded-5 block"
          />
        </div>
      )}
    </div>
  );
}
