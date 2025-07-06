"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

interface SortButtonProps {
  sortDateAsc: boolean;
  onSortToggle: () => void;
}

export default function SortButton({ sortDateAsc, onSortToggle }: SortButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onSortToggle}
      className="flex items-center gap-2"
    >
      {sortDateAsc ? (
        <>
          <ArrowUpIcon className="h-4 w-4" />
          Oldest First
        </>
      ) : (
        <>
          <ArrowDownIcon className="h-4 w-4" />
          Newest First
        </>
      )}
    </Button>
  );
}