/**
 * Portfolio filtering, sorting, and pagination utilities
 * Data fetching logic with SWR-compatible caching
 */

import { StudentWork, getTagSlug, getSchoolSlug } from "@/content/cv/portfolio";

export interface FilteredPortfolioResult {
  essays: StudentWork[];
  totalPages: number;
  totalEssays: number;
}

/**
 * Load and parse student work data
 * Designed for SWR client-side use with automatic deduplication and caching.
 * Falls back to static JSON import in development when API is unavailable.
 */
export const loadStudentWorkData = async (): Promise<StudentWork[]> => {
  try {
    const response = await fetch("/api/student-work");
    if (!response.ok) {
      throw new Error("Failed to fetch student work data");
    }
    const data = await response.json();
    return data.essays;
  } catch (error) {
    // Only use fallback in development — in production, propagate the error
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "API unavailable, using static JSON fallback (dev only):",
        error
      );
      const { default: studentWorkData } =
        await import("@/content/cv/student-work.json");
      return studentWorkData.essays;
    }
    throw error;
  }
};

/**
 * Calculate how many of the selected tags an essay matches
 */
export const calculateTagMatchScore = (
  essay: StudentWork,
  selectedTags: string[]
): number => {
  return selectedTags.filter((tag) =>
    essay.tags.some((essayTag) => getTagSlug(essayTag) === tag)
  ).length;
};

/**
 * Sort essays with intelligent tag match scoring and date direction
 */
export const sortEssaysWithMatchScore = (
  essays: StudentWork[],
  selectedTags: string[],
  sortDateAsc: boolean = true
): StudentWork[] => {
  // Pre-compute timestamps and match scores to avoid repeated calculations
  const essaysWithScores = essays.map((essay) => ({
    essay,
    timestamp: new Date(essay.date).getTime(),
    matchScore:
      selectedTags.length > 1 ? calculateTagMatchScore(essay, selectedTags) : 0,
  }));

  return essaysWithScores
    .sort((a, b) => {
      if (selectedTags.length > 1) {
        if (a.matchScore !== b.matchScore) {
          return b.matchScore - a.matchScore;
        }
      }
      return sortDateAsc
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp;
    })
    .map((item) => item.essay);
};

/**
 * Filter, sort, and paginate student work
 * Combines tag/school/course filters in a single pass for efficiency (rule 7.6)
 */
export const filterSortAndPaginateEssays = (
  essays: StudentWork[],
  selectedTags: string[],
  selectedSchools: string[],
  selectedCourses: string[],
  currentPage: number,
  itemsPerPage: number,
  sortDateAsc: boolean = true
): FilteredPortfolioResult => {
  const hasTags = selectedTags.length > 0;
  const hasSchools = selectedSchools.length > 0;
  const hasCourses = selectedCourses.length > 0;

  // Convert schools to a Set for O(1) lookups
  const schoolSet = hasSchools ? new Set(selectedSchools) : null;
  const courseSet = hasCourses ? new Set(selectedCourses) : null;

  // Single-pass filter combining tags, schools, and courses
  const filteredEssays =
    hasTags || hasSchools || hasCourses
      ? essays.filter((essay) => {
          if (
            hasTags &&
            !selectedTags.some((tag) =>
              essay.tags.some((essayTag) => getTagSlug(essayTag) === tag)
            )
          ) {
            return false;
          }
          if (hasSchools && !schoolSet!.has(getSchoolSlug(essay.school))) {
            return false;
          }
          if (hasCourses && !courseSet!.has(essay.course)) {
            return false;
          }
          return true;
        })
      : essays;

  // Sort with intelligent tag match scoring and date direction
  const sortedEssays = sortEssaysWithMatchScore(
    filteredEssays,
    selectedTags,
    sortDateAsc
  );

  // Pagination
  const totalEssays = sortedEssays.length;
  const totalPages = Math.ceil(totalEssays / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEssays = sortedEssays.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return {
    essays: paginatedEssays,
    totalPages,
    totalEssays,
  };
};

/**
 * Get all unique tags from essays
 */
export const getAllTagsFromEssays = (essays: StudentWork[]): string[] => {
  const allTags = new Set<string>();
  for (const essay of essays) {
    for (const tag of essay.tags) {
      allTags.add(getTagSlug(tag));
    }
  }
  return Array.from(allTags).sort();
};

/**
 * Get all unique schools from essays
 */
export const getAllSchoolsFromEssays = (essays: StudentWork[]): string[] => {
  const allSchools = new Set<string>();
  for (const essay of essays) {
    allSchools.add(getSchoolSlug(essay.school));
  }
  return Array.from(allSchools).sort();
};

/**
 * Get all unique courses from essays
 */
export const getAllCoursesFromEssays = (essays: StudentWork[]): string[] => {
  const allCourses = new Set<string>();
  for (const essay of essays) {
    allCourses.add(essay.course);
  }
  return Array.from(allCourses).sort();
};

// Re-export formatting utilities for convenience
export {
  formatEssayDate,
  truncateAbstract,
  shouldTruncateAbstract,
} from "./portfolio-formatting";
