"use client";

import { useEffect } from "react";

export default function BlueskyComments({ atUri }: { atUri: string }) {
  useEffect(() => {
    // Load the sequoia-comments web component (installed via: npx sequoia add sequoia-comments)
    import("@/components/sequoia-comments");
  }, []);

  return (
    <sequoia-comments
      document-uri={atUri}
      style={
        {
          "--sequoia-accent-color": "#4f46e5",
          "--sequoia-fg-color": "#374151",
          "--sequoia-secondary-color": "#6b7280",
          "--sequoia-border-color": "#e5e7eb",
          "--sequoia-bg-color": "#ffffff",
          "--sequoia-border-radius": "8px",
        } as React.CSSProperties
      }
    />
  );
}
