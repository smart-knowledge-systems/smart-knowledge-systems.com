import { type ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`px-8 py-20 sm:px-12 sm:py-28 lg:px-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeadline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-bold tracking-tight text-white sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionSubheadline({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-lg text-slate-400">{children}</p>;
}

export function StatCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 text-center">
      <div className="text-4xl font-bold text-cyan-400 sm:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-white">{label}</div>
      {description && (
        <div className="mt-1 text-xs text-slate-500">{description}</div>
      )}
    </div>
  );
}
