import type { Metadata } from "next";
import Link from "next/link";
import {
  compareHero,
  featureMatrix,
  competitors,
  honestPositioning,
  type CellValue,
} from "@/content/codeindex/compare";
import { CodeindexNav } from "@/app/codeindex/components/nav";
import {
  Section,
  SectionHeadline,
} from "@/app/codeindex/components/section";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "How codeindex compares to grep, ripgrep, GitHub Search, and Sourcegraph. Honest feature comparison with real tradeoffs.",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-[family-name:var(--font-geist-sans)]">
      <CodeindexNav />

      {/* Hero */}
      <section className="px-8 pt-32 pb-10 sm:px-12 sm:pt-40 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {compareHero.headline}
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            {compareHero.subheadline}
          </p>
        </div>
      </section>

      {/* Feature Matrix */}
      <Section>
        <SectionHeadline>{featureMatrix.headline}</SectionHeadline>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 pr-6 font-medium text-slate-400" />
                {featureMatrix.columns.map((col, i) => (
                  <th
                    key={col}
                    className={`pb-3 pr-6 font-medium ${
                      i === 0 ? "text-cyan-400" : "text-slate-400"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureMatrix.rows.map((row) => (
                <tr key={row.feature} className="border-b border-slate-800">
                  <td className="py-3 pr-6 font-medium text-slate-300">
                    {row.feature}
                  </td>
                  <td className="py-3 pr-6">
                    <CellDisplay value={row.codeindex} highlight />
                  </td>
                  <td className="py-3 pr-6">
                    <CellDisplay value={row.grep} />
                  </td>
                  <td className="py-3 pr-6">
                    <CellDisplay value={row.github} />
                  </td>
                  <td className="py-3">
                    <CellDisplay value={row.sourcegraph} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Head-to-Head Comparisons */}
      {competitors.map((competitor) => (
        <Section
          key={competitor.slug}
          className="border-t border-slate-800"
          id={`vs-${competitor.slug}`}
        >
          <SectionHeadline>vs {competitor.name}</SectionHeadline>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* They win */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
              <h3 className="text-lg font-semibold text-slate-300">
                {competitor.theyWin.headline}
              </h3>
              <ul className="mt-4 space-y-3">
                {competitor.theyWin.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-slate-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* We win */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <h3 className="text-lg font-semibold text-cyan-400">
                {competitor.weWin.headline}
              </h3>
              <ul className="mt-4 space-y-3">
                {competitor.weWin.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-6 text-center text-slate-400 italic">
            {competitor.summary}
          </p>

          {/* Cost comparison if available */}
          {competitor.costComparison && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 text-center">
                <div className="text-xs text-slate-500">
                  {competitor.name}
                </div>
                <div className="mt-1 font-mono text-sm text-slate-400">
                  {competitor.costComparison.theirs}
                </div>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
                <div className="text-xs text-emerald-400">codeindex</div>
                <div className="mt-1 font-mono text-sm text-emerald-400">
                  {competitor.costComparison.ours}
                </div>
              </div>
            </div>
          )}
        </Section>
      ))}

      {/* Honest Positioning */}
      <Section className="border-t border-slate-800">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeadline className="text-center">
            {honestPositioning.headline}
          </SectionHeadline>
          <p className="mt-6 text-lg text-slate-400">
            {honestPositioning.body}
          </p>
        </div>
      </Section>

      {/* Navigation */}
      <Section>
        <div className="text-center">
          <Link
            href="/codeindex"
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            ← Back to Overview
          </Link>
          <span className="mx-4 text-slate-700">·</span>
          <Link
            href="/codeindex/benchmarks"
            className="text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            See Benchmarks →
          </Link>
        </div>
      </Section>
    </div>
  );
}

function CellDisplay({
  value,
  highlight = false,
}: {
  value: CellValue;
  highlight?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <span className={highlight ? "text-emerald-400" : "text-emerald-400/60"}>
        ✓
      </span>
    ) : (
      <span className="text-slate-600">✗</span>
    );
  }
  return (
    <span className={highlight ? "text-emerald-400" : "text-slate-400"}>
      {value}
    </span>
  );
}
