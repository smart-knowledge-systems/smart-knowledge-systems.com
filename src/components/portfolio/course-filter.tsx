"use client";

import { getSchoolName } from "@/content/cv/portfolio";

interface SchoolFilterProps {
  availableSchools: string[];
  selectedSchools: string[];
  onSchoolToggle: (schools: string[]) => void;
}

export function SchoolFilter({
  availableSchools,
  selectedSchools,
  onSchoolToggle,
}: SchoolFilterProps) {
  const handleSchoolClick = (school: string) => {
    if (selectedSchools.includes(school)) {
      onSchoolToggle(selectedSchools.filter((s) => s !== school));
    } else {
      onSchoolToggle([...selectedSchools, school]);
    }
  };

  const clearAllSchools = () => {
    onSchoolToggle([]);
  };

  return (
    <div>
      {selectedSchools.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {selectedSchools.length} selected
          </p>
          <button
            onClick={clearAllSchools}
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {availableSchools.map((schoolSlug) => {
          const schoolName = getSchoolName(schoolSlug);
          const isSelected = selectedSchools.includes(schoolSlug);

          return (
            <button
              key={schoolSlug}
              onClick={() => handleSchoolClick(schoolSlug)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              {schoolName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CourseFilterProps {
  availableCourses: string[];
  selectedCourses: string[];
  onCourseToggle: (courses: string[]) => void;
}

export function CourseFilter({
  availableCourses,
  selectedCourses,
  onCourseToggle,
}: CourseFilterProps) {
  const handleCourseClick = (course: string) => {
    if (selectedCourses.includes(course)) {
      onCourseToggle(selectedCourses.filter((c) => c !== course));
    } else {
      onCourseToggle([...selectedCourses, course]);
    }
  };

  const clearAllCourses = () => {
    onCourseToggle([]);
  };

  return (
    <div>
      {selectedCourses.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {selectedCourses.length} selected
          </p>
          <button
            onClick={clearAllCourses}
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {availableCourses.map((course) => {
          const isSelected = selectedCourses.includes(course);

          return (
            <button
              key={course}
              onClick={() => handleCourseClick(course)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              {course}
            </button>
          );
        })}
      </div>
    </div>
  );
}
