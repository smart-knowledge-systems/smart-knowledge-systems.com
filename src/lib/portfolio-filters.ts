import { StudentWork, getTagSlug, getSchoolSlug } from "@/content/cv/portfolio";

export interface FilteredPortfolioResult {
  essays: StudentWork[];
  totalPages: number;
  totalEssays: number;
}

// Load and parse student work data
export const loadStudentWorkData = async (): Promise<StudentWork[]> => {
  try {
    const response = await fetch('/api/student-work');
    if (!response.ok) {
      throw new Error('Failed to fetch student work data');
    }
    const data = await response.json();
    return data.essays;
  } catch (error) {
    console.error('Error loading student work data:', error);
    // Fallback to static import for development
    const { default: studentWorkData } = await import('@/content/cv/student-work.json');
    return studentWorkData.essays;
  }
};

/**
 * Calculate how many of the selected tags an essay matches
 */
export const calculateTagMatchScore = (essay: StudentWork, selectedTags: string[]): number => {
  return selectedTags.filter(tag =>
    essay.tags.some(essayTag => getTagSlug(essayTag) === tag)
  ).length;
};

/**
 * Sort essays with intelligent tag match scoring and date direction
 */
export const sortEssaysWithMatchScore = (essays: StudentWork[], selectedTags: string[], sortDateAsc: boolean = true): StudentWork[] => {
  return essays.sort((a, b) => {
    if (selectedTags.length > 1) {
      // Multi-tag filtering: sort by match score first, then by date
      const aMatchScore = calculateTagMatchScore(a, selectedTags);
      const bMatchScore = calculateTagMatchScore(b, selectedTags);
      
      // Primary sort: match score (higher is better)
      if (aMatchScore !== bMatchScore) {
        return bMatchScore - aMatchScore;
      }
    }
    
    // Secondary sort (or primary for single/no tags): date
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    
    return sortDateAsc ? aTime - bTime : bTime - aTime;
  });
};

// Filter, sort, and paginate student work
export const filterSortAndPaginateEssays = (
  essays: StudentWork[],
  selectedTags: string[],
  selectedSchools: string[],
  selectedCourses: string[],
  currentPage: number,
  itemsPerPage: number,
  sortDateAsc: boolean = true
): FilteredPortfolioResult => {
  // Filter by tags (OR logic - essay must have at least one of the selected tags)
  let filteredEssays = essays;
  if (selectedTags.length > 0) {
    filteredEssays = filteredEssays.filter(essay =>
      selectedTags.some(tag => 
        essay.tags.some(essayTag => getTagSlug(essayTag) === tag)
      )
    );
  }

  // Filter by schools
  if (selectedSchools.length > 0) {
    filteredEssays = filteredEssays.filter(essay =>
      selectedSchools.includes(getSchoolSlug(essay.school))
    );
  }

  // Filter by courses
  if (selectedCourses.length > 0) {
    filteredEssays = filteredEssays.filter(essay =>
      selectedCourses.includes(essay.course)
    );
  }

  // Sort with intelligent tag match scoring and date direction
  const sortedEssays = sortEssaysWithMatchScore(filteredEssays, selectedTags, sortDateAsc);

  // Pagination
  const totalEssays = sortedEssays.length;
  const totalPages = Math.ceil(totalEssays / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEssays = sortedEssays.slice(startIndex, endIndex);

  return {
    essays: paginatedEssays,
    totalPages,
    totalEssays
  };
};

// Get all unique tags from essays
export const getAllTagsFromEssays = (essays: StudentWork[]): string[] => {
  const allTags = new Set<string>();
  essays.forEach(essay => {
    essay.tags.forEach(tag => {
      allTags.add(getTagSlug(tag));
    });
  });
  return Array.from(allTags).sort();
};

// Get all unique schools from essays
export const getAllSchoolsFromEssays = (essays: StudentWork[]): string[] => {
  const allSchools = new Set<string>();
  essays.forEach(essay => {
    allSchools.add(getSchoolSlug(essay.school));
  });
  return Array.from(allSchools).sort();
};

// Get all unique courses from essays
export const getAllCoursesFromEssays = (essays: StudentWork[]): string[] => {
  const allCourses = new Set<string>();
  essays.forEach(essay => {
    allCourses.add(essay.course);
  });
  return Array.from(allCourses).sort();
};

// Format date for display
export const formatEssayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Truncate abstract for accordion preview
export const truncateAbstract = (abstract: string, sentences: number = 2): string => {
  // Split by sentences (periods followed by space and capital letter or end of string)
  const sentences_array = abstract.split(/\.(?=\s+[A-Z]|$)/).filter(s => s.trim().length > 0);
  
  if (sentences_array.length <= sentences) {
    return abstract;
  }
  
  // Take the first N sentences and add ellipsis
  const truncated = sentences_array.slice(0, sentences).join('.') + '.';
  return truncated + '...';
};

// Check if abstract should be truncated
export const shouldTruncateAbstract = (abstract: string, sentences: number = 2): boolean => {
  const sentences_array = abstract.split(/\.(?=\s+[A-Z]|$)/).filter(s => s.trim().length > 0);
  return sentences_array.length > sentences;
};