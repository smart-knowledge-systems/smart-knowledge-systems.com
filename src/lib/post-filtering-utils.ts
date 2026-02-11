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

  return posts.filter((post) =>
    post.categories.some((cat) =>
      categorySlugs.some((slug) => getCategorySlug(cat.title) === slug)
    )
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
  // Pre-compute timestamps to avoid repeated Date construction in sort
  const postsWithTimestamps = posts.map((post) => ({
    post,
    timestamp: new Date(post.datetime).getTime(),
    matchScore:
      categorySlugs.length > 1 ? calculateMatchScore(post, categorySlugs) : 0,
  }));

  return postsWithTimestamps
    .sort((a, b) => {
      if (categorySlugs.length > 1) {
        // Primary sort: match score (higher is better)
        if (a.matchScore !== b.matchScore) {
          return b.matchScore - a.matchScore;
        }
      }

      // Secondary sort (or primary for single/no categories): date
      return sortDateAsc
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp;
    })
    .map((item) => item.post);
};

/**
 * Get all unique categories from posts
 */
export const getAllCategoriesFromPosts = (posts: Post[]): string[] => {
  const allCategories = new Set<string>();

  posts.forEach((post) => {
    post.categories.forEach((cat) => {
      allCategories.add(cat.title);
    });
  });

  return Array.from(allCategories).sort();
};
