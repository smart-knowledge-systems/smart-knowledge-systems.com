"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/codeindex", label: "Overview" },
  { href: "/codeindex/benchmarks", label: "Benchmarks" },
  { href: "/codeindex/compare", label: "Compare" },
  { href: "/codeindex/cloud", label: "Cloud" },
];

const externalLinks = [
  {
    href: "https://github.com/smart-knowledge-systems/codeindex",
    label: "GitHub",
  },
];

export function CodeindexNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          href="/codeindex"
          className="font-mono text-lg font-bold text-cyan-400"
        >
          codeindex
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition-colors hover:text-slate-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quick-start"
            className="rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-400"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center sm:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <div
              className={`h-0.5 w-5 bg-slate-400 transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <div
              className={`h-0.5 w-5 bg-slate-400 transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`h-0.5 w-5 bg-slate-400 transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur-md sm:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition-colors hover:text-slate-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quick-start"
              onClick={() => setMobileOpen(false)}
              className="inline-block w-fit rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-400"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
