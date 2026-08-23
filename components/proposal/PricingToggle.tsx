"use client";

import { useState } from "react";
import type { PricingPackage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PricingToggle({ packages }: { packages: PricingPackage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = packages[activeIndex];

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        {packages.map((pkg, i) => (
          <button
            key={pkg.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "rounded-full border text-sm font-medium px-5 py-2.5 transition-colors",
              i === activeIndex
                ? "bg-accent text-accent-ink border-accent"
                : "bg-surface text-ink-muted border-border"
            )}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      <div className="rounded-3 border border-border bg-surface p-9">
        <div className="font-display font-light text-5xl tabular-nums">
          {active.price || "Custom"}
        </div>
        {active.note && (
          <div className="text-sm text-ink-muted mt-2 mb-7">{active.note}</div>
        )}
        <ul className="flex flex-col gap-3 mt-7">
          {active.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-ink-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
