"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StudentWork } from "@/content/cv/portfolio";
import {
  filterSortAndPaginateEssays,
  getAllTagsFromEssays,
  getAllSchoolsFromEssays,
  getAllCoursesFromEssays,
} from "@/lib/portfolio-filters";
import studentWorkData from "@/content/cv/student-work.json";
import { logClientEvent } from "@/lib/axiom/client";

// ---------------------------------------------------------------------------
// Context interface (state / actions / meta)
// ---------------------------------------------------------------------------
interface PortfolioState {
  essays: StudentWork[];
  selectedTags: string[];
  selectedSchools: string[];
  selectedCourses: string[];
  currentPage: number;
  sortDateAsc: boolean;
  totalPages: number;
  totalEssays: number;
}

interface PortfolioActions {
  toggleTag: (tagSlug: string) => void;
  setTags: (tagSlugs: string[]) => void;
  setSchools: (schoolSlugs: string[]) => void;
  setCourses: (courseSlugs: string[]) => void;
  changePage: (page: number) => void;
  toggleSort: () => void;
  clearAllFilters: () => void;
  removeTag: (tag: string) => void;
  removeSchool: (school: string) => void;
  removeCourse: (course: string) => void;
}

interface PortfolioMeta {
  availableTags: string[];
  availableSchools: string[];
  availableCourses: string[];
}

export interface PortfolioContextValue {
  state: PortfolioState;
  actions: PortfolioActions;
  meta: PortfolioMeta;
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(
  null
);

export function usePortfolio(): PortfolioContextValue {
  const ctx = use(PortfolioContext);
  if (!ctx)
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  return ctx;
}

// ---------------------------------------------------------------------------
// Static data — computed once at module load (never changes)
// ---------------------------------------------------------------------------
const allEssays: StudentWork[] = studentWorkData.essays;
const availableTags = getAllTagsFromEssays(allEssays);
const availableSchools = getAllSchoolsFromEssays(allEssays);
const availableCourses = getAllCoursesFromEssays(allEssays);

const ITEMS_PER_PAGE = 10;

// ---------------------------------------------------------------------------
// Helper: parse comma-separated URL param
// ---------------------------------------------------------------------------
function parseParam(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

// ---------------------------------------------------------------------------
// Provider — owns all portfolio state, URL sync, and filtering logic
// ---------------------------------------------------------------------------
export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive filter state directly from URL params (single source of truth)
  const selectedTags = parseParam(searchParams.get("tags"));
  const selectedSchools = parseParam(searchParams.get("schools"));
  const selectedCourses = parseParam(searchParams.get("courses"));
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const sortDateAsc = searchParams.get("sort") === "asc";

  // Filtered + sorted + paginated essays
  const { essays, totalPages, totalEssays } = useMemo(
    () =>
      filterSortAndPaginateEssays(
        allEssays,
        selectedTags,
        selectedSchools,
        selectedCourses,
        currentPage,
        ITEMS_PER_PAGE,
        sortDateAsc
      ),
    [selectedTags, selectedSchools, selectedCourses, currentPage, sortDateAsc]
  );

  // Centralised URL builder
  const updateUrl = useCallback(
    (
      tags: string[],
      schools: string[],
      courses: string[],
      page: number = 1,
      sort?: boolean
    ) => {
      const params = new URLSearchParams();
      if (tags.length > 0) params.set("tags", tags.join(","));
      if (schools.length > 0) params.set("schools", schools.join(","));
      if (courses.length > 0) params.set("courses", courses.join(","));
      if (page > 1) params.set("page", page.toString());
      const sortVal = sort !== undefined ? sort : sortDateAsc;
      if (sortVal) params.set("sort", "asc");

      router.push(
        `/portfolio${params.toString() ? `?${params.toString()}` : ""}`
      );
    },
    [router, sortDateAsc]
  );

  // Actions
  const toggleTag = useCallback(
    (tagSlug: string) => {
      const newTags = selectedTags.includes(tagSlug)
        ? selectedTags.filter((t) => t !== tagSlug)
        : [...selectedTags, tagSlug];
      updateUrl(newTags, selectedSchools, selectedCourses, 1);
    },
    [selectedTags, selectedSchools, selectedCourses, updateUrl]
  );

  const setTags = useCallback(
    (tags: string[]) => updateUrl(tags, selectedSchools, selectedCourses, 1),
    [selectedSchools, selectedCourses, updateUrl]
  );

  const setSchools = useCallback(
    (schools: string[]) => updateUrl(selectedTags, schools, selectedCourses, 1),
    [selectedTags, selectedCourses, updateUrl]
  );

  const setCourses = useCallback(
    (courses: string[]) => updateUrl(selectedTags, selectedSchools, courses, 1),
    [selectedTags, selectedSchools, updateUrl]
  );

  const changePage = useCallback(
    (page: number) =>
      updateUrl(selectedTags, selectedSchools, selectedCourses, page),
    [selectedTags, selectedSchools, selectedCourses, updateUrl]
  );

  const toggleSort = useCallback(
    () =>
      updateUrl(
        selectedTags,
        selectedSchools,
        selectedCourses,
        1,
        !sortDateAsc
      ),
    [selectedTags, selectedSchools, selectedCourses, sortDateAsc, updateUrl]
  );

  const clearAllFilters = useCallback(
    () => updateUrl([], [], [], 1),
    [updateUrl]
  );

  const removeTag = useCallback(
    (tag: string) => {
      const newTags = selectedTags.filter((t) => t !== tag);
      updateUrl(newTags, selectedSchools, selectedCourses, 1);
    },
    [selectedTags, selectedSchools, selectedCourses, updateUrl]
  );

  const removeSchool = useCallback(
    (school: string) => {
      const newSchools = selectedSchools.filter((s) => s !== school);
      updateUrl(selectedTags, newSchools, selectedCourses, 1);
    },
    [selectedTags, selectedSchools, selectedCourses, updateUrl]
  );

  const removeCourse = useCallback(
    (course: string) => {
      const newCourses = selectedCourses.filter((c) => c !== course);
      updateUrl(selectedTags, selectedSchools, newCourses, 1);
    },
    [selectedTags, selectedSchools, selectedCourses, updateUrl]
  );

  // Debounced analytics tracking
  const isInitialMount = useRef(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      logClientEvent("portfolio.filter.change", {
        tags_selected: selectedTags,
        schools_selected: selectedSchools,
        courses_selected: selectedCourses,
        results_count: totalEssays,
        sort_direction: sortDateAsc ? "asc" : "desc",
      });
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    selectedTags,
    selectedSchools,
    selectedCourses,
    sortDateAsc,
    totalEssays,
  ]);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      state: {
        essays,
        selectedTags,
        selectedSchools,
        selectedCourses,
        currentPage,
        sortDateAsc,
        totalPages,
        totalEssays,
      },
      actions: {
        toggleTag,
        setTags,
        setSchools,
        setCourses,
        changePage,
        toggleSort,
        clearAllFilters,
        removeTag,
        removeSchool,
        removeCourse,
      },
      meta: { availableTags, availableSchools, availableCourses },
    }),
    [
      essays,
      selectedTags,
      selectedSchools,
      selectedCourses,
      currentPage,
      sortDateAsc,
      totalPages,
      totalEssays,
      toggleTag,
      setTags,
      setSchools,
      setCourses,
      changePage,
      toggleSort,
      clearAllFilters,
      removeTag,
      removeSchool,
      removeCourse,
    ]
  );

  return <PortfolioContext value={value}>{children}</PortfolioContext>;
}
