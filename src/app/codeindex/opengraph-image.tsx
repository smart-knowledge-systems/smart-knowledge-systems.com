import { ImageResponse } from "next/og";

export const alt = "codeindex — Semantic Code Search";
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
          fontSize: 28,
          fontWeight: 700,
          color: "#22d3ee",
          marginBottom: 24,
          letterSpacing: "-0.02em",
        }}
      >
        codeindex
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 56,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          maxWidth: 900,
          justifyContent: "center",
        }}
      >
        Understand Your Code. At Any Scale.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "#94a3b8",
          marginTop: 20,
          textAlign: "center",
          maxWidth: 700,
          justifyContent: "center",
        }}
      >
        Semantic search that finds what code does, not just what it says.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 40,
          gap: 24,
          alignItems: "center",
        }}
      >
        {["18 languages", "Works offline", "Free for production"].map(
          (tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 9999,
                border: "1px solid rgba(34, 211, 238, 0.3)",
                color: "#22d3ee",
                fontSize: 16,
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
