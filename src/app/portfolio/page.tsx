"use client";

import { useEffect, useState, useMemo, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TagFilter from "@/components/portfolio/tag-filter";
import {
  SchoolFilter,
  CourseFilter,
} from "@/components/portfolio/course-filter";
import AccordionFilter from "@/components/portfolio/accordion-filter";
import ActiveFilters from "@/components/portfolio/active-filters";
import PortfolioList from "@/components/portfolio/portfolio-list";
import PortfolioPagination from "@/components/portfolio/portfolio-pagination";
import SortButton from "@/components/portfolio/sort-button";
import { StudentWork } from "@/content/cv/portfolio";
import {
  filterSortAndPaginateEssays,
  getAllTagsFromEssays,
  getAllSchoolsFromEssays,
  getAllCoursesFromEssays,
} from "@/lib/portfolio-filters";
import studentWorkData from "@/content/cv/student-work.json";
import { logClientEvent } from "@/lib/axiom/client";

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allEssays] = useState<StudentWork[]>(studentWorkData.essays);
  const loading = false;

  // Parse URL parameters
  const tagsParam = searchParams.get("tags");
  const schoolsParam = searchParams.get("schools");
  const coursesParam = searchParams.get("courses");
  const pageParam = searchParams.get("page");
  const sortParam = searchParams.get("sort");

  const selectedTags = useMemo(
    () => (tagsParam ? tagsParam.split(",").filter(Boolean) : []),
    [tagsParam]
  );
  const selectedSchools = useMemo(
    () => (schoolsParam ? schoolsParam.split(",").filter(Boolean) : []),
    [schoolsParam]
  );
  const selectedCourses = useMemo(
    () => (coursesParam ? coursesParam.split(",").filter(Boolean) : []),
    [coursesParam]
  );
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const sortDateAsc = sortParam === "asc"; // Default to descending

  // Derived state from client-side filtering
  const availableTags = useMemo(
    () => getAllTagsFromEssays(allEssays),
    [allEssays]
  );
  const availableSchools = useMemo(
    () => getAllSchoolsFromEssays(allEssays),
    [allEssays]
  );
  const availableCourses = useMemo(
    () => getAllCoursesFromEssays(allEssays),
    [allEssays]
  );

  const { essays, totalPages, totalEssays } = useMemo(
    () =>
      filterSortAndPaginateEssays(
        allEssays,
        selectedTags,
        selectedSchools,
        selectedCourses,
        currentPage,
        10,
        sortDateAsc
      ),
    [
      allEssays,
      selectedTags,
      selectedSchools,
      selectedCourses,
      currentPage,
      sortDateAsc,
    ]
  );

  // Update URL when filters, page, or sort changes
  const updateUrl = (
    newTags: string[] = selectedTags,
    newSchools: string[] = selectedSchools,
    newCourses: string[] = selectedCourses,
    newPage: number = 1,
    newSortDateAsc?: boolean
  ) => {
    const params = new URLSearchParams();

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    }
    if (newSchools.length > 0) {
      params.set("schools", newSchools.join(","));
    }
    if (newCourses.length > 0) {
      params.set("courses", newCourses.join(","));
    }
    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    const sortToUse =
      newSortDateAsc !== undefined ? newSortDateAsc : sortDateAsc;
    if (sortToUse) {
      params.set("sort", "asc");
    }

    const url = `/portfolio${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(url);
  };

  // Handle filter changes
  const handleTagToggle = (newTags: string[]) => {
    updateUrl(newTags, selectedSchools, selectedCourses, 1);
  };

  const handleSchoolToggle = (newSchools: string[]) => {
    updateUrl(selectedTags, newSchools, selectedCourses, 1);
  };

  const handleCourseToggle = (newCourses: string[]) => {
    updateUrl(selectedTags, selectedSchools, newCourses, 1);
  };

  const handlePageChange = (newPage: number) => {
    updateUrl(selectedTags, selectedSchools, selectedCourses, newPage);
  };

  const handleSortToggle = () => {
    updateUrl(selectedTags, selectedSchools, selectedCourses, 1, !sortDateAsc);
  };

  // Handle individual tag click from essay
  const handleTagClick = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      // Remove tag if already selected
      const newTags = selectedTags.filter((tag) => tag !== tagSlug);
      handleTagToggle(newTags);
    } else {
      // Add tag if not selected
      const newTags = [...selectedTags, tagSlug];
      handleTagToggle(newTags);
    }
  };

  // Handle removing individual filters from active filters
  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    handleTagToggle(newTags);
  };

  const handleRemoveSchool = (school: string) => {
    const newSchools = selectedSchools.filter((s) => s !== school);
    handleSchoolToggle(newSchools);
  };

  const handleRemoveCourse = (course: string) => {
    const newCourses = selectedCourses.filter((c) => c !== course);
    handleCourseToggle(newCourses);
  };

  const handleClearAllFilters = () => {
    updateUrl([], [], [], 1);
  };

  // Track filter changes to Axiom (debounced)
  const isInitialMount = useRef(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip tracking on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only track if essays are loaded
    if (loading || allEssays.length === 0) {
      return;
    }

    // Clear any pending timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the tracking to avoid spam from rapid filter changes
    debounceTimerRef.current = setTimeout(() => {
      logClientEvent("portfolio.filter.change", {
        tags_selected: selectedTags,
        schools_selected: selectedSchools,
        courses_selected: selectedCourses,
        results_count: totalEssays,
        sort_direction: sortDateAsc ? "asc" : "desc",
      });
    }, 500);

    // Cleanup timer on unmount
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
    loading,
    allEssays.length,
    totalEssays,
  ]);

  return (
    <div className="h-full pt-12">
      <Header />

      <div className="bg-white pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Academic Portfolio
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              A collection of my academic work spanning multiple disciplines and
              institutions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Sort essays by date</div>
            <SortButton
              sortDateAsc={sortDateAsc}
              onSortToggle={handleSortToggle}
            />
          </div>
        </div>
      </div>

      <ActiveFilters
        selectedTags={selectedTags}
        selectedSchools={selectedSchools}
        selectedCourses={selectedCourses}
        onRemoveTag={handleRemoveTag}
        onRemoveSchool={handleRemoveSchool}
        onRemoveCourse={handleRemoveCourse}
        onClearAll={handleClearAllFilters}
      />

      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AccordionFilter title="Filter by Tags" defaultOpen={false}>
            <TagFilter
              availableTagSlugs={availableTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </AccordionFilter>

          <AccordionFilter title="Filter by School" defaultOpen={false}>
            <SchoolFilter
              availableSchools={availableSchools}
              selectedSchools={selectedSchools}
              onSchoolToggle={handleSchoolToggle}
            />
          </AccordionFilter>

          <AccordionFilter title="Filter by Course" defaultOpen={false}>
            <CourseFilter
              availableCourses={availableCourses}
              selectedCourses={selectedCourses}
              onCourseToggle={handleCourseToggle}
            />
          </AccordionFilter>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {totalEssays} {totalEssays === 1 ? "essay" : "essays"} found
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading essays...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <PortfolioList
            essays={essays}
            onTagClick={handleTagClick}
            selectedTags={selectedTags}
          />

          <PortfolioPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalEssays={totalEssays}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

function PortfolioLoading() {
  return (
    <div className="h-full pt-12">
      <Header />
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading portfolio...</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioLoading />}>
      <PortfolioContent />
    </Suspense>
  );
}
