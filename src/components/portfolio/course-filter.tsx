"use client";

import { getSchoolName } from "@/content/cv/portfolio";
import { FilterButton, FilterHeader } from "./filter-button";

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
  const handleToggle = (school: string) => {
    if (selectedSchools.includes(school)) {
      onSchoolToggle(selectedSchools.filter((s) => s !== school));
    } else {
      onSchoolToggle([...selectedSchools, school]);
    }
  };

  return (
    <div>
      <FilterHeader
        selectedCount={selectedSchools.length}
        onClearAll={() => onSchoolToggle([])}
      />

      <div className="flex flex-wrap gap-2">
        {availableSchools.map((schoolSlug) => (
          <FilterButton
            key={schoolSlug}
            label={getSchoolName(schoolSlug)}
            isSelected={selectedSchools.includes(schoolSlug)}
            onClick={() => handleToggle(schoolSlug)}
          />
        ))}
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
  const handleToggle = (course: string) => {
    if (selectedCourses.includes(course)) {
      onCourseToggle(selectedCourses.filter((c) => c !== course));
    } else {
      onCourseToggle([...selectedCourses, course]);
    }
  };

  return (
    <div>
      <FilterHeader
        selectedCount={selectedCourses.length}
        onClearAll={() => onCourseToggle([])}
      />

      <div className="flex flex-wrap gap-2">
        {availableCourses.map((course) => (
          <FilterButton
            key={course}
            label={course}
            isSelected={selectedCourses.includes(course)}
            onClick={() => handleToggle(course)}
          />
        ))}
      </div>
    </div>
  );
}
