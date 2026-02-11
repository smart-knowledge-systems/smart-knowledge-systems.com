/**
 * Client-side post filtering utilities
 * Imports shared filtering logic from post-filtering-utils
 */

import { Post } from "@/content/blog/posts";
import {
  filterPostsByCategories,
  calculateMatchScore,
  sortPostsWithMatchScore,
  getAllCategoriesFromPosts,
} from "./post-filtering-utils";

/**
 * Paginate posts array
 */
export const paginatePosts = (
  posts: Post[],
  page: number = 1,
  limit: number = 5
) => {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    totalPosts,
  };
};

/**
 * Complete client-side filtering, sorting, and pagination
 */
export const filterSortAndPaginatePosts = (
  posts: Post[],
  categorySlugs: string[] = [],
  page: number = 1,
  limit: number = 5,
  sortDateAsc: boolean = false
) => {
  // Filter by categories
  const filteredPosts = filterPostsByCategories(posts, categorySlugs);

  // Sort with intelligent match scoring and date direction
  const sortedPosts = sortPostsWithMatchScore(
    filteredPosts,
    categorySlugs,
    sortDateAsc
  );

  // Paginate
  return paginatePosts(sortedPosts, page, limit);
};

// Re-export shared utilities for convenience
export {
  filterPostsByCategories,
  calculateMatchScore,
  sortPostsWithMatchScore,
  getAllCategoriesFromPosts,
};
