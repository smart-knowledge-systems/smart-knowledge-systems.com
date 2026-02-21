"use client";

import { Suspense } from "react";
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
import { PortfolioProvider, usePortfolio } from "@/contexts/portfolio-context";

// ---------------------------------------------------------------------------
// Loading skeleton (shown while Suspense resolves searchParams)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// PortfolioContent — pure UI consumer of PortfolioContext
// ---------------------------------------------------------------------------
function PortfolioContent() {
  const { state, actions, meta } = usePortfolio();
  const {
    essays,
    selectedTags,
    selectedSchools,
    selectedCourses,
    currentPage,
    sortDateAsc,
    totalPages,
    totalEssays,
  } = state;

  return (
    <>
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Sort essays by date</div>
            <SortButton
              sortDateAsc={sortDateAsc}
              onSortToggle={actions.toggleSort}
            />
          </div>
        </div>
      </div>

      <ActiveFilters
        selectedTags={selectedTags}
        selectedSchools={selectedSchools}
        selectedCourses={selectedCourses}
        onRemoveTag={actions.removeTag}
        onRemoveSchool={actions.removeSchool}
        onRemoveCourse={actions.removeCourse}
        onClearAll={actions.clearAllFilters}
      />

      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AccordionFilter title="Filter by Tags" defaultOpen={false}>
            <TagFilter
              availableTagSlugs={meta.availableTags}
              selectedTags={selectedTags}
              onTagToggle={actions.setTags}
            />
          </AccordionFilter>

          <AccordionFilter title="Filter by School" defaultOpen={false}>
            <SchoolFilter
              availableSchools={meta.availableSchools}
              selectedSchools={selectedSchools}
              onSchoolToggle={actions.setSchools}
            />
          </AccordionFilter>

          <AccordionFilter title="Filter by Course" defaultOpen={false}>
            <CourseFilter
              availableCourses={meta.availableCourses}
              selectedCourses={selectedCourses}
              onCourseToggle={actions.setCourses}
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

      <PortfolioList
        essays={essays}
        onTagClick={actions.toggleTag}
        selectedTags={selectedTags}
      />

      <PortfolioPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEssays={totalEssays}
        itemsPerPage={10}
        onPageChange={actions.changePage}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Page — wires provider around UI
// ---------------------------------------------------------------------------
export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioLoading />}>
      <PortfolioProvider>
        <div className="h-full pt-12">
          <Header />

          <div className="bg-white pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Academic Portfolio
                </h1>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  A collection of my academic work spanning multiple disciplines
                  and institutions.
                </p>
              </div>
            </div>
          </div>

          <PortfolioContent />

          <Footer />
        </div>
      </PortfolioProvider>
    </Suspense>
  );
}
