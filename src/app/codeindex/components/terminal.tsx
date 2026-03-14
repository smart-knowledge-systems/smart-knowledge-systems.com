"use client";

import { useEffect, useState } from "react";

export function TerminalBlock({
  label,
  lines,
  accent = "slate",
}: {
  label: string;
  lines: string[];
  accent?: "slate" | "cyan";
}) {
  const borderColor =
    accent === "cyan" ? "border-cyan-500/30" : "border-slate-700";
  const dotColor = accent === "cyan" ? "bg-cyan-500" : "bg-slate-600";

  return (
    <div
      className={`overflow-hidden rounded-lg border ${borderColor} bg-slate-950`}
    >
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
        <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
        <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="ml-2 font-mono text-xs text-slate-500">{label}</span>
      </div>
      <div className="p-4">
        {lines.map((line, i) => (
          <div key={i} className="font-mono text-xs leading-6 text-slate-400">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnimatedTerminalComparison({
  grep,
  codeindex,
}: {
  grep: { label: string; results: string[] };
  codeindex: { label: string; results: string[] };
}) {
  const [visibleGrep, setVisibleGrep] = useState(0);
  const [visibleCodeindex, setVisibleCodeindex] = useState(0);

  useEffect(() => {
    const grepTimer = setInterval(() => {
      setVisibleGrep((prev) => {
        if (prev >= grep.results.length) {
          clearInterval(grepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 80);

    const codeindexTimer = setTimeout(() => {
      const timer = setInterval(() => {
        setVisibleCodeindex((prev) => {
          if (prev >= codeindex.results.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(timer);
    }, 400);

    return () => {
      clearInterval(grepTimer);
      clearTimeout(codeindexTimer);
    };
  }, [grep.results.length, codeindex.results.length]);

  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-2">
      <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 font-mono text-xs text-slate-500">
            $ {grep.label}
          </span>
        </div>
        <div className="h-56 overflow-hidden p-4">
          {grep.results.slice(0, visibleGrep).map((line, i) => (
            <div
              key={i}
              className="font-mono text-xs leading-6 text-slate-500"
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-950">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 font-mono text-xs text-slate-500">
            $ {codeindex.label}
          </span>
        </div>
        <div className="h-56 overflow-hidden p-4">
          {codeindex.results.slice(0, visibleCodeindex).map((line, i) => (
            <div
              key={i}
              className="font-mono text-xs leading-6 text-emerald-400"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
