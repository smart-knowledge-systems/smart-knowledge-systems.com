import Link from "next/link";
import {
  hero,
  problemStatement,
  pillars,
  benchmarkHighlights,
  personaCards,
  quickStart,
  comparisonSummary,
  honestySection,
  ctaFooter,
} from "@/content/codeindex/content";
import { CodeindexNav } from "@/app/codeindex/components/nav";
import {
  Section,
  SectionHeadline,
  SectionSubheadline,
  StatCard,
} from "@/app/codeindex/components/section";
import { HeroTerminal } from "@/app/codeindex/components/hero-terminal";
import { QuickStartBlock } from "@/app/codeindex/components/quick-start-block";

export default function CodeindexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-[family-name:var(--font-geist-sans)]">
      <CodeindexNav />

      {/* Hero */}
      <section className="relative px-8 pt-32 pb-20 sm:px-12 sm:pt-40 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={hero.ctas.primary.href}
              className="rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              {hero.ctas.primary.text}
            </a>
            <a
              href={hero.ctas.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              {hero.ctas.github.text}
            </a>
            <Link
              href={hero.ctas.benchmarks.href}
              className="text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              {hero.ctas.benchmarks.text}
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">{hero.trustLine}</p>
          <p className="mt-2 font-mono text-sm font-medium text-emerald-400">
            {hero.costCallout}
          </p>

          <HeroTerminal
            grep={hero.terminalComparison.grep}
            codeindex={hero.terminalComparison.codeindex}
          />
        </div>
      </section>

      {/* Problem Statement */}
      <Section>
        <SectionHeadline>{problemStatement.headline}</SectionHeadline>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {problemStatement.cards.map((card) => (
            <div
              key={card.tool}
              className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
            >
              <div className="font-mono text-sm font-medium text-orange-400">
                {card.tool}
              </div>
              <div className="mt-2 text-lg font-semibold text-white">
                {card.tagline}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-lg text-slate-400">
          {problemStatement.transition}
        </p>
      </Section>

      {/* Three Pillars */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{pillars.headline}</SectionHeadline>
        <div className="mt-12 space-y-16">
          {pillars.items.map((pillar) => (
            <div key={pillar.title} className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-lg text-cyan-400">{pillar.tagline}</p>
                <p className="mt-4 text-slate-400">{pillar.description}</p>
                <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-slate-800/50 px-4 py-2">
                  <span className="text-2xl font-bold text-emerald-400">
                    {pillar.stat.value}
                  </span>
                  <span className="text-sm text-slate-400">
                    {pillar.stat.label}
                  </span>
                </div>
              </div>
              {pillar.example && (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                    <div className="border-b border-slate-800 px-4 py-2">
                      <span className="font-mono text-xs text-slate-500">
                        $ grep &quot;{pillar.example.query}&quot;
                      </span>
                    </div>
                    <div className="p-4">
                      {pillar.example.grepResults.map((line, i) => (
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
                    <div className="border-b border-slate-800 px-4 py-2">
                      <span className="font-mono text-xs text-slate-500">
                        $ codeindex search &quot;{pillar.example.query}&quot;
                      </span>
                    </div>
                    <div className="p-4">
                      {pillar.example.codeindexResults.map((line, i) => (
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
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Benchmark Highlights */}
      <Section className="border-t border-slate-800">
        <div className="text-center">
          <SectionHeadline className="text-center">
            {benchmarkHighlights.headline}
          </SectionHeadline>
          <SectionSubheadline>
            {benchmarkHighlights.subheadline}
          </SectionSubheadline>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {benchmarkHighlights.stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          {benchmarkHighlights.detail}
        </p>
        <div className="mt-8 text-center">
          <Link
            href={benchmarkHighlights.cta.href}
            className="text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            {benchmarkHighlights.cta.text}
          </Link>
        </div>
      </Section>

      {/* Persona Cards */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{personaCards.headline}</SectionHeadline>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {personaCards.cards.map((card) => (
            <div
              key={card.persona}
              className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
            >
              <div className="text-sm font-medium text-cyan-400">
                {card.persona}
              </div>
              <div className="mt-2 text-xl font-semibold text-white">
                {card.tagline}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Start */}
      <Section id="quick-start" className="border-t border-slate-800">
        <div className="text-center">
          <SectionHeadline className="text-center">
            {quickStart.headline}
          </SectionHeadline>
          <p className="mt-4 text-slate-400">{quickStart.subtext}</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-4">
          {quickStart.steps.map((step) => (
            <QuickStartBlock
              key={step.label}
              command={step.command}
              label={step.label}
            />
          ))}
        </div>
      </Section>

      {/* Comparison Summary */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{comparisonSummary.headline}</SectionHeadline>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 pr-6 font-medium text-slate-400">
                  Feature
                </th>
                <th className="pb-3 pr-6 font-medium text-cyan-400">
                  codeindex
                </th>
                <th className="pb-3 pr-6 font-medium text-slate-400">
                  grep
                </th>
                <th className="pb-3 pr-6 font-medium text-slate-400">
                  GitHub
                </th>
                <th className="pb-3 font-medium text-slate-400">
                  Sourcegraph
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonSummary.rows.map((row) => (
                <tr key={row.feature} className="border-b border-slate-800">
                  <td className="py-3 pr-6 text-slate-300">{row.feature}</td>
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
        <div className="mt-8 text-center">
          <Link
            href={comparisonSummary.cta.href}
            className="text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            {comparisonSummary.cta.text}
          </Link>
        </div>
      </Section>

      {/* Honesty Section */}
      <Section className="border-t border-slate-800">
        <SectionHeadline>{honestySection.headline}</SectionHeadline>
        <p className="mt-4 text-slate-400">{honestySection.intro}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {honestySection.items.map((item) => (
            <div
              key={item.scenario}
              className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6"
            >
              <div className="font-medium text-orange-400">
                {item.scenario}
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {item.recommendation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Footer */}
      <Section className="border-t border-slate-800">
        <div className="text-center">
          <SectionHeadline className="text-center">
            {ctaFooter.headline}
          </SectionHeadline>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {ctaFooter.tiers.map((tier) => (
              <div
                key={tier.level}
                className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 text-center"
              >
                <div className="text-sm font-medium text-cyan-400">
                  {tier.level}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {tier.label}
                </div>
                {tier.command ? (
                  <div className="mt-4 rounded-lg bg-slate-950 px-4 py-2">
                    <code className="font-mono text-xs text-slate-300">
                      {tier.command}
                    </code>
                  </div>
                ) : (
                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    {tier.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center text-xs text-slate-600">
          codeindex is licensed under BSL 1.1 — source-available, free for
          production use, converts to Apache 2.0 in 2030.
        </div>
      </Section>
    </div>
  );
}

function CellDisplay({
  value,
  highlight = false,
}: {
  value: boolean | string;
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
