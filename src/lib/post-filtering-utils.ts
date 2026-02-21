/**
 * Shared post filtering utilities used by both server and client-side filters
 * Implements generic filtering interface for dependency injection
 */

import { Post } from "@/content/blog/posts";
import { getCategorySlug } from "@/lib/category-utils";

/**
 * Calculate how many of the selected categories a post matches
 * Used for intelligent sorting when multiple categories are selected
 */
export const calculateMatchScore = (
  post: Post,
  selectedCategorySlugs: string[]
): number => {
  return selectedCategorySlugs.filter((slug) =>
    post.categories.some((cat) => getCategorySlug(cat.title) === slug)
  ).length;
};

/**
 * Filter posts by category slugs using OR logic
 * Posts appear if they match ANY selected category
 */
export const filterPostsByCategories = (
  posts: Post[],
  categorySlugs: string[]
): Post[] => {
  if (categorySlugs.length === 0) {
    return posts;
  }

  const slugSet = new Set(categorySlugs);
  return posts.filter((post) =>
    post.categories.some((cat) => slugSet.has(getCategorySlug(cat.title)))
  );
};

/**
 * Sort posts with intelligent category match scoring and date direction
 * Multi-category filtering: sort by match score first, then by date
 * Single/no categories: sort by date only
 */
export const sortPostsWithMatchScore = (
  posts: Post[],
  categorySlugs: string[],
  sortDateAsc: boolean = false
): Post[] => {
  const useMatchScoring = categorySlugs.length > 1;

  return posts.toSorted((a, b) => {
    if (useMatchScoring) {
      const aScore = calculateMatchScore(a, categorySlugs);
      const bScore = calculateMatchScore(b, categorySlugs);
      if (aScore !== bScore) {
        return bScore - aScore;
      }
    }

    const aTime = new Date(a.datetime).getTime();
    const bTime = new Date(b.datetime).getTime();
    return sortDateAsc ? aTime - bTime : bTime - aTime;
  });
};

/**
 * Get all unique categories from posts
 */
export const getAllCategoriesFromPosts = (posts: Post[]): string[] => {
  const allCategories = new Set<string>();
  for (const post of posts) {
    for (const cat of post.categories) {
      allCategories.add(cat.title);
    }
  }
  return Array.from(allCategories).sort();
};
