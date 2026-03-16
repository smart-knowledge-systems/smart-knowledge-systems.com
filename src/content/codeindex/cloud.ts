// Waitlist page content for /codeindex/cloud
// All marketing copy lives here — components only import and render

export const cloudPage = {
  headline: "cidx-cloud",
  badge: "Early Access",
  tagline: "Managed semantic search for your team",
  description:
    "Everything codeindex does locally — semantic search, cross-repo intelligence, MCP integration — hosted and managed for your team. No infrastructure to maintain.",
  features: [
    {
      title: "Managed Indexing",
      description:
        "Connect your repos and we handle indexing, updates, and drift detection automatically.",
    },
    {
      title: "Team Search",
      description:
        "Shared semantic search across all your repositories with role-based access controls.",
    },
    {
      title: "MCP Server",
      description:
        "Managed MCP endpoint your whole team can connect to from Claude Code, Cursor, or Copilot.",
    },
    {
      title: "Zero Setup",
      description:
        "No API keys to manage, no embeddings to configure, no infrastructure to maintain.",
    },
  ],
  waitlist: {
    headline: "Join the Waitlist",
    description:
      "cidx-cloud is in early development. Sign in with Google to join the waitlist and get early access.",
    successMessage:
      "You're on the list. We'll reach out when early access opens.",
  },
  backLink: {
    text: "← Back to codeindex",
    href: "/codeindex",
  },
};
