import { servicesSection } from "@/content/codeindex/content";
import {
  Section,
  SectionHeadline,
  SectionSubheadline,
} from "@/app/codeindex/components/section";

export function ServicesSection() {
  return (
    <Section id="services" className="border-t border-amber-500/10">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-medium tracking-wide text-amber-400 uppercase">
            Professional Services
          </span>
        </div>
        <SectionHeadline className="text-center">
          {servicesSection.headline}
        </SectionHeadline>
        <SectionSubheadline>{servicesSection.subheadline}</SectionSubheadline>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {servicesSection.offerings.map((offering) => {
          const hasGuarantee = "guarantee" in offering && offering.guarantee;
          return (
            <div
              key={offering.name}
              className="group relative flex flex-col rounded-2xl border border-amber-500/15 bg-gradient-to-b from-slate-800/40 to-slate-900/40 p-8 transition-colors hover:border-amber-500/25"
            >
              {/* Card header */}
              <div>
                <h3 className="text-xl font-bold text-white">
                  {offering.name}
                </h3>
                <p className="mt-1 text-sm text-amber-400/80">
                  {offering.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {offering.description}
              </p>

              {/* Deliverables */}
              <ul className="mt-6 flex-1 space-y-2.5">
                {offering.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Guarantee callout */}
              {hasGuarantee && (
                <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <p className="text-sm text-emerald-300/90">
                      {offering.guarantee}
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing + CTA */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="rounded-md border border-slate-700 bg-slate-800/60 px-3 py-1.5 font-mono text-sm text-white">
                  {offering.pricing}
                </span>
                <a
                  href={offering.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-amber-500/90 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                >
                  {offering.cta.text}
                </a>
              </div>

              {/* Not right for */}
              <p className="mt-5 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-500">
                <span className="font-medium text-slate-400">
                  Not right for:{" "}
                </span>
                {offering.notRightFor}
              </p>
            </div>
          );
        })}
      </div>

      {/* Retainer mention */}
      <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-slate-800 bg-slate-800/20 px-6 py-4 text-center">
        <p className="text-sm text-slate-400">
          <span className="font-medium text-white">
            {servicesSection.retainer.name}
          </span>{" "}
          — {servicesSection.retainer.description}
        </p>
      </div>

      {/* Proof point */}
      <div className="mt-10 border-t border-slate-800/50 pt-8 text-center">
        <p className="text-sm text-slate-400">
          {servicesSection.proofPoint.text}
        </p>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-500">
          {servicesSection.proofPoint.detail}
        </p>
      </div>
    </Section>
  );
}
