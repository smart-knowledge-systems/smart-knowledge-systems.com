"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MarkdownContentClient from '@/components/markdown-content-client';
import { AboutContent } from '@/lib/load-about-content';

interface AboutAccordionProps {
  content: AboutContent;
}

export default function AboutAccordion({ content }: AboutAccordionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = useState<string>('');

  // Handle URL-based section expansion
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && (section === 'dialog' || section === 'synthialog')) {
      setOpenSection(section);
      // Scroll to section after a brief delay to ensure accordion is open
      // setTimeout(() => {
      //   const element = document.getElementById(section);
      //   if (element) {
      //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      //   }
      // }, 100);
    }
  }, [searchParams]);

  const handleValueChange = (value: string) => {
    setOpenSection(value);
    
    // Update URL without causing navigation
    const params = new URLSearchParams(searchParams);
    if (value.length > 0) {
      params.set('section', value);
    } else {
      params.delete('section');
    }
    
    const newUrl = `/about${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            About
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dialog and Synthialog — innovative platforms designed to transform how organizations communicate and collaborate.
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
            <AccordionItem value="dialog">
              <AccordionTrigger 
                id="dialog"
                className="px-6 py-4 text-left hover:no-underline"
              >
                <div className="flex flex-col items-start">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {content.dialog.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Social platform for meaningful, context-rich conversations
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <MarkdownContentClient content={content.dialog.content} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="synthialog">
              <AccordionTrigger 
                id="synthialog"
                className="px-6 py-4 text-left hover:no-underline"
              >
                <div className="flex flex-col items-start">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {content.synthialog.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Collaborative platform for democratic document creation
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <MarkdownContentClient content={content.synthialog.content} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}