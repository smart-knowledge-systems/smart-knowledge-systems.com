"use client";

import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// ---------------------------------------------------------------------------
// Pagination range calculation (extracted for readability and testability)
// ---------------------------------------------------------------------------
interface PageRange {
  showStartEllipsis: boolean;
  showEndEllipsis: boolean;
  middlePages: number[];
}

function getPageRange(currentPage: number, totalPages: number): PageRange {
  if (totalPages <= 7) {
    return {
      showStartEllipsis: false,
      showEndEllipsis: false,
      middlePages: Array.from({ length: totalPages }, (_, i) => i + 1),
    };
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  const middlePages: number[] = [];
  for (let i = start; i <= end; i++) {
    middlePages.push(i);
  }

  return {
    showStartEllipsis: currentPage > 3,
    showEndEllipsis: currentPage < totalPages - 2,
    middlePages,
  };
}

// ---------------------------------------------------------------------------
// BlogPagination
// ---------------------------------------------------------------------------
const POSTS_PER_PAGE = 5;

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  onPageChange,
}: BlogPaginationProps) {
  const handlePageClick = useCallback(
    (e: React.MouseEvent, page: number) => {
      e.preventDefault();
      onPageChange(page);
    },
    [onPageChange]
  );

  const handlePrevious = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (currentPage > 1) onPageChange(currentPage - 1);
    },
    [currentPage, onPageChange]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    },
    [currentPage, totalPages, onPageChange]
  );

  if (totalPages <= 1) return null;

  const { showStartEllipsis, showEndEllipsis, middlePages } = getPageRange(
    currentPage,
    totalPages
  );

  const isCompact = totalPages <= 7;

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="text-sm text-gray-600">
        Showing {Math.min((currentPage - 1) * POSTS_PER_PAGE + 1, totalPosts)}{" "}
        to {Math.min(currentPage * POSTS_PER_PAGE, totalPosts)} of {totalPosts}{" "}
        posts
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevious}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {isCompact ? (
            middlePages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            <>
              <PaginationItem key={1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, 1)}
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {showStartEllipsis && (
                <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {middlePages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => handlePageClick(e, page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {showEndEllipsis && (
                <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem key={totalPages}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
