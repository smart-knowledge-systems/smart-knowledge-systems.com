import { ImageResponse } from "next/og";

export const alt = "cidx-cloud — Managed Semantic Search";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "6px 16px",
          borderRadius: 9999,
          border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#10b981",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.05em",
          marginBottom: 28,
        }}
      >
        EARLY ACCESS
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.03em",
          fontFamily: "monospace",
          marginBottom: 16,
        }}
      >
        cidx-cloud
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#22d3ee",
          marginBottom: 20,
        }}
      >
        Managed semantic search for your team
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#94a3b8",
          textAlign: "center",
          maxWidth: 650,
          justifyContent: "center",
          lineHeight: 1.5,
        }}
      >
        Everything codeindex does locally — hosted and managed. No infrastructure to maintain.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 40,
          gap: 24,
          alignItems: "center",
        }}
      >
        {["Cross-repo intelligence", "MCP integration", "Team dashboards"].map(
          (tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 9999,
                border: "1px solid rgba(100, 116, 139, 0.4)",
                color: "#cbd5e1",
                fontSize: 15,
              }}
            >
              {tag}
            </div>
          )
        )}
      </div>
    </div>,
    { ...size }
  );
}
