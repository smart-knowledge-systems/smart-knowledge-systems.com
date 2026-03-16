"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cloudPage } from "@/content/codeindex/cloud";
import { CodeindexNav } from "@/app/codeindex/components/nav";
import { Section, SectionHeadline } from "@/app/codeindex/components/section";

const AUTH_START_URL = "https://auth.sara.ai/light/google/start";

export default function CloudWaitlistPage() {
  return (
    <Suspense>
      <CloudWaitlistContent />
    </Suspense>
  );
}

function CloudWaitlistContent() {
  const joinWaitlist = useMutation(api.waitlist.join);
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Handle redirect back from auth.sara.ai with email
  const emailParam = searchParams.get("email");

  useEffect(() => {
    if (!emailParam) return;

    async function saveEmail(email: string) {
      setIsPending(true);
      try {
        await joinWaitlist({ email });
        setSuccess(true);
        // Clean the URL
        window.history.replaceState({}, "", "/codeindex/cloud");
      } catch {
        setError("Something went wrong saving your email. Please try again.");
      } finally {
        setIsPending(false);
      }
    }

    saveEmail(emailParam);
  }, [emailParam, joinWaitlist]);

  function handleSignIn() {
    const returnTo = `${window.location.origin}/codeindex/cloud`;
    const url = new URL(AUTH_START_URL);
    url.searchParams.set("returnTo", returnTo);
    url.searchParams.set("mode", "waitlist");
    window.location.href = url.toString();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-[family-name:var(--font-geist-sans)]">
      <CodeindexNav />

      <section className="relative px-8 pt-32 pb-16 sm:px-12 sm:pt-40 sm:pb-20 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-xs font-medium tracking-wide text-cyan-400 uppercase">
              {cloudPage.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {cloudPage.headline}
          </h1>
          <p className="mt-4 text-xl text-cyan-400">{cloudPage.tagline}</p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400">
            {cloudPage.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {cloudPage.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
            >
              <h3 className="font-medium text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Waitlist */}
      <Section className="border-t border-slate-800">
        <div className="mx-auto max-w-lg text-center">
          <SectionHeadline className="text-center">
            {cloudPage.waitlist.headline}
          </SectionHeadline>
          <p className="mt-4 text-slate-400">
            {cloudPage.waitlist.description}
          </p>

          {success ? (
            <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-8">
              <svg
                className="mx-auto h-8 w-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="mt-3 text-sm text-emerald-300">
                {cloudPage.waitlist.successMessage}
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <button
                onClick={handleSignIn}
                disabled={isPending}
                className="inline-flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-slate-500 hover:bg-slate-800 disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isPending
                  ? "Joining..."
                  : "Sign in with Google to join waitlist"}
              </button>
              <a
                href="mailto:russ-fugal@smart-knowledge-systems.com?subject=cidx-cloud%20waitlist&body=I%27d%20like%20to%20join%20the%20cidx-cloud%20waitlist."
                className="mt-3 block text-xs text-slate-500 transition-colors hover:text-slate-300"
              >
                or send an email instead
              </a>
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            </div>
          )}
        </div>
      </Section>

      {/* Back link */}
      <div className="px-8 pb-20 text-center">
        <Link
          href={cloudPage.backLink.href}
          className="text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          {cloudPage.backLink.text}
        </Link>
      </div>
    </div>
  );
}
