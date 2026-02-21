"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MarkdownContentClient from "@/components/markdown-content-client";
import { AboutContent } from "@/lib/load-about-content";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SECTIONS = {
  DIALOG: "dialog",
  SYNTHIALOG: "synthialog",
} as const;

type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS];

const VALID_SECTIONS = new Set<string>([SECTIONS.DIALOG, SECTIONS.SYNTHIALOG]);

interface SectionConfig {
  id: SectionId;
  description: string;
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: SECTIONS.DIALOG,
    description: "Social platform for meaningful, context-rich conversations",
  },
  {
    id: SECTIONS.SYNTHIALOG,
    description: "Collaborative platform for democratic document creation",
  },
];

// ---------------------------------------------------------------------------
// AccordionSection — reusable item for each section
// ---------------------------------------------------------------------------
function AccordionSection({
  sectionId,
  title,
  description,
  content,
}: {
  sectionId: string;
  title: string;
  description: string;
  content: string;
}) {
  return (
    <AccordionItem value={sectionId}>
      <AccordionTrigger
        id={sectionId}
        className="px-6 py-4 text-left hover:no-underline"
      >
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <MarkdownContentClient content={content} />
      </AccordionContent>
    </AccordionItem>
  );
}

// ---------------------------------------------------------------------------
// AboutAccordion
// ---------------------------------------------------------------------------
interface AboutAccordionProps {
  content: AboutContent;
}

export default function AboutAccordion({ content }: AboutAccordionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const section = searchParams.get("section");
  const openSection = VALID_SECTIONS.has(section ?? "") ? section! : "";

  const handleValueChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value.length > 0) {
        params.set("section", value);
      } else {
        params.delete("section");
      }
      router.replace(
        `/about${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false }
      );
    },
    [router, searchParams]
  );

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            About
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dialog and Synthialog — innovative platforms designed to transform
            how organizations communicate and collaborate.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Accordion
            type="single"
            collapsible
            value={openSection}
            onValueChange={handleValueChange}
            className="space-y-4"
          >
            {SECTION_CONFIGS.map(({ id, description }) => (
              <AccordionSection
                key={id}
                sectionId={id}
                title={content[id].title}
                description={description}
                content={content[id].content}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
