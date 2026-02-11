"use client";

import { Toggle } from "@/components/ui/toggle";
import { getCategorySlug } from "@/lib/category-utils";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  availableCategories: string[];
  selectedCategories: string[];
  onCategoryToggle: (categorySlugs: string[]) => void;
}

export default function CategoryFilter({
  availableCategories,
  selectedCategories,
  onCategoryToggle,
}: CategoryFilterProps) {
  const handleCategoryClick = (categoryTitle: string) => {
    const categorySlug = getCategorySlug(categoryTitle);
    const isSelected = selectedCategories.includes(categorySlug);

    let newSelectedCategories: string[];
    if (isSelected) {
      // Remove category
      newSelectedCategories = selectedCategories.filter(
        (slug) => slug !== categorySlug
      );
    } else {
      // Add category
      newSelectedCategories = [...selectedCategories, categorySlug];
    }

    onCategoryToggle(newSelectedCategories);
  };

  const handleClearAll = () => {
    onCategoryToggle([]);
  };

  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Filter by category
            </h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {availableCategories.map((categoryTitle) => {
              const categorySlug = getCategorySlug(categoryTitle);
              const isSelected = selectedCategories.includes(categorySlug);

              return (
                <Toggle
                  key={categoryTitle}
                  pressed={isSelected}
                  onPressedChange={() => handleCategoryClick(categoryTitle)}
                  className={cn(
                    "relative z-10 rounded-full px-3 py-1.5 font-medium transition-colors"
                  )}
                  variant="outline"
                >
                  {categoryTitle}
                </Toggle>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
