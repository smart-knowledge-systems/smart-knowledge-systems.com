// Landing page content for /codeindex
// All marketing copy lives here — components only import and render

export const hero = {
  headline: "Understand Your Code. At Any Scale.",
  subheadline:
    "Semantic search that finds what code does, not just what it says. Works locally. Scales across repos. Free for production use.",
  trustLine: "Source-available · BSL 1.1 · 14 languages · Works offline",
  costCallout: "42 repos indexed for $0.17",
  ctas: {
    primary: { text: "Get Started in 30s", href: "#quick-start" },
    github: {
      text: "GitHub",
      href: "https://github.com/smart-knowledge-systems/codeindex",
    },
    benchmarks: { text: "See Benchmarks →", href: "/codeindex/benchmarks" },
  },
  terminalComparison: {
    grep: {
      label: "grep 'error handling'",
      results: [
        "src/utils/logger.ts:14   // error handling for edge cases",
        "src/api/routes.ts:89     const errorHandling = 'strict'",
        "README.md:45             ## Error Handling Guide",
        "tests/mock.ts:12         // TODO: add error handling",
        "src/config.ts:33         error_handling_mode: 'verbose'",
        "docs/setup.md:78         Error handling is configured via...",
        "src/old/deprecated.ts:5  // legacy error handling",
        "... 493 more results",
      ],
    },
    codeindex: {
      label: "codeindex search 'error handling'",
      results: [
        "src/middleware/error-boundary.ts     — Express error middleware with retry logic",
        "src/services/payment/retry.ts        — Payment failure recovery with exponential backoff",
        "src/api/handlers/validate.ts          — Request validation with structured error responses",
      ],
    },
  },
};

export const problemStatement = {
  headline: "Code Search is Broken",
  transition:
    "Your teams search code every day. They shouldn't need three tools.",
  cards: [
    {
      tool: "grep / ripgrep",
      tagline: "Fast but dumb",
      description:
        'Keyword matches only, no cross-repo awareness. Searching "error handling" returns every comment and string literal — not actual error handlers.',
    },
    {
      tool: "IDE Search",
      tagline: "Local and limited",
      description:
        "One project at a time. Can't show patterns across your architecture. No structural awareness beyond the current workspace.",
    },
    {
      tool: "GitHub Search",
      tagline: "Cloud, limited",
      description:
        "GitHub-only, no cross-repo intelligence, no semantic understanding. And it costs money at scale.",
    },
  ],
};

export const pillars = {
  headline: "How codeindex Works",
  items: [
    {
      title: "Semantic Search",
      tagline: "Finds code intent, not strings.",
      description:
        'Search "authentication middleware" — grep returns noise, codeindex returns validators, handlers, and schemas.',
      stat: { value: "3.1x", label: "better MRR than ripgrep" },
      example: {
        query: "authentication middleware",
        grepResults: [
          "config.ts:12   auth_middleware: true",
          "README.md:34   # Authentication Middleware",
          "test/mock.ts:8  // stub auth middleware",
        ],
        codeindexResults: [
          "src/middleware/auth.ts         — JWT validation and session refresh",
          "src/api/guards/permissions.ts  — Role-based access control middleware",
          "src/auth/schemas/token.ts      — Token validation schemas",
        ],
      },
    },
    {
      title: "Cross-Repo Intelligence",
      tagline: "See dependencies across your architecture.",
      description:
        "`codeindex xref UserDTO` finds every caller across all indexed repos. Map blast radius in seconds, not hours.",
      stat: { value: "2-3x", label: "faster blast-radius analysis" },
    },
    {
      title: "Agent-Native (MCP)",
      tagline: "Claude, Cursor, Windsurf integrate instantly.",
      description:
        "Session caching, batch queries, multi-agent deduplication. Your AI tools get smarter context with less cost.",
      stat: { value: "30-60%", label: "cost reduction for agent teams" },
    },
  ],
};

export const benchmarkHighlights = {
  headline: "Benchmarked Against Real Code",
  subheadline: "73 queries · 6 repositories · Methodology is public",
  stats: [
    { value: "3.1x", label: "better MRR" },
    { value: "3.0x", label: "better HitRate@5" },
    { value: "2.9x", label: "better nDCG@10" },
    { value: "$0.17", label: "to index 42 repos" },
  ],
  detail: "7,579 files · 8.5M tokens · OpenAI text-embedding-3-small",
  cta: { text: "See Full Benchmarks →", href: "/codeindex/benchmarks" },
};

export const personaCards = {
  headline: "Built for How You Work",
  cards: [
    {
      persona: "Solo Developers",
      tagline: "Onboard 5x faster",
      description:
        'Search "payment handling" and find all payment logic in seconds — no grepping through directory trees.',
    },
    {
      persona: "AI Agents",
      tagline: "Agents work cheaper",
      description:
        "Session caching (20-30% savings), batch queries (15-20%), deduplication (10-25%). 42 repos indexed for $0.17.",
    },
    {
      persona: "Platform Teams",
      tagline: "Architecture visibility in seconds",
      description:
        "`codeindex xref` traces dependencies across repos. Map blast radius before you ship.",
    },
    {
      persona: "Enterprise",
      tagline: "Security by design",
      description:
        "Local embeddings, pre-embedding secret scanning, scoped tokens, air-gapped deployment. Your code never leaves your network.",
    },
  ],
};

export const quickStart = {
  headline: "Up and Running in 30 Seconds",
  subtext: "Minimal config. BYO API keys or run locally with Ollama.",
  steps: [
    { command: "git clone https://github.com/smart-knowledge-systems/codeindex.git && cd codeindex && bun install && bun src/index.ts init", label: "Install" },
    {
      command: 'bun src/index.ts search "authentication middleware"',
      label: "Search",
    },
  ],
};

export const comparisonSummary = {
  headline: "How We Compare",
  cta: { text: "See Full Comparison →", href: "/codeindex/compare" },
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
      codeindex: true,
      grep: false,
      github: false,
      sourcegraph: "Config required",
    },
    {
      feature: "Self-hosted",
      codeindex: true,
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
      feature: "Source-available",
      codeindex: true,
      grep: true,
      github: false,
      sourcegraph: false,
    },
    {
      feature: "Cost",
      codeindex: "Free + infra",
      grep: "Free",
      github: "$$",
      sourcegraph: "$$$",
    },
  ],
};

export const honestySection = {
  headline: "When NOT to Use codeindex",
  intro:
    "We tested this. Grep wins in specific scenarios. We're honest about tradeoffs.",
  items: [
    {
      scenario: "Small codebase (<10K LOC)",
      recommendation: "grep is fine — the overhead isn't worth it.",
    },
    {
      scenario: "Exact filename search",
      recommendation: "Use `find` or `fd`. We're not a file finder.",
    },
    {
      scenario: "Need <500ms cold start",
      recommendation:
        "Embedding has startup cost. Warm queries are fast, but first run takes time.",
    },
    {
      scenario: "Unsupported language",
      recommendation:
        "We support 14 languages. Adding more is straightforward via tree-sitter, but we won't pretend we cover everything yet.",
    },
  ],
};

export const ctaFooter = {
  headline: "Ready to understand your codebase?",
  tiers: [
    {
      level: "Quick Start",
      label: "Copy-paste and go",
      command: "git clone https://github.com/smart-knowledge-systems/codeindex.git && cd codeindex && bun install && bun src/index.ts init",
    },
    {
      level: "Learn More",
      label: "Read the docs",
      href: "https://github.com/smart-knowledge-systems/codeindex",
    },
    {
      level: "Talk to Us",
      label: "Schedule a demo",
      href: "https://calendly.com/saras-books/smart-knowledge-systems-consultation",
    },
  ],
};
