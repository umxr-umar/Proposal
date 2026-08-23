"use client";

import { useEffect, useState } from "react";
import type { Proposal } from "@/lib/types";

type Phase = "in" | "out" | "done";

export function OpeningSequence({ proposal }: { proposal: Proposal }) {
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setPhase("done");
      return;
    }
    const holdMs = proposal.introVideoUrl ? 0 : 1900;
    const outMs = proposal.introVideoUrl ? 0 : 700;
    const toOut = setTimeout(() => setPhase("out"), holdMs);
    const toDone = setTimeout(() => setPhase("done"), holdMs + outMs);
    return () => {
      clearTimeout(toOut);
      clearTimeout(toDone);
    };
  }, [proposal.introVideoUrl]);

  if (phase === "done") return null;

  return (
    <div
      role="presentation"
      onClick={() => setPhase("out")}
      className={`fixed inset-0 z-50 bg-dark flex items-center justify-center cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "out" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {proposal.introVideoUrl ? (
        <video
          src={proposal.introVideoUrl}
          autoPlay
          muted
          playsInline
          onEnded={() => setPhase("out")}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center px-6">
          <div className="font-display italic font-light text-dark-ink text-4xl md:text-6xl tracking-tight animate-intro-fade">
            BI-FLUX
          </div>
          <div className="mt-5 text-dark-ink-muted text-xs uppercase tracking-wide animate-intro-fade-delay">
            Prepared For {proposal.clientName}
          </div>
        </div>
      )}
    </div>
  );
}
