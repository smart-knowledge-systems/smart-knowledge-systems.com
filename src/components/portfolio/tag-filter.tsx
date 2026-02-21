"use client";

import { getTagName } from "@/content/cv/portfolio";
import { FilterButton, FilterHeader } from "./filter-button";

interface TagFilterProps {
  availableTagSlugs: string[];
  selectedTags: string[];
  onTagToggle: (tagSlugs: string[]) => void;
}

export default function TagFilter({
  availableTagSlugs,
  selectedTags,
  onTagToggle,
}: TagFilterProps) {
  if (availableTagSlugs.length === 0) {
    return null;
  }

  const handleToggle = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      onTagToggle(selectedTags.filter((t) => t !== tagSlug));
    } else {
      onTagToggle([...selectedTags, tagSlug]);
    }
  };

  return (
    <div>
      <FilterHeader
        selectedCount={selectedTags.length}
        onClearAll={() => onTagToggle([])}
      />

      <div className="flex flex-wrap gap-2">
        {availableTagSlugs.map((tagSlug) => (
          <FilterButton
            key={tagSlug}
            label={getTagName(tagSlug)}
            isSelected={selectedTags.includes(tagSlug)}
            onClick={() => handleToggle(tagSlug)}
          />
        ))}
      </div>
    </div>
  );
}
