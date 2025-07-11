"use client";

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface SortButtonProps {
  sortDateAsc: boolean;
  onSortToggle: () => void;
}

export default function SortButton({ sortDateAsc, onSortToggle }: SortButtonProps) {
  return (
    <button
      onClick={onSortToggle}
      className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300"
    >
      <span>Date</span>
      {sortDateAsc ? (
        <ChevronUpIcon className="h-4 w-4" />
      ) : (
        <ChevronDownIcon className="h-4 w-4" />
      )}
    </button>
  );
}