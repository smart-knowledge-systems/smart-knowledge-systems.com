import { Suspense } from "react";
import { Metadata } from "next";
import AboutAccordion from "@/components/about/about-accordion";
import { loadAboutContent } from "@/lib/load-about-content";

export const metadata: Metadata = {
  title: "About Dialog and Synthialog | Smart Knowledge Systems",
  description:
    "Dialog and Synthialog — innovative platforms for meaningful conversations and collaborative document creation.",
};

function AboutContent() {
  const content = loadAboutContent();

  return <AboutAccordion content={content} />;
}

function AboutLoading() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutContent />
    </Suspense>
  );
}
