"use client";

import { getTagName } from "@/content/cv/portfolio";

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
  const handleTagClick = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      // Remove tag
      onTagToggle(selectedTags.filter((t) => t !== tagSlug));
    } else {
      // Add tag
      onTagToggle([...selectedTags, tagSlug]);
    }
  };

  const clearAllTags = () => {
    onTagToggle([]);
  };

  if (availableTagSlugs.length === 0) {
    return null;
  }

  return (
    <div>
      {selectedTags.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {selectedTags.length} selected
          </p>
          <button
            onClick={clearAllTags}
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {availableTagSlugs.map((tagSlug) => {
          const tagName = getTagName(tagSlug);
          const isSelected = selectedTags.includes(tagSlug);

          return (
            <button
              key={tagSlug}
              onClick={() => handleTagClick(tagSlug)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tagName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
