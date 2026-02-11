"use client";

import { StudentWork } from "@/content/cv/portfolio";
import PortfolioItem from "./portfolio-item";

interface PortfolioListProps {
  essays: StudentWork[];
  onTagClick?: (tagSlug: string) => void;
  selectedTags?: string[];
}

export default function PortfolioList({
  essays,
  onTagClick,
  selectedTags = [],
}: PortfolioListProps) {
  if (essays.length === 0) {
    return (
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No essays found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {essays.map((essay) => (
            <PortfolioItem
              key={`${essay.title}-${essay.date}`}
              essay={essay}
              onTagClick={onTagClick}
              selectedTags={selectedTags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
