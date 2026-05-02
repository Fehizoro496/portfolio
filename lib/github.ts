export interface GitHubStats {
  publicRepos: number;
  stars: number;
  contributions: number;
  contribLevels: number[]; // N values (weeks × 7 days), Sunday-first
  startDate: string;       // ISO date of the first cell (e.g. "2025-04-27")
  languages: { name: string; pct: number; color: string }[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#6366F1",
  Dart: "#0EA5E9",
  JavaScript: "#F59E0B",
  "C++": "#10B981",
  Python: "#8B5CF6",
  HTML: "#F97316",
  Other: "#A78BFA",
};

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-build/1.0",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };

  // 1. User profile
  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    headers,
    next: { revalidate: 86400 },
  });
  const user = await userRes.json();
  const publicRepos: number = user.public_repos ?? 0;

  // 2. Repos - count stars + aggregate languages
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 86400 } }
  );
  const repos: { stargazers_count: number; language: string | null }[] = await reposRes.json();
  const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);

  const langCounts: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
  });
  const totalLangs = Object.values(langCounts).reduce((s, v) => s + v, 0) || 1;
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      pct: Math.round((count / totalLangs) * 100),
      color: LANG_COLORS[name] ?? LANG_COLORS["Other"],
    }));

  // 3. Contribution grid - parse GitHub's contributions page HTML
  const contribRes = await fetch(
    `https://github.com/users/${username}/contributions`,
    {
      headers: { ...headers, Accept: "text/html" },
      next: { revalidate: 86400 },
    }
  );
  const html = await contribRes.text();

  // extract data-date / data-level pairs, sorted by date
  const cells = [...html.matchAll(/data-date="([\d-]+)"[^>]*?data-level="([0-9])"/g)]
    .map((m) => ({ date: m[1], level: parseInt(m[2]) }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const contribLevels = cells.map((c) => c.level);

  // total contributions: try to read stated count from page
  const totalMatch = html.match(/(\d[\d,]+)\s+contributions?\s+in the last year/i);
  const contributions = totalMatch
    ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : cells.filter((c) => c.level > 0).length * 2;

  const startDate = cells.length > 0 ? cells[0].date : "";
  return { publicRepos, stars, contributions, contribLevels, startDate, languages };
}
