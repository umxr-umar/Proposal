import fs from "node:fs";
import path from "node:path";
import type { Proposal } from "./types";

/**
 * Every proposal is a plain data file under /data/proposals. There is no
 * database and no admin login: adding a client means adding a file here
 * and pushing. Vercel redeploys and the new /p/<slug> link is live.
 */
const PROPOSALS_DIR = path.join(process.cwd(), "data", "proposals");

function listProposalFiles(): string[] {
  if (!fs.existsSync(PROPOSALS_DIR)) return [];
  return fs
    .readdirSync(PROPOSALS_DIR)
    .filter((file) => file.endsWith(".ts"));
}

export async function getAllProposals(): Promise<Proposal[]> {
  const files = listProposalFiles();
  const proposals = await Promise.all(
    files.map(async (file) => {
      const mod = await import(`../data/proposals/${file}`);
      return mod.proposal as Proposal;
    })
  );
  return proposals;
}

export async function getProposal(slug: string): Promise<Proposal | undefined> {
  const proposals = await getAllProposals();
  return proposals.find((p) => p.slug === slug);
}

export async function getAllProposalSlugs(): Promise<string[]> {
  const proposals = await getAllProposals();
  return proposals.map((p) => p.slug);
}
