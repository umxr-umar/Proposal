import type { Proposal } from "@/lib/types";

export const proposal: Proposal = {
  slug: "acme-roofing",
  clientName: "Acme Roofing Co",
  projectType: "Website Design",
  heroHeadline: "We Build Websites That Turn Cold Traffic Into Customers.",
  heroLede: "Acme Roofing Co, built to convert.",
  situation:
    "Their current site has no clear navigation and the mobile menu breaks on Android.\nThe contact form has no confirmation step, so leads think it failed and email directly asking if it went through.",
  approachNotes:
    "We'll focus research on three competitor roofing sites in the same metro area to find what's actually winning quotes.",
  caseStudySlugs: ["leadgen", "blueocean"],
  images: [],
  packages: [
    {
      name: "Design Only",
      price: "£2,400",
      note: "one-time, plus 90 days support",
      bullets: [
        "New homepage and 4 service pages",
        "Mobile-first rebuild",
        "90 days post-launch support",
      ],
    },
    {
      name: "Design + No-Code Build",
      price: "£3,600",
      note: "one-time, plus 90 days support",
      bullets: [
        "Everything in Design Only",
        "Full Framer build and launch",
        "Analytics handoff call",
      ],
    },
  ],
  timeline: [
    {
      name: "Discovery Call",
      duration: "Day 1",
      description: "Quick call to confirm scope and gather brand assets.",
    },
    {
      name: "Research",
      duration: "Days 2-4",
      description: "Competitor analysis and finding the real gap.",
    },
    {
      name: "Design",
      duration: "Days 5-7",
      description: "Full page designs, reviewed with you before build.",
    },
  ],
  paymentLinks: {
    // Add your Payoneer / Wise payment request link for this client here.
    // payoneer: "https://payoneer.me/...",
    // wise: "https://wise.com/pay/...",
  },
  status: "sent",
  createdAt: "2026-08-20T10:00:00.000Z",
  // introVideoUrl: "/videos/acme-roofing/intro.mp4",
  // personalMessageVideoUrl: "/videos/acme-roofing/message.mp4",
};
