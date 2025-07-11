"use client";

import { XMarkIcon } from '@heroicons/react/20/solid';
import { getTagName, getSchoolName } from '@/content/cv/portfolio';

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
  onClearAll
}: ActiveFiltersProps) {
  const totalFilters = selectedTags.length + selectedSchools.length + selectedCourses.length;
  
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
            <button
              onClick={onClearAll}
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Clear all
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Tags */}
            {selectedTags.map((tag) => (
              <span
                key={`tag-${tag}`}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800"
              >
                <span className="text-xs text-indigo-600">Tag:</span>
                {getTagName(tag)}
                <button
                  onClick={() => onRemoveTag(tag)}
                  className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            
            {/* Schools */}
            {selectedSchools.map((school) => (
              <span
                key={`school-${school}`}
                className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
              >
                <span className="text-xs text-green-600">School:</span>
                {getSchoolName(school)}
                <button
                  onClick={() => onRemoveSchool(school)}
                  className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-600 hover:bg-green-200 hover:text-green-700"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            
            {/* Courses */}
            {selectedCourses.map((course) => (
              <span
                key={`course-${course}`}
                className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
              >
                <span className="text-xs text-purple-600">Course:</span>
                {course}
                <button
                  onClick={() => onRemoveCourse(course)}
                  className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-600 hover:bg-purple-200 hover:text-purple-700"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}