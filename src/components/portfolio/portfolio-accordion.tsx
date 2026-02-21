"use client";

import { useState, useMemo } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  truncateAbstract,
  shouldTruncateAbstract,
} from "@/lib/portfolio-filters";
import PortfolioMarkdown from "./portfolio-markdown";

interface PortfolioAccordionProps {
  abstract: string;
  className?: string;
}

export default function PortfolioAccordion({
  abstract,
  className = "",
}: PortfolioAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { showTruncated, truncatedText } = useMemo(
    () => ({
      showTruncated: shouldTruncateAbstract(abstract),
      truncatedText: truncateAbstract(abstract),
    }),
    [abstract]
  );

  if (!showTruncated) {
    return (
      <div className={className}>
        <PortfolioMarkdown content={abstract} />
      </div>
    );
  }

  return (
    <div className={className}>
      <div>
        <PortfolioMarkdown content={isExpanded ? abstract : truncatedText} />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
      >
        {isExpanded ? (
          <>
            <span>Show less</span>
            <ChevronUpIcon className="h-4 w-4" />
          </>
        ) : (
          <>
            <span>Read more</span>
            <ChevronDownIcon className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
