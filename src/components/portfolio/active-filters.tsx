"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { getTagName, getSchoolName } from "@/content/cv/portfolio";
import { ClearAllButton } from "./filter-button";

interface FilterBadgeProps {
  label: string;
  prefix: string;
  onRemove: () => void;
  colorScheme: "indigo" | "green" | "purple";
}

const badgeColors = {
  indigo: {
    badge: "bg-indigo-100 text-indigo-800",
    prefix: "text-indigo-600",
    button: "text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700",
  },
  green: {
    badge: "bg-green-100 text-green-800",
    prefix: "text-green-600",
    button: "text-green-600 hover:bg-green-200 hover:text-green-700",
  },
  purple: {
    badge: "bg-purple-100 text-purple-800",
    prefix: "text-purple-600",
    button: "text-purple-600 hover:bg-purple-200 hover:text-purple-700",
  },
};

function FilterBadge({
  label,
  prefix,
  onRemove,
  colorScheme,
}: FilterBadgeProps) {
  const colors = badgeColors[colorScheme];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${colors.badge}`}
    >
      <span className={`text-xs ${colors.prefix}`}>{prefix}:</span>
      {label}
      <button
        onClick={onRemove}
        className={`flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center ${colors.button}`}
      >
        <XMarkIcon className="h-3 w-3" />
      </button>
    </span>
  );
}

interface ActiveFiltersProps {
  selectedTags: string[];
  selectedSchools: string[];
  selectedCourses: string[];
  onRemoveTag: (tag: string) => void;
  onRemoveSchool: (school: string) => void;
  onRemoveCourse: (course: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  selectedTags,
  selectedSchools,
  selectedCourses,
  onRemoveTag,
  onRemoveSchool,
  onRemoveCourse,
  onClearAll,
}: ActiveFiltersProps) {
  const totalFilters =
    selectedTags.length + selectedSchools.length + selectedCourses.length;

  if (totalFilters === 0) {
    return null;
  }

  return (
    <div className="bg-indigo-50 border-b border-indigo-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Active Filters ({totalFilters})
            </h3>
            <ClearAllButton onClick={onClearAll} />
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <FilterBadge
                key={`tag-${tag}`}
                label={getTagName(tag)}
                prefix="Tag"
                onRemove={() => onRemoveTag(tag)}
                colorScheme="indigo"
              />
            ))}

            {selectedSchools.map((school) => (
              <FilterBadge
                key={`school-${school}`}
                label={getSchoolName(school)}
                prefix="School"
                onRemove={() => onRemoveSchool(school)}
                colorScheme="green"
              />
            ))}

            {selectedCourses.map((course) => (
              <FilterBadge
                key={`course-${course}`}
                label={course}
                prefix="Course"
                onRemove={() => onRemoveCourse(course)}
                colorScheme="purple"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
