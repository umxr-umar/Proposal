export type ProjectType =
  | "Website Design"
  | "Website Redesign"
  | "Landing Page Design"
  | "No-Code Development";

export type ProposalStatus = "draft" | "sent" | "accepted";

export type ProposalImage = {
  src: string;
  caption?: string;
};

export type PricingPackage = {
  name: string;
  price: string;
  note?: string;
  bullets: string[];
};

export type TimelineStep = {
  name: string;
  duration: string;
  description: string;
};

export type PaymentLinks = {
  payoneer?: string;
  wise?: string;
};

export type Proposal = {
  slug: string;
  clientName: string;
  clientEmail?: string;
  projectType: ProjectType;
  heroHeadline?: string;
  heroLede?: string;
  situation?: string;
  approachNotes?: string;
  caseStudySlugs: string[];
  images?: ProposalImage[];
  packages: PricingPackage[];
  timeline: TimelineStep[];
  paymentLinks?: PaymentLinks;
  status: ProposalStatus;
  createdAt: string;
  /** Short cinematic brand intro, plays before the hero. Optional — add the file later. */
  introVideoUrl?: string;
  /** A short personal video message addressed to this client. Optional — add the file later. */
  personalMessageVideoUrl?: string;
};

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  finding: string;
  detail?: string;
  stats: CaseStudyStat[];
  image?: string;
  quote?: string;
  quoteAttribution?: string;
};
