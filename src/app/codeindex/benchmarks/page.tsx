import type { Metadata } from "next";
import Link from "next/link";
import {
  benchmarkHero,
  summaryStats,
  realWorldCost,
  multiRepoResults,
  perRepoBreakdown,
  perLanguagePerformance,
  signalContribution,
  methodology,
  knownLimitations,
} from "@/content/codeindex/benchmarks";
import { CodeindexNav } from "@/app/codeindex/components/nav";
import {
  Section,
  SectionHeadline,
  SectionSubheadline,
  StatCard,
} from "@/app/codeindex/components/section";

export const metadata: Metadata = {
  title: "Benchmarks",
  description:
    "codeindex benchmark results: 3.1x better MRR than ripgrep across 73 queries and 6 real-world repositories. Reproducible methodology.",
};

export default function BenchmarksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-[family-name:var(--font-geist-sans)]">
      <CodeindexNav />

      {/* Hero */}
      <section className="px-8 pt-32 pb-10 sm:px-12 sm:pt-40 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {benchmarkHero.headline}
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            {benchmarkHero.subheadline}
          </p>
        </div>
      </section>

      {/* Summary Stats */}
      <Section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {summaryStats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </Section>

      {/* Real-World Cost */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{realWorldCost.headline}</SectionHeadline>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {realWorldCost.details.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 text-center"
            >
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="mt-1 font-mono text-lg font-bold text-emerald-400">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Multi-Repo Results Table */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{multiRepoResults.headline}</SectionHeadline>
        <SectionSubheadline>{multiRepoResults.subheadline}</SectionSubheadline>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 pr-6 font-medium text-slate-400">
                  Metric
                </th>
                <th className="pb-3 pr-6 font-medium text-cyan-400">
                  codeindex
                </th>
                <th className="pb-3 pr-6 font-medium text-slate-400">
                  ripgrep
                </th>
                <th className="pb-3 font-medium text-emerald-400">
                  Multiplier
                </th>
              </tr>
            </thead>
            <tbody>
              {multiRepoResults.rows.map((row) => (
                <tr key={row.metric} className="border-b border-slate-800">
                  <td className="py-3 pr-6 font-medium text-slate-300">
                    {row.metric}
                  </td>
                  <td className="py-3 pr-6 font-mono text-cyan-400">
                    {row.codeindex.toFixed(3)}
                  </td>
                  <td className="py-3 pr-6 font-mono text-slate-500">
                    {row.ripgrep.toFixed(3)}
                  </td>
                  <td className="py-3 font-mono font-bold text-emerald-400">
                    {row.multiplier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Per-Repository Breakdown */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{perRepoBreakdown.headline}</SectionHeadline>
        <SectionSubheadline>
          {perRepoBreakdown.subheadline}
        </SectionSubheadline>
        <div className="mt-10 space-y-4">
          {perRepoBreakdown.repos.map((repo) => (
            <div
              key={repo.name}
              className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-mono text-lg font-bold text-white">
                    {repo.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{repo.note}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-emerald-400">
                    {repo.mrr.multiplier}
                  </span>
                  <span className="text-sm text-slate-500">MRR</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Queries</div>
                  <div className="font-mono text-white">{repo.queries}</div>
                </div>
                <div>
                  <div className="text-slate-500">HitRate@5</div>
                  <div className="font-mono text-cyan-400">
                    {(repo.hitRate5.codeindex * 100).toFixed(0)}%
                    <span className="ml-2 text-slate-600">
                      vs {(repo.hitRate5.ripgrep * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">MRR</div>
                  <div className="font-mono text-cyan-400">
                    {repo.mrr.codeindex.toFixed(3)}
                    <span className="ml-2 text-slate-600">
                      vs {repo.mrr.ripgrep.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Per-Language Performance */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{perLanguagePerformance.headline}</SectionHeadline>
        <SectionSubheadline>
          {perLanguagePerformance.subheadline}
        </SectionSubheadline>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perLanguagePerformance.languages.map((lang) => {
            const borderColor =
              lang.status === "excellent"
                ? "border-emerald-500/30"
                : lang.status === "good"
                  ? "border-cyan-500/30"
                  : lang.status === "limited"
                    ? "border-orange-500/30"
                    : "border-red-500/30";
            const statusColor =
              lang.status === "excellent"
                ? "text-emerald-400"
                : lang.status === "good"
                  ? "text-cyan-400"
                  : lang.status === "limited"
                    ? "text-orange-400"
                    : "text-red-400";

            return (
              <div
                key={lang.name}
                className={`rounded-lg border ${borderColor} bg-slate-800/30 p-4`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-medium text-white">
                    {lang.name}
                  </span>
                  <span className={`text-xs font-medium ${statusColor}`}>
                    {lang.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-slate-500">MRR</div>
                    <div className={`font-mono ${statusColor}`}>{lang.mrr}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">HitRate@5</div>
                    <div className={`font-mono ${statusColor}`}>
                      {lang.hitRate5}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Signal Contribution */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{signalContribution.headline}</SectionHeadline>
        <SectionSubheadline>
          {signalContribution.subheadline}
        </SectionSubheadline>
        <div className="mt-10 space-y-4">
          {signalContribution.signals.map((signal) => (
            <div
              key={signal.name}
              className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{signal.name}</span>
                <span className="font-mono text-2xl font-bold text-cyan-400">
                  {signal.contribution}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{signal.note}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-cyan-500"
                  style={{
                    width:
                      signal.contribution === "0%"
                        ? "0%"
                        : `${parseFloat(signal.contribution)}%`,
                    minWidth:
                      signal.contribution !== "0%" ? "4%" : undefined,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Methodology */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{methodology.headline}</SectionHeadline>
        <ul className="mt-8 space-y-3">
          {methodology.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-slate-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-medium text-cyan-400">{methodology.cta}</p>
      </Section>

      {/* Known Limitations */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{knownLimitations.headline}</SectionHeadline>
        <p className="mt-4 text-slate-400">{knownLimitations.intro}</p>
        <div className="mt-10 space-y-4">
          {knownLimitations.items.map((item) => (
            <div
              key={item.limitation}
              className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-6"
            >
              <div className="font-medium text-orange-400">
                {item.limitation}
              </div>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Back to overview */}
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
            href="/codeindex/compare"
            className="text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            See Comparisons →
          </Link>
        </div>
      </Section>
    </div>
  );
}
