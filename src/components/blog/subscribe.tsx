"use client";

import { useEffect } from "react";

export default function Subscribe() {
  useEffect(() => {
    import("@/components/sequoia-subscribe");
  }, []);

  return (
    <sequoia-subscribe
      publication-uri="at://did:plc:i2fgba5nignuw4nccml33wjp/site.standard.publication/3mfds4aqql323"
      style={
        {
          "--sequoia-accent-color": "#4f46e5",
          "--sequoia-border-radius": "8px",
        } as React.CSSProperties
      }
    />
  );
}
