import { ImageResponse } from "next/og";

export const alt = "codeindex vs grep, GitHub Search, Sourcegraph";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tools = ["codeindex", "grep / ripgrep", "GitHub Search", "Sourcegraph"];
const features = [
  { name: "Semantic search", values: ["Yes", "No", "Limited", "Yes"] },
  { name: "Cross-repo", values: ["Native", "No", "Per-repo", "Config req."] },
  { name: "Self-hosted", values: ["Full", "N/A", "No", "Partial"] },
  { name: "Works offline", values: ["Yes", "Yes", "No", "No"] },
];

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        padding: "60px 80px",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          color: "#22d3ee",
          marginBottom: 16,
        }}
      >
        codeindex
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 44,
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.03em",
          marginBottom: 48,
        }}
      >
        How codeindex Compares
      </div>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(51, 65, 85, 0.6)",
          paddingBottom: 16,
          marginBottom: 4,
        }}
      >
        <div style={{ display: "flex", width: 200, fontSize: 15, color: "#64748b" }}>
          Feature
        </div>
        {tools.map((tool) => (
          <div
            key={tool}
            style={{
              display: "flex",
              flex: 1,
              fontSize: 15,
              fontWeight: 600,
              color: tool === "codeindex" ? "#22d3ee" : "#94a3b8",
            }}
          >
            {tool}
          </div>
        ))}
      </div>
      {/* Rows */}
      {features.map((feat) => (
        <div
          key={feat.name}
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
            padding: "14px 0",
          }}
        >
          <div style={{ display: "flex", width: 200, fontSize: 16, color: "#cbd5e1" }}>
            {feat.name}
          </div>
          {feat.values.map((val, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flex: 1,
                fontSize: 16,
                color: i === 0 ? "#22d3ee" : "#64748b",
              }}
            >
              {val}
            </div>
          ))}
        </div>
      ))}
    </div>,
    { ...size }
  );
}
