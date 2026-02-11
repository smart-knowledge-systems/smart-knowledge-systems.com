/**
 * Server-side post filtering and data fetching
 * Uses shared filtering utilities and React.cache() for deduplication
 */

"use server";

import { cache } from "react";
import { postsData, Post, Category } from "@/content/blog/posts";
import { getMarkdownContent } from "@/content/blog/get-markdown";
import {
  filterPostsByCategories,
  sortPostsWithMatchScore,
  getAllCategoriesFromPosts,
} from "./post-filtering-utils";

/**
 * Get all published posts metadata (not future-dated)
 * Cached with React.cache() for per-request deduplication
 */
export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const currentDate = new Date();
  return postsData.filter((post) => {
    const postDate = new Date(post.datetime);
    return postDate <= currentDate;
  });
});

/**
 * Load markdown content for multiple posts
 * Cached with React.cache() for per-request deduplication
 */
export const getPostsWithMarkdown = cache(
  async (posts: Post[]): Promise<Post[]> => {
    const fullPosts = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        body: (await getMarkdownContent(post.href)) || post.body,
      }))
    );
    return fullPosts;
  }
);

/**
 * Get a single post by slug with markdown content
 * @param slug - Post slug (without /blog/ prefix)
 * @param includeFuturePosts - If true, includes posts with future dates (default: false)
 */
export const getPostWithMarkdown = cache(
  async (
    slug: string,
    includeFuturePosts: boolean = false
  ): Promise<Post | undefined> => {
    const post = postsData.find((post) => post.href === `/blog/${slug}`);
    if (!post) {
      return undefined;
    }

    // Check if the post is in the future (unless includeFuturePosts is true)
    if (!includeFuturePosts) {
      const postDate = new Date(post.datetime);
      const currentDate = new Date();
      if (postDate > currentDate) {
        return undefined;
      }
    }

    // Fetch the markdown content
    const body = (await getMarkdownContent(post.href)) || post.body;
    return { ...post, body };
  }
);

/**
 * Get a single post by href path with markdown content
 * @param href - Full post href path (e.g., /blog/my-post)
 * @deprecated Use getPostWithMarkdown with slug instead
 */
export const getPost = cache(
  async (href: string): Promise<Post | undefined> => {
    const post = postsData.find((post) => post.href === href);
    if (!post) {
      return undefined;
    }

    // Fetch the markdown content
    const body = (await getMarkdownContent(post.href)) || post.body;
    return { ...post, body };
  }
);

/**
 * Get posts filtered by category slugs (OR logic)
 */
export const getPostsByCategories = async (
  categorySlugs: string[]
): Promise<Post[]> => {
  const publishedPosts = await getPublishedPosts();
  return filterPostsByCategories(publishedPosts, categorySlugs);
};

/**
 * Get paginated posts with optional category filtering and intelligent sorting
 */
export const getPaginatedPosts = async (
  categorySlugs: string[] = [],
  page: number = 1,
  limit: number = 5,
  sortDateAsc: boolean = false
): Promise<{ posts: Post[]; totalPages: number; totalPosts: number }> => {
  const filteredPosts = await getPostsByCategories(categorySlugs);

  // Sort with intelligent match scoring and date direction
  const sortedPosts = sortPostsWithMatchScore(
    filteredPosts,
    categorySlugs,
    sortDateAsc
  );

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
 * Get all available categories from published posts
 */
export const getAllCategories = async (): Promise<string[]> => {
  const publishedPosts = await getPublishedPosts();
  return getAllCategoriesFromPosts(publishedPosts);
};

/**
 * Get featured posts based on categories and their priorities
 */
export const getFeaturedPosts = async (
  categories: Category[],
  limit: number,
  excludePosts: number[] = []
): Promise<Post[]> => {
  const categoryWeights = Object.fromEntries(
    categories.map((cat) => [cat.title, cat.priority ?? 1])
  );

  // Filter out future posts and excluded posts
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
