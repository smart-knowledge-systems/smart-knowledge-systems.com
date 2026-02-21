import { Suspense } from "react";
import { Metadata } from "next";
import AboutAccordion from "@/components/about/about-accordion";
import { loadAboutContent } from "@/lib/load-about-content";

export const metadata: Metadata = {
  title: "About Dialog and Synthialog | Smart Knowledge Systems",
  description:
    "Dialog and Synthialog — innovative platforms for meaningful conversations and collaborative document creation.",
};

function AboutLoading() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            About
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const content = loadAboutContent();

  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutAccordion content={content} />
    </Suspense>
  );
}
