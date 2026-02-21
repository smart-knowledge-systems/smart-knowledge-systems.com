import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#4f46e5",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {/* Connecting lines */}
        <line
          x1="12"
          y1="4"
          x2="5"
          y2="12"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <line
          x1="12"
          y1="4"
          x2="19"
          y2="12"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <line
          x1="5"
          y1="12"
          x2="8"
          y2="20"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <line
          x1="19"
          y1="12"
          x2="16"
          y2="20"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        <line
          x1="8"
          y1="20"
          x2="16"
          y2="20"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        {/* Nodes */}
        <circle cx="12" cy="4" r="2.5" fill="white" />
        <circle cx="5" cy="12" r="2.5" fill="white" />
        <circle cx="19" cy="12" r="2.5" fill="white" />
        <circle cx="8" cy="20" r="2.5" fill="white" />
        <circle cx="16" cy="20" r="2.5" fill="white" />
      </svg>
    </div>,
    { ...size }
  );
}
