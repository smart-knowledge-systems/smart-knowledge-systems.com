import {
  loadMarkdownContent,
  getMarkdownFromCache,
} from "@/lib/markdown-cache";

const contentDirPath = "src/content/blog";

/**
 * Get markdown content for a blog post by its href.
 * Lazily loads and caches all markdown files on first call.
 */
export const getMarkdownContent = async (
  href: string
): Promise<string | undefined> => {
  const cache = await loadMarkdownContent({ contentDirPath });
  return getMarkdownFromCache(cache, href);
};
