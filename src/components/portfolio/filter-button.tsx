"use client";

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FilterButton({
  label,
  isSelected,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isSelected
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

interface ClearAllButtonProps {
  onClick: () => void;
}

export function ClearAllButton({ onClick }: ClearAllButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
    >
      Clear all
    </button>
  );
}

interface FilterHeaderProps {
  selectedCount: number;
  onClearAll: () => void;
}

export function FilterHeader({ selectedCount, onClearAll }: FilterHeaderProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-gray-600">{selectedCount} selected</p>
      <ClearAllButton onClick={onClearAll} />
    </div>
  );
}
