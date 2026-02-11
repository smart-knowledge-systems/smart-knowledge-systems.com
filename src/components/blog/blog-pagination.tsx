"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  categorySlugs: string[];
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  categorySlugs,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (categorySlugs.length > 0) {
      params.set("categories", categorySlugs.join(","));
    }
    if (page > 1) {
      params.set("page", page.toString());
    }
    return `/blog${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageUrl(i)}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Complex pagination with ellipsis
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href={createPageUrl(1)}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(1);
            }}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageUrl(i)}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (totalPages > 1) {
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={createPageUrl(totalPages)}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(totalPages);
              }}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="text-sm text-gray-600">
        Showing {Math.min((currentPage - 1) * 5 + 1, totalPosts)} to{" "}
        {Math.min(currentPage * 5, totalPosts)} of {totalPosts} posts
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(Math.max(1, currentPage - 1))}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageClick(currentPage - 1);
                }
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href={createPageUrl(Math.min(totalPages, currentPage + 1))}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  handlePageClick(currentPage + 1);
                }
              }}
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
