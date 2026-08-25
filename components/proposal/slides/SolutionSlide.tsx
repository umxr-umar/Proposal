import { Fragment } from "react";
import type { Proposal } from "@/lib/types";
import { OverviewTextSlide } from "./OverviewTextSlide";

/**
 * "Solution" — second of three sub-slides under "01. Project Overview".
 * Values pulled 1:1 from Figma (fileKey 9zJsrpEfg7A14jCenBEZE1, node
 * 26:311). See ProblemSlide/OverviewTextSlide for the shared layout notes.
 */
export function SolutionSlide({ proposal }: { proposal: Proposal }) {
  return (
    <OverviewTextSlide
      label="Solution"
      bodyWidth={677}
      bodyGap={174}
      paragraphs={[
        <Fragment key="p1">
          The new website will transform {proposal.clientName}&rsquo;s
          online presence into an interactive and immersive portfolio
          experience. It will retain the agency&rsquo;s signature blend of
          digital and analog aesthetics.
        </Fragment>,
        <Fragment key="p2">
          Subtle micro-interactions and strategic motion design will
          enhance the user experience, making the site feel dynamic yet
          intuitive.
        </Fragment>,
        <Fragment key="p3">
          The design will maintain the agency&rsquo;s distinctive visual
          identity, leveraging dark charcoal and off-white tones with
          vivid accent colors to reinforce brand recognition.
        </Fragment>,
      ]}
    />
  );
}
