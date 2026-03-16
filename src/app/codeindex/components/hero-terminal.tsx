"use client";

import { AnimatedTerminalComparison } from "@/app/codeindex/components/terminal";

export function HeroTerminal({
  grep,
  codeindex,
}: {
  grep: { label: string; results: string[] };
  codeindex: { label: string; results: string[] };
}) {
  return <AnimatedTerminalComparison grep={grep} codeindex={codeindex} />;
}
