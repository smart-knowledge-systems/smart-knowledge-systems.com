import { Post } from "@/content/blog/posts";
import { getCategorySlug } from "@/lib/category-utils";

/**
 * Get posts filtered by category slugs (OR logic - posts appear if they match ANY selected category)
 * Client-side version - operates on pre-filtered published posts
 */
export const filterPostsByCategories = (posts: Post[], categorySlugs: string[]): Post[] => {
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
 * Calculate how many of the selected categories a post matches
 */
export const calculateMatchScore = (post: Post, selectedCategorySlugs: string[]): number => {
  return selectedCategorySlugs.filter(slug =>
    post.categories.some(cat => getCategorySlug(cat.title) === slug)
  ).length;
};

/**
 * Sort posts with intelligent category match scoring and date direction
 */
export const sortPostsWithMatchScore = (posts: Post[], categorySlugs: string[], sortDateAsc: boolean = true): Post[] => {
  return posts.sort((a, b) => {
    if (categorySlugs.length > 1) {
      // Multi-category filtering: sort by match score first, then by date
      const aMatchScore = calculateMatchScore(a, categorySlugs);
      const bMatchScore = calculateMatchScore(b, categorySlugs);
      
      // Primary sort: match score (higher is better)
      if (aMatchScore !== bMatchScore) {
        return bMatchScore - aMatchScore;
      }
    }
    
    // Secondary sort (or primary for single/no categories): date
    const aTime = new Date(a.datetime).getTime();
    const bTime = new Date(b.datetime).getTime();
    
    return sortDateAsc ? aTime - bTime : bTime - aTime;
  });
};

/**
 * Paginate posts array
 */
export const paginatePosts = (posts: Post[], page: number = 1, limit: number = 5) => {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    totalPosts
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
  sortDateAsc: boolean = true
) => {
  // Filter by categories
  const filteredPosts = filterPostsByCategories(posts, categorySlugs);
  
  // Sort with intelligent match scoring and date direction
  const sortedPosts = sortPostsWithMatchScore(filteredPosts, categorySlugs, sortDateAsc);
  
  // Paginate
  return paginatePosts(sortedPosts, page, limit);
};

/**
 * Get all available categories from posts
 */
export const getAllCategoriesFromPosts = (posts: Post[]): string[] => {
  const allCategories = new Set<string>();
  
  posts.forEach(post => {
    post.categories.forEach(cat => {
      allCategories.add(cat.title);
    });
  });
  
  return Array.from(allCategories).sort();
};