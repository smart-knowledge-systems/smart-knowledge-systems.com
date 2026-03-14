// Benchmark data and methodology for /codeindex/benchmarks
// All benchmark numbers and copy live here — components only import and render

export const benchmarkHero = {
  headline: "Proven Results. Reproducible Methodology.",
  subheadline:
    "Every number on this page comes from real evaluation runs you can reproduce.",
};

export const summaryStats = [
  { value: "3.1x", label: "MRR", description: "Mean Reciprocal Rank" },
  { value: "3.0x", label: "HitRate@5", description: "Hit Rate at 5 results" },
  { value: "2.6x", label: "Precision@5", description: "Precision at 5 results" },
  { value: "2.9x", label: "nDCG@10", description: "Normalized Discounted Cumulative Gain" },
  { value: "$0.17", label: "42 repos", description: "Total indexing cost" },
];

export const realWorldCost = {
  headline: "42 repos. 7,579 files. 8.5 million tokens. $0.17.",
  details: [
    { label: "Model", value: "OpenAI text-embedding-3-small" },
    { label: "Per repo", value: "~$0.004" },
    { label: "Per file", value: "~$0.00002" },
    { label: "Local (Ollama)", value: "$0.00" },
  ],
};

export const multiRepoResults = {
  headline: "Multi-Repo Evaluation Results",
  subheadline: "73 queries across 6 real-world repositories",
  rows: [
    {
      metric: "Precision@5",
      codeindex: 0.238,
      ripgrep: 0.093,
      multiplier: "2.6x",
    },
    {
      metric: "HitRate@5",
      codeindex: 0.445,
      ripgrep: 0.147,
      multiplier: "3.0x",
    },
    {
      metric: "Recall",
      codeindex: 0.545,
      ripgrep: 0.25,
      multiplier: "2.2x",
    },
    {
      metric: "MRR",
      codeindex: 0.534,
      ripgrep: 0.172,
      multiplier: "3.1x",
    },
    {
      metric: "nDCG@10",
      codeindex: 0.454,
      ripgrep: 0.154,
      multiplier: "2.9x",
    },
  ],
};

export const perRepoBreakdown = {
  headline: "Per-Repository Breakdown",
  subheadline: "Performance varies by codebase — here are the real numbers.",
  repos: [
    {
      name: "OpenViking",
      queries: 10,
      hitRate5: { codeindex: 0.6, ripgrep: 0.1 },
      mrr: { codeindex: 0.714, ripgrep: 0.06, multiplier: "11.9x" },
      note: "Deeply nested modules — semantic search excels",
    },
    {
      name: "app.read-by-ear.com",
      queries: 12,
      hitRate5: { codeindex: 0.5, ripgrep: 0.083 },
      mrr: { codeindex: 0.549, ripgrep: 0.09, multiplier: "6.1x" },
      note: "React + API codebase",
    },
    {
      name: "ai.sara-monorepo",
      queries: 15,
      hitRate5: { codeindex: 0.467, ripgrep: 0.133 },
      mrr: { codeindex: 0.522, ripgrep: 0.09, multiplier: "5.8x" },
      note: "Large monorepo with multiple services",
    },
    {
      name: "kiri",
      queries: 12,
      hitRate5: { codeindex: 0.417, ripgrep: 0.167 },
      mrr: { codeindex: 0.536, ripgrep: 0.142, multiplier: "3.8x" },
      note: "Rust codebase",
    },
    {
      name: "tangled-core",
      queries: 12,
      hitRate5: { codeindex: 0.333, ripgrep: 0.167 },
      mrr: { codeindex: 0.452, ripgrep: 0.147, multiplier: "3.1x" },
      note: "Core library with dense logic",
    },
    {
      name: "muratec-logistics-2",
      queries: 12,
      hitRate5: { codeindex: 0.333, ripgrep: 0.25 },
      mrr: { codeindex: 0.397, ripgrep: 0.302, multiplier: "1.3x" },
      note: "Descriptive naming helps grep — closest competition",
    },
  ],
};

export const perLanguagePerformance = {
  headline: "Per-Language Performance",
  subheadline: "65 queries from self-evaluation dataset",
  languages: [
    { name: "PHP", mrr: "100%", hitRate5: "100%", status: "excellent" as const },
    { name: "Kotlin", mrr: "93%", hitRate5: "100%", status: "excellent" as const },
    { name: "Ruby", mrr: "90%", hitRate5: "100%", status: "excellent" as const },
    { name: "Scala", mrr: "87%", hitRate5: "100%", status: "excellent" as const },
    { name: "Swift", mrr: "73%", hitRate5: "80%", status: "good" as const },
    { name: "Original Code", mrr: "70%", hitRate5: "78.4%", status: "good" as const },
    { name: "Prose/Docs", mrr: "40%", hitRate5: "47%", status: "limited" as const },
    { name: "Lua", mrr: "0%", hitRate5: "0%", status: "broken" as const },
  ],
};

export const signalContribution = {
  headline: "What Makes It Work — Signal Contribution",
  subheadline: "Ablation study showing which signals matter most.",
  signals: [
    {
      name: "Commit message similarity",
      contribution: "25.8%",
      note: "Strongest signal — matches query against recent commit messages with exponential recency decay. Files whose commits semantically relate to your search rank higher.",
    },
    {
      name: "Parent directory boost",
      contribution: "5.9%",
      note: "Propagates directory-level relevance scores to child files, so files in semantically relevant directories rank higher.",
    },
    {
      name: "Child-to-parent",
      contribution: "0%",
      note: "No measurable effect — honestly disclosed",
    },
  ],
};

export const methodology = {
  headline: "Methodology",
  points: [
    "65-query self-eval dataset + 73-query multi-repo dataset",
    "Queries designed by developers, not cherry-picked",
    "Standard IR metrics: Precision@5, HitRate@5, MRR, nDCG@10, Recall",
    "Reproducible: evaluation harness included in the repository",
  ],
  cta: "Run the eval on your codebase",
};

export const knownLimitations = {
  headline: "Known Limitations",
  intro: "We publish what doesn't work alongside what does.",
  items: [
    {
      limitation: "Prose/documentation queries",
      detail:
        "47% HitRate — semantic search is optimized for code structure, not natural language docs.",
    },
    {
      limitation: "Lua support",
      detail: "Skeleton extraction is currently broken. We're working on it.",
    },
    {
      limitation: "Single-word generic targets",
      detail:
        "Both codeindex and grep struggle with overly generic queries. Be specific.",
    },
    {
      limitation: "Cold start latency",
      detail:
        "First query requires loading embeddings. Subsequent queries are fast. grep has no cold start.",
    },
  ],
};
