import type { CaseStudy } from "./types";

/**
 * Real BIFLUX case studies. Taglines and images are pulled from the live
 * biflux.design Framer site (more current than earlier drafts); stats are
 * confirmed against both the site and internal brand notes.
 *
 * Never invent a new case study or fabricate a stat here — if a real one
 * doesn't exist yet, it doesn't go in this file.
 */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  leadgen: {
    slug: "leadgen",
    name: "LeadGeneration.io",
    category: "B2B",
    tagline:
      "LeadGeneration.io had good content buried in an outdated layout. We rebuilt it into a modern site that converts.",
    overview:
      "The client reached out first, no outreach needed. They were already sold before the first call. The stated problem was poor UX and an outdated layout, though the content itself largely had to stay the same.",
    finding:
      "We analyzed 100+ competitor sites in this space. About 99% of them lean on telling (unverifiable claims and inflated stats) instead of showing (real case studies, visible process, real proof). That gap became the core of the redesign.",
    stats: [
      { value: "12+", label: "Pages Designed, Desktop + Mobile" },
      { value: "100+", label: "Competitor Sites Analyzed" },
      { value: "02+ Wks", label: "Full Redesign, Start To Finish" },
    ],
    image: "https://framerusercontent.com/images/5q57g2jNc7PDBauufUsT73Y1YA.webp",
    quote:
      "Working with Umar at BI-FLUX was unlike working with any agency we'd worked with before. He rebuilt our entire website in just two weeks, during Ramadan, but what stood out even more was how much thought went into every decision. Nothing felt random. He spotted problems we hadn't even noticed ourselves.",
    quoteAttribution: "LeadGeneration.io",
  },
  blueocean: {
    slug: "blueocean",
    name: "Blue Ocean Facilities",
    category: "B2B",
    tagline:
      "Blue Ocean Facilities looked like it was built in 2001. We rebuilt it into a modern, conversion-focused website.",
    overview:
      "This came through a referral, followed by a discovery call. The site felt outdated with no clear structure or navigation. It was generating leads, just not qualified ones, and the only inquiry mechanism was a plain contact form.",
    finding:
      "Clients genuinely loved the physical meeting rooms once they were in them. The old site never showed that. Photos existed, but nothing represented the actual quality of the spaces.",
    stats: [
      { value: "08+", label: "Pages Designed, Desktop + Mobile" },
      { value: "32%", label: "Increase In Bookings After Redesign" },
      { value: "07+ Days", label: "Full Redesign, Start To Finish" },
    ],
    image: "https://framerusercontent.com/images/XAcImGEenMl3Wbyst6KRlMx6LqQ.webp",
    detail:
      "7 days total: 1 day discovery, 4 days research, 2 days design. Client-reported results after launch: a 4.92% record all-time-high conversion rate, a 68% increase in conversions, and a 32% increase in ad click-through rate.",
    quote:
      "My manager loves Blue Ocean. It is a fun environment that inspires creativity with the team and the staff always goes above and beyond in all that they do. I don't see us looking to use any other venue for future meetings.",
    quoteAttribution: "American Modern Insurance Group, Cincinnati OH",
  },
  sugarbaby: {
    slug: "sugarbaby",
    name: "Sugar Baby",
    category: "Ecommerce",
    tagline:
      "Sugar Baby was getting traffic, not sales. We rebuilt the homepage and collection page around clear positioning.",
    overview:
      "Homepage and collection page redesign for a Shopify D2C skincare brand built around turmeric and kojic-acid brightening products. Three weeks of design work, start to finish.",
    finding:
      "The storefront was running on an unmodified template. Nothing about the layout was built around how this specific brand's customers actually shop for brightening skincare.",
    stats: [
      { value: "14+", label: "Pages Designed, Desktop + Mobile" },
      { value: "23%", label: "Increase In Average Order Value" },
      { value: "36%", label: "Increase In Sales After Redesign" },
    ],
    image: "https://framerusercontent.com/images/MC4xaQiz79KENvr1n11i7UzYEQ4.webp",
    quote: "Trusting BI-FLUX was one of the best decisions we've made.",
    quoteAttribution: "Sugar Baby",
  },
  shinie: {
    slug: "shinie",
    name: "Shinie",
    category: "Ecommerce",
    tagline:
      "An outdated storefront, rebuilt to actually convert.",
    overview:
      "Homepage and collection page redesign, plus a social media banner, for an at-home IPL hair removal device brand. About one month of work.",
    finding:
      "The product's real advantage wasn't landing on the page. The redesign rebuilt the storefront around the proof points that actually move a buyer on a device like this.",
    stats: [
      { value: "+37%", label: "Conversion" },
      { value: "+29%", label: "Average Order Value" },
      { value: "+36%", label: "Product Page Engagement" },
    ],
    quote:
      "Working with him never felt like working with an agency. It felt like having someone on our own team.",
    quoteAttribution: "Shinie",
  },
};
