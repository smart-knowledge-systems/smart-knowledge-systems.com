"use server";
import { postsData, Post, Category } from "@/content/blog/posts";
import { getMarkdownContent } from "@/content/blog/get-markdown";
import { getCategorySlug } from "@/lib/category-utils";

export const getPostsWithMarkdown = async (posts: Post[]) => {
  const fullPosts = posts.map((post) => ({
    ...post,
    body: getMarkdownContent(post.href) || post.body,
  }));
  return fullPosts;
};

export const getPostWithMarkdown = async (
  slug: string
): Promise<Post | undefined> => {
  const post = postsData.find((post) => post.href === `/blog/${slug}`);
  if (!post) {
    return undefined;
  }
  // Check if the post is in the future
  const postDate = new Date(post.datetime);
  const currentDate = new Date();
  if (postDate > currentDate) {
    return undefined;
  }
  // Fetch the markdown content
  const body = (await getMarkdownContent(post.href)) || post.body;
  const fullPost = { ...post, body };
  return fullPost;
};

export const getPost = async (slug: string): Promise<Post | undefined> => {
  const post = postsData.find((post) => post.href === slug);
  if (!post) {
    return undefined;
  }
  const fullPost = {
    ...post,
    body: (await getMarkdownContent(post.href)) || post.body,
  };
  return fullPost;
};

/**
 * Get featured posts based on categories and their priorities.
 * @param categories - Array of categories with optional priorities (defaults to 1).
 * @returns Array of featured posts.
 */
/**
 * Get all published posts metadata (not future-dated and with available content)
 * This is the only server function needed for the blog page
 */
export const getPublishedPostsMetadata = async (): Promise<Post[]> => {
  const currentDate = new Date();
  return postsData.filter((post) => {
    const postDate = new Date(post.datetime);
    return postDate <= currentDate;
  });
};

/**
 * Get all published posts (not future-dated) - kept for compatibility
 */
export const getPublishedPosts = async (): Promise<Post[]> => {
  return getPublishedPostsMetadata();
};

/**
 * Get posts filtered by category slugs (OR logic - posts appear if they match ANY selected category)
 */
export const getPostsByCategories = async (
  categorySlugs: string[]
): Promise<Post[]> => {
  const publishedPosts = await getPublishedPosts();

  if (categorySlugs.length === 0) {
    return publishedPosts;
  }

  return publishedPosts.filter((post) =>
    post.categories.some((cat) =>
      categorySlugs.some((slug) => getCategorySlug(cat.title) === slug)
    )
  );
};

/**
 * Calculate how many of the selected categories a post matches
 */
const calculateMatchScore = (
  post: Post,
  selectedCategorySlugs: string[]
): number => {
  return selectedCategorySlugs.filter((slug) =>
    post.categories.some((cat) => getCategorySlug(cat.title) === slug)
  ).length;
};

/**
 * Get paginated posts with optional category filtering and intelligent sorting
 */
export const getPaginatedPosts = async (
  categorySlugs: string[] = [],
  page: number = 1,
  limit: number = 5
): Promise<{ posts: Post[]; totalPages: number; totalPosts: number }> => {
  const filteredPosts = await getPostsByCategories(categorySlugs);

  // Enhanced sorting: prioritize posts that match more selected categories
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (categorySlugs.length > 1) {
      // Multi-category filtering: sort by match score first, then by date
      const aMatchScore = calculateMatchScore(a, categorySlugs);
      const bMatchScore = calculateMatchScore(b, categorySlugs);

      // Primary sort: match score (higher is better)
      if (aMatchScore !== bMatchScore) {
        return bMatchScore - aMatchScore;
      }
    }

    // Secondary sort (or primary for single/no categories): date (newer is better)
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });

  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    totalPosts,
  };
};

/**
 * Get all available categories from posts
 */
export const getAllCategories = async (): Promise<string[]> => {
  const publishedPosts = await getPublishedPosts();
  const allCategories = new Set<string>();

  publishedPosts.forEach((post) => {
    post.categories.forEach((cat) => {
      allCategories.add(cat.title);
    });
  });

  return Array.from(allCategories).sort();
};

export const getFeaturedPosts = async (
  categories: Category[],
  limit: number,
  excludePosts: number[] = []
) => {
  const categoryWeights = Object.fromEntries(
    categories.map((cat) => [cat.title, cat.priority ?? 1]) // Use nullish coalescing
  );
  // first filter out future posts
  const currentPosts = postsData.filter((post) => {
    const postDate = new Date(post.datetime);
    const currentDate = new Date();
    return postDate <= currentDate && !excludePosts.includes(post.id);
  });

  const filteredPosts =
    categories.length > 0
      ? currentPosts.filter((post) =>
          post.categories.some((cat) =>
            categories.some((c) => c.title === cat.title)
          )
        )
      : currentPosts;

  return filteredPosts
    .sort((a, b) => {
      const aScore = a.categories.reduce(
        (score, cat) => score + (categoryWeights[cat.title] || 0),
        0
      );
      const bScore = b.categories.reduce(
        (score, cat) => score + (categoryWeights[cat.title] || 0),
        0
      );
      return bScore - aScore;
    })
    .slice(0, limit);
};
