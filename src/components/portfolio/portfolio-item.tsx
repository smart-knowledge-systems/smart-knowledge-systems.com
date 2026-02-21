"use client";

import { memo, useMemo } from "react";
import { StudentWork, getTagSlug } from "@/content/cv/portfolio";
import { formatEssayDate } from "@/lib/portfolio-filters";
import PortfolioAccordion from "./portfolio-accordion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import PortfolioMarkdown from "./portfolio-markdown";

interface TagButtonProps {
  tag: string;
  tagSlug: string;
  isSelected: boolean;
  onClick?: (tagSlug: string) => void;
}

const TagButton = memo(function TagButton({
  tag,
  tagSlug,
  isSelected,
  onClick,
}: TagButtonProps) {
  return (
    <button
      onClick={() => onClick?.(tagSlug)}
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
        isSelected
          ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {tag}
    </button>
  );
});

interface PortfolioItemProps {
  essay: StudentWork;
  onTagClick?: (tagSlug: string) => void;
  selectedTags?: string[];
}

const EMPTY_TAGS: string[] = [];

export default function PortfolioItem({
  essay,
  onTagClick,
  selectedTags = EMPTY_TAGS,
}: PortfolioItemProps) {
  const formattedDate = formatEssayDate(essay.date);

  const tagSlugs = useMemo(
    () => essay.tags.map((tag) => getTagSlug(tag)),
    [essay.tags]
  );

  return (
    <article className="border-b border-gray-200 py-8">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2">
            <PortfolioMarkdown content={`### ${essay.title}`} />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time dateTime={essay.date}>{formattedDate}</time>
            <span>•</span>
            <span>{essay.course}</span>
            <span>•</span>
            <span>{essay.school}</span>
          </div>

          <PortfolioAccordion abstract={essay.abstract} className="mb-4" />

          <div className="flex flex-wrap gap-2">
            {essay.tags.map((tag, index) => (
              <TagButton
                key={tag}
                tag={tag}
                tagSlug={tagSlugs[index]}
                isSelected={selectedTags.includes(tagSlugs[index])}
                onClick={onTagClick}
              />
            ))}
          </div>
        </div>

        {essay.url ? (
          <div className="ml-6 flex-shrink-0">
            <a
              href={essay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              <span>View Essay</span>
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
