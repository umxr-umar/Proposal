import type { Proposal } from "@/lib/types";

export function Hero({ proposal }: { proposal: Proposal }) {
  return (
    <div className="max-w-[900px] mx-auto px-6 pt-32 pb-24">
      <h1 className="font-display font-normal text-6xl leading-[1.05] text-balance mb-7 uppercase">
        Project Proposal
      </h1>

      <p className="text-lg text-ink-muted max-w-[640px] mb-16">
        Web design and web development contract proposal for{" "}
        {proposal.clientName}.
      </p>

      <div className="flex gap-x-16 gap-y-6 flex-wrap">
        <div>
          <div className="text-xs tracking-wide uppercase text-ink-muted mb-3">
            Freelancer
          </div>
          <div className="text-ink">hello@biflux.design</div>
        </div>
        <div>
          <div className="text-xs tracking-wide uppercase text-ink-muted mb-3">
            Client
          </div>
          <div className="text-ink">{proposal.clientName}</div>
          {proposal.clientEmail && (
            <div className="text-ink-muted">{proposal.clientEmail}</div>
          )}
        </div>
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
