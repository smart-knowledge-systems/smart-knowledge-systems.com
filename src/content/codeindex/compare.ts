// Comparison data for /codeindex/compare
// All comparison copy and data live here — components only import and render

export const compareHero = {
  headline: "How codeindex Compares",
  subheadline:
    "Every tool has its sweet spot. Here's ours — and where alternatives might serve you better.",
};

export type CellValue = boolean | string;

export interface FeatureRow {
  feature: string;
  codeindex: CellValue;
  grep: CellValue;
  github: CellValue;
  sourcegraph: CellValue;
}

export const featureMatrix: {
  headline: string;
  columns: string[];
  rows: FeatureRow[];
} = {
  headline: "Feature Matrix",
  columns: ["codeindex", "grep / ripgrep", "GitHub Search", "Sourcegraph"],
  rows: [
    {
      feature: "Semantic search",
      codeindex: true,
      grep: false,
      github: "Limited",
      sourcegraph: true,
    },
    {
      feature: "Cross-repo",
      codeindex: "Native",
      grep: false,
      github: "Per-repo",
      sourcegraph: "Config required",
    },
    {
      feature: "Self-hosted",
      codeindex: "Full",
      grep: "N/A",
      github: false,
      sourcegraph: "Partial",
    },
    {
      feature: "Agent integration (MCP)",
      codeindex: true,
      grep: false,
      github: false,
      sourcegraph: false,
    },
    {
      feature: "Languages",
      codeindex: "14 built-in",
      grep: "Any",
      github: "Any",
      sourcegraph: "Java/Python/Go focused",
    },
    {
      feature: "Cost",
      codeindex: "Free + infra",
      grep: "Free",
      github: "$$",
      sourcegraph: "$$$",
    },
    {
      feature: "Source-available",
      codeindex: "Yes (BSL 1.1)",
      grep: "Yes (OSS)",
      github: false,
      sourcegraph: false,
    },
    {
      feature: "Data residency",
      codeindex: "Full control",
      grep: "Local",
      github: "Cloud",
      sourcegraph: "Cloud-first",
    },
    {
      feature: "Offline support",
      codeindex: "Yes (Ollama)",
      grep: true,
      github: false,
      sourcegraph: false,
    },
  ],
};

export interface CompetitorComparison {
  name: string;
  slug: string;
  theyWin: {
    headline: string;
    points: string[];
  };
  weWin: {
    headline: string;
    points: string[];
  };
  summary: string;
  costComparison?: {
    theirs: string;
    ours: string;
  };
}

export const competitors: CompetitorComparison[] = [
  {
    name: "ripgrep",
    slug: "ripgrep",
    theyWin: {
      headline: "ripgrep wins when...",
      points: [
        "You need the fastest exact-match search — ripgrep is unbeatable for literal strings",
        "Zero setup is essential — it's already on most dev machines",
        "You're searching for a specific error message or known identifier",
      ],
    },
    weWin: {
      headline: "codeindex wins when...",
      points: [
        "You need to understand intent — 3.1x better MRR on semantic queries",
        "You're searching across multiple repositories simultaneously",
        "You need structure awareness — find auth flows, not just 'auth' mentions",
      ],
    },
    summary:
      "Use ripgrep for 'find this error message'. Use codeindex for 'where is the auth flow?'",
  },
  {
    name: "Sourcegraph",
    slug: "sourcegraph",
    theyWin: {
      headline: "Sourcegraph wins when...",
      points: [
        "You need an enterprise SLA and dedicated support team",
        "You're already invested in their ecosystem and workflows",
        "You need the most mature code intelligence platform available",
      ],
    },
    weWin: {
      headline: "codeindex wins when...",
      points: [
        "Cost matters — no per-seat licensing, ~40% cheaper at scale",
        "Agent-native MCP integration is a requirement",
        "You need source-available code you can audit and modify",
        "You need broad language support including Rust, Swift, and Kotlin",
      ],
    },
    summary:
      "Sourcegraph is the established enterprise choice. codeindex is the agent-native, cost-effective alternative.",
    costComparison: {
      theirs: "100 engineers: ~$2-3K+/mo (per-seat licensing)",
      ours: "100 engineers: ~$500-1K/mo (infrastructure only)",
    },
  },
  {
    name: "GitHub Code Search",
    slug: "github",
    theyWin: {
      headline: "GitHub Search wins when...",
      points: [
        "All your code is on GitHub and you need basic search",
        "You want zero setup — it's built into your existing workflow",
        "You're searching public repositories you don't have locally",
      ],
    },
    weWin: {
      headline: "codeindex wins when...",
      points: [
        "You need multi-repo semantic search across any git host",
        "Your code lives on GitLab, Bitbucket, or self-hosted repos",
        "You need agent integration for AI-powered development",
        "You want your code searchable offline",
      ],
    },
    summary:
      "GitHub Search is convenient for GitHub-only workflows. codeindex works everywhere your code lives.",
  },
];

export const honestPositioning = {
  headline: "Honest Positioning",
  body: "Every tool has its sweet spot. We built codeindex for semantic, cross-repo, agent-native code search. If your needs are simpler, simpler tools may serve you better — and that's fine.",
};
