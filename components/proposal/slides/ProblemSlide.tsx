import { Fragment } from "react";
import type { Proposal } from "@/lib/types";
import { OverviewTextSlide } from "./OverviewTextSlide";

/**
 * "Problem" — first of three sub-slides under "01. Project Overview"
 * (Problem / Solution / Impact each get their own top-level deck slide,
 * per the TOC's click target math, even though they share one TOC entry).
 * Values pulled 1:1 from Figma (fileKey 9zJsrpEfg7A14jCenBEZE1, node 26:300).
 * Shared layout lives in OverviewTextSlide — see there for the header/body/
 * footer mechanics (Inter throughout, nav-safe bottom anchoring, etc).
 */
export function ProblemSlide({ proposal }: { proposal: Proposal }) {
  return (
    <OverviewTextSlide
      label="Problem"
      bodyWidth={710}
      bodyGap={174}
      paragraphs={[
        <Fragment key="p1">
          {proposal.clientName}&rsquo;s current website is a minimal holding
          page that, while intriguing, does not effectively showcase their
          portfolio or communicate their capabilities.
        </Fragment>,
        <Fragment key="p2">
          Initially designed to drive curiosity and mystery, the site has
          served its purpose but now needs to evolve. As the agency
          matures and builds a strong body of work, it requires a digital
          presence that not only captivates but also validates their
          credibility in the industry.
        </Fragment>,
        <Fragment key="p3">
          The challenge is to create a site that remains true to{" "}
          {proposal.clientName}&rsquo;s unique branding while ensuring
          usability, clarity, and a compelling user experience for both
          prospective clients and creative professionals.
        </Fragment>,
      ]}
    />
  );
}
