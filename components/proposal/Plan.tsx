import type { PricingPackage } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";
import { PricingToggle } from "./PricingToggle";

export function Plan({ packages }: { packages: PricingPackage[] }) {
  if (!packages || packages.length === 0) return null;

  return (
    <div id="sec-plan" className="max-w-[820px] mx-auto px-6 py-16 border-t border-border">
      <SectionHeading eyebrow="04 / The Plan" title="What We're Putting On The Table" />
      <PricingToggle packages={packages} />
    </div>
  );
}
