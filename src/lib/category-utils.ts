/**
 * Category slug/title utilities
 * Title map is derived from the categories definition in posts
 */

import { categories } from "@/content/blog/categories";

const WHITESPACE_RE = /\s+/g;

/** Module-level slug-to-title map built from the categories source of truth */
const CATEGORY_TITLE_MAP: Record<string, string> = Object.fromEntries(
  Object.values(categories).map((cat) => [
    cat.title.toLowerCase().replace(WHITESPACE_RE, "-"),
    cat.title,
  ])
);

/**
 * Convert category title to URL-friendly slug
 */
export const getCategorySlug = (title: string): string => {
  return title.toLowerCase().replace(WHITESPACE_RE, "-");
};

/**
 * Convert category slug back to title
 */
export const getCategoryTitle = (slug: string): string => {
  return CATEGORY_TITLE_MAP[slug] || slug;
};
