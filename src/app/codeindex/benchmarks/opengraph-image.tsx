import { ImageResponse } from "next/og";

export const alt = "codeindex Benchmarks — Proven Results";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats = [
  { value: "3.1x", label: "MRR" },
  { value: "3.0x", label: "HitRate@5" },
  { value: "2.6x", label: "Precision@5" },
  { value: "2.9x", label: "nDCG@10" },
  { value: "$0.17", label: "42 repos" },
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
        alignItems: "center",
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
        codeindex benchmarks
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 48,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          marginBottom: 16,
        }}
      >
        Proven Results. Reproducible Methodology.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#94a3b8",
          marginBottom: 48,
        }}
      >
        vs ripgrep across 73 queries and 6 real-world repositories
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 32px",
              borderRadius: 12,
              border: "1px solid rgba(51, 65, 85, 0.6)",
              background: "rgba(30, 41, 59, 0.5)",
              minWidth: 160,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 40,
                fontWeight: 800,
                color: "#22d3ee",
                fontFamily: "monospace",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 15,
                color: "#94a3b8",
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
