"use client";

import { CopyButton } from "@/app/codeindex/components/copy-button";

export function QuickStartBlock({
  command,
  label,
}: {
  command: string;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="text-xs text-slate-500">{label}</span>
        <CopyButton text={command} />
      </div>
      <div className="p-4">
        <code className="font-mono text-sm text-cyan-400">{command}</code>
      </div>
    </div>
  );
}
