import { Portfolio } from "@/components/Portfolio";
import { fetchGitHubStats } from "@/lib/github";
import type { GitHubStats } from "@/lib/github";

const FALLBACK: GitHubStats = {
  publicRepos: 20,
  stars: 2,
  contributions: 213,
  startDate: "2025-04-27",
  languages: [
    { name: "TypeScript", pct: 33, color: "#6366F1" },
    { name: "Dart",       pct: 27, color: "#0EA5E9" },
    { name: "JavaScript", pct: 20, color: "#F59E0B" },
    { name: "C++",        pct: 13, color: "#10B981" },
    { name: "HTML",       pct:  7, color: "#F97316" },
  ],
  contribLevels: [1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,1,0,0,1,2,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,2,2,1,1,2,0,0,2,1,1,1,1,1,0,2,2,2,1,0,0,0,2,1,1,1,1,0,0,0,4,1,1,1,0,0,1,3,2,1,2,0,0,1,1,2,0,1,0,0,1,1,1,2,0,0,0,0,1,1,1,0,0,0,1,1,2,1,0,0,0,1,1,1,2,1,0,0,1,1,0,0,1,0,0,1,2,1,1,0,0,0,0,0,0,1,0,0,0,1,1,2,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0,0,1,1,1,0,0,0,1,1,0,0,1,1,1,0,2,1,0,1,1,0,0,1,2,1,1,2,2,0,1,1,1,2,2,1,0,2,1,2,1,1,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,3,4,2,2,1,2,0,0,1,2,3,0,0,1,0,1,1,1,1,2,0,2,4,4,2,2,1,0,3,2,4,0,0,4,0,2,2,0,2,1,1,0,1,2,1,3,1,2,0,0,2,3,2,4,3,0,3,1,0,2,0,1,0,2,2,2,3,1,2,1,1,3,3,2,1,0,1,3,1,1,0,2,1,1,0,2,3,1,0,1,1,0,3,1,0,2,1,1,0,2,1,1,1,1,2,1,1,0,0,2,1,1,0,0,0,0,1,0],
};

export default async function Page() {
  let githubStats: GitHubStats = FALLBACK;
  try {
    githubStats = await fetchGitHubStats("Fehizoro496");
  } catch {
    // network unavailable at build time → use fallback
  }
  return <Portfolio githubStats={githubStats} />;
}
