"use client";

import { useState } from "react";
import type { PricingPackage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PricingToggle({ packages }: { packages: PricingPackage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = packages[activeIndex];

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-6">
        {packages.map((pkg, i) => (
          <button
            key={pkg.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "rounded-full border border-border-outline text-sm font-medium px-4.5 py-2.5",
              i === activeIndex
                ? "bg-fill-button text-surface border-transparent"
                : "bg-surface text-text-muted"
            )}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      <div className="rounded-7 border border-border-outline bg-surface p-7">
        <div className="text-2xl font-semibold tabular-nums">
          {active.price || "Custom"}
        </div>
        {active.note && (
          <div className="text-sm text-text-muted mt-1 mb-5">{active.note}</div>
        )}
        <ul className="flex flex-col gap-3 mt-5">
          {active.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-sm text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary mt-1.5 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
