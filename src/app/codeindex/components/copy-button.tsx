"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-700 hover:text-slate-300"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
