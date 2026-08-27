import type { Proposal } from "./types";
import { fetchAllProposalSlugs, fetchProposalBySlug } from "./notion";

/**
 * Proposals live in Notion ("Proposals" + "Proposal Items" databases, see
 * lib/notion.ts) — there is no local data file and no admin login. Adding a
 * client means adding a row in Notion; the /p/<slug> link goes live
 * immediately, with no code change and no redeploy.
 */
export async function getProposal(slug: string): Promise<Proposal | undefined> {
  return fetchProposalBySlug(slug);
}

export async function getAllProposalSlugs(): Promise<string[]> {
  return fetchAllProposalSlugs();
}
