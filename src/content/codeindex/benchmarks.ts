// Benchmark data and methodology for /codeindex/benchmarks
// All benchmark numbers and copy live here — components only import and render
// Source: ~/repo/codeindex/eval/local/results/ (2026-03-17)

export const benchmarkHero = {
  headline: "Proven Results. Reproducible Methodology.",
  subheadline:
    "330 queries. 19 repos. 16 languages. Every number LLM-judged and reproducible.",
};

export const summaryStats = [
  {
    value: "1.4x",
    label: "Ranking Quality",
    description: "MRR, P@5, nDCG — all metrics vs expert grep",
  },
  {
    value: "0.718",
    label: "MRR",
    description: "First relevant file typically at rank 1–2",
  },
  {
    value: "330",
    label: "Queries",
    description: "LLM-generated, LLM-judged",
  },
  {
    value: "16",
    label: "Languages",
    description: "Each tested on a real public repo",
  },
  { value: "$0.70", label: "42 repos", description: "Total indexing cost" },
];

export const realWorldCost = {
  headline: "42 repos. Over 100,000 files. $0.70.",
  details: [
    { label: "Model", value: "OpenAI text-embedding-3-small" },
    { label: "Per repo", value: "~$0.017" },
    { label: "Per file", value: "~$0.000007" },
    { label: "Local (Ollama)", value: "$0.00" },
  ],
};

export const multiRepoResults = {
  headline: "Multi-Repo Evaluation Results",
  subheadline:
    "330 queries across 19 repositories — compared against LLM-crafted grep patterns, not naive keyword search",
  rows: [
    {
      metric: "Precision@5",
      codeindex: 0.509,
      ripgrep: 0.361,
      multiplier: "1.4x",
    },
    {
      metric: "HitRate@5",
      codeindex: 0.559,
      ripgrep: 0.387,
      multiplier: "1.4x",
    },
    {
      metric: "MRR",
      codeindex: 0.718,
      ripgrep: 0.499,
      multiplier: "1.4x",
    },
    {
      metric: "nDCG@10",
      codeindex: 0.561,
      ripgrep: 0.4,
      multiplier: "1.4x",
    },
    {
      metric: "Recall",
      codeindex: 0.617,
      ripgrep: 0.815,
      multiplier: "0.76x",
    },
  ],
};

export const perRepoBreakdown = {
  headline: "Per-Repository Breakdown",
  subheadline:
    "codeindex dominates large codebases. Ripgrep wins on small repos with distinctive naming. We show both.",
  repos: [
    {
      name: "unoplatform/uno",
      language: "C#",
      queries: 15,
      hitRate5: { codeindex: 0.77, ripgrep: 0.04 },
      mrr: { codeindex: 0.967, ripgrep: 0.088, multiplier: "11.0x" },
      note: "1.2M LOC — XAML/C# naming creates broad pattern matches",
    },
    {
      name: "elastic/elasticsearch",
      language: "Java",
      queries: 15,
      hitRate5: { codeindex: 0.867, ripgrep: 0.107 },
      mrr: { codeindex: 0.933, ripgrep: 0.187, multiplier: "5.0x" },
      note: "4.1M LOC — patterns like class.*Index match everywhere",
    },
    {
      name: "ReactiveX/RxSwift",
      language: "Swift",
      queries: 15,
      hitRate5: { codeindex: 0.671, ripgrep: 0.2 },
      mrr: { codeindex: 0.85, ripgrep: 0.303, multiplier: "2.8x" },
      note: "Reactive patterns (subscribe, Observable) appear in every file",
    },
    {
      name: "langchain-ai/langchain",
      language: "Python",
      queries: 15,
      hitRate5: { codeindex: 0.71, ripgrep: 0.217 },
      mrr: { codeindex: 0.791, ripgrep: 0.294, multiplier: "2.7x" },
      note: "Python monorepo with domain-specific but non-unique class names",
    },
    {
      name: "kubernetes/kubernetes",
      language: "Go",
      queries: 15,
      hitRate5: { codeindex: 0.787, ripgrep: 0.267 },
      mrr: { codeindex: 1.0, ripgrep: 0.418, multiplier: "2.4x" },
      note: "3.9M LOC — common patterns (func.*Handler) match thousands of files",
    },
    {
      name: "Kong/kong",
      language: "Lua",
      queries: 15,
      hitRate5: { codeindex: 0.507, ripgrep: 0.333 },
      mrr: { codeindex: 0.819, ripgrep: 0.339, multiplier: "2.4x" },
      note: "266k LOC Lua API gateway — codeindex finds plugin handlers by intent",
    },
    {
      name: "discourse/discourse",
      language: "Ruby",
      queries: 15,
      hitRate5: { codeindex: 0.576, ripgrep: 0.242 },
      mrr: { codeindex: 0.656, ripgrep: 0.402, multiplier: "1.6x" },
      note: "764k LOC Rails app — MVC naming conventions create broad matches",
    },
    {
      name: "expressjs/express",
      language: "JavaScript",
      queries: 15,
      hitRate5: { codeindex: 0.444, ripgrep: 0.656 },
      mrr: { codeindex: 0.776, ripgrep: 0.822, multiplier: "0.94x" },
      note: "12k LOC — small enough that grep patterns hit the right files",
    },
    {
      name: "sqlite/sqlite",
      language: "C",
      queries: 15,
      hitRate5: { codeindex: 0.503, ripgrep: 0.557 },
      mrr: { codeindex: 0.694, ripgrep: 0.839, multiplier: "0.83x" },
      note: "Distinctive function names (sqlite3_prepare) are literally greppable",
    },
    {
      name: "BurntSushi/ripgrep",
      language: "Rust",
      queries: 15,
      hitRate5: { codeindex: 0.263, ripgrep: 0.673 },
      mrr: { codeindex: 0.497, ripgrep: 0.761, multiplier: "0.65x" },
      note: "37k LOC — small crate with function names that directly match patterns",
    },
  ],
};

export const perLanguagePerformance = {
  headline: "Per-Language Performance",
  subheadline:
    "16 languages, each tested on a representative public repo. 15 queries per language, LLM-judged.",
  languages: [
    {
      name: "Go",
      mrr: "100%",
      hitRate5: "79%",
      status: "excellent" as const,
      repo: "kubernetes/kubernetes",
    },
    {
      name: "C#",
      mrr: "97%",
      hitRate5: "77%",
      status: "excellent" as const,
      repo: "unoplatform/uno",
    },
    {
      name: "PHP",
      mrr: "97%",
      hitRate5: "79%",
      status: "excellent" as const,
      repo: "laravel/framework",
    },
    {
      name: "Rust",
      mrr: "96%",
      hitRate5: "71%",
      status: "excellent" as const,
      repo: "tangled.org/core",
    },
    {
      name: "Java",
      mrr: "93%",
      hitRate5: "87%",
      status: "excellent" as const,
      repo: "elastic/elasticsearch",
    },
    {
      name: "Swift",
      mrr: "85%",
      hitRate5: "67%",
      status: "excellent" as const,
      repo: "ReactiveX/RxSwift",
    },
    {
      name: "Lua",
      mrr: "82%",
      hitRate5: "51%",
      status: "excellent" as const,
      repo: "Kong/kong",
    },
    {
      name: "Python",
      mrr: "79%",
      hitRate5: "71%",
      status: "good" as const,
      repo: "langchain-ai/langchain",
    },
    {
      name: "JavaScript",
      mrr: "78%",
      hitRate5: "44%",
      status: "good" as const,
      repo: "expressjs/express",
    },
    {
      name: "Kotlin",
      mrr: "71%",
      hitRate5: "65%",
      status: "good" as const,
      repo: "square/okhttp",
    },
    {
      name: "C",
      mrr: "69%",
      hitRate5: "50%",
      status: "good" as const,
      repo: "sqlite/sqlite",
    },
    {
      name: "Ruby",
      mrr: "66%",
      hitRate5: "58%",
      status: "good" as const,
      repo: "discourse/discourse",
    },
    {
      name: "TypeScript",
      mrr: "53%",
      hitRate5: "48%",
      status: "good" as const,
      repo: "shadcn-ui/ui",
    },
    {
      name: "C++",
      mrr: "49%",
      hitRate5: "32%",
      status: "limited" as const,
      repo: "nlohmann/json",
    },
    {
      name: "Elixir",
      mrr: "42%",
      hitRate5: "29%",
      status: "limited" as const,
      repo: "phoenixframework/phoenix",
    },
    {
      name: "Zig",
      mrr: "7%",
      hitRate5: "3%",
      status: "broken" as const,
      repo: "ghostty-org/ghostty (unindexed)",
    },
  ],
};

export const signalContribution = {
  headline: "What Makes It Work — Signal Contribution",
  subheadline:
    "Ablation study on self-eval dataset. Multi-repo validation in progress.",
  signals: [
    {
      name: "Commit message similarity",
      contribution: "25.8%",
      note: "Powerful in repos with strict atomic commits and descriptive messages — 25.8% MRR lift on self-eval. Effect varies widely across the broader 19-repo corpus; investigating contribution by commit hygiene level.",
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
    "330 queries across 19 public repos (17 on GitHub, 2 on tangled.org), 15 queries per repo",
    "3-step pipeline: LLM topic generation → candidate collection (codeindex + ripgrep) → LLM file-level judging",
    "Two ripgrep baselines: rg-naive (literal strings) and rg-regex (literal + regex) — both using LLM-crafted patterns that favor ripgrep",
    "Standard IR metrics: P@5, HitRate@5, MRR, nDCG@10, Recall, Precision@All",
    "Reproducible: eval harness and dataset generation included in the repository",
  ],
  cta: "Run the eval on your codebase",
};

export const knownLimitations = {
  headline: "Known Limitations",
  intro: "We publish what doesn't work alongside what does.",
  items: [
    {
      limitation: "Ripgrep wins on small, well-named repos",
      detail:
        "On repos under ~100k LOC with descriptive identifiers (ripgrep, express, sqlite), grep patterns find files directly. codeindex's ranking advantage only matters when the search space is large enough for noise.",
    },
    {
      limitation: "Zig support",
      detail:
        "ghostty-org/ghostty was not indexed during this eval (batch token limit). 7% MRR reflects an infrastructure gap, not search quality. Now fixed.",
    },
    {
      limitation: "Recall vs ranking tradeoff",
      detail:
        "Ripgrep returns more total files (0.82 recall vs 0.62) because it has no result cap. codeindex returns top-32 results ranked by relevance. If you need exhaustive file lists, grep wins.",
    },
    {
      limitation: "LLM-generated grep patterns favor ripgrep",
      detail:
        "The baseline grep patterns were generated by Claude Sonnet, which knows these public repos. A real developer unfamiliar with a codebase wouldn't know to search for sqlite3_prepare or MiddlewareStack. On private or unfamiliar repos, codeindex's advantage would be larger.",
    },
    {
      limitation: "Cold start latency",
      detail:
        "First query requires loading embeddings. Subsequent queries are fast. On large repos (>1M LOC), codeindex is actually faster than ripgrep — 1.3s vs 1.6s average across all repos.",
    },
  ],
};
