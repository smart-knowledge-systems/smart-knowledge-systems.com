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
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => handlePageClick(e, i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => handlePageClick(e, 1)}
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

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => handlePageClick(e, i)}
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
              href="#"
              onClick={(e) => handlePageClick(e, totalPages)}
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
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
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
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
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
