/**
 * Markdown cache interface and utilities
 * Provides reusable caching structure for markdown content
 */

import fs from "fs";
import path from "path";

/**
 * Generic markdown cache interface
 */
export interface MarkdownCache {
  [key: string]: string;
}

/**
 * Cache for storing loaded markdown content
 */
let markdownCacheInstance: MarkdownCache | null = null;

/**
 * Load markdown content from directory and build cache
 * Implements module-level caching to avoid redundant file operations
 */
export function loadMarkdownContent({
  contentDirPath,
}: {
  contentDirPath: string;
}): MarkdownCache {
  // Return cached instance if available
  if (markdownCacheInstance !== null) {
    return markdownCacheInstance;
  }

  const cache: MarkdownCache = {};
  const contentDir = path.join(process.cwd(), contentDirPath);

  // Read all .md files in the content directory
  const files = fs.readdirSync(contentDir);
  files.forEach((file) => {
    if (file.endsWith(".md")) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const slug = `/blog/${file.replace(".md", "")}`;
      cache[slug] = content;
    }
  });

  markdownCacheInstance = cache;
  return cache;
}

/**
 * Get markdown content from cache by key
 */
export function getMarkdownFromCache(
  cache: MarkdownCache,
  key: string
): string | undefined {
  return cache[key];
}

/**
 * Clear the cache (useful for testing or forced refresh)
 */
export function clearMarkdownCache(): void {
  markdownCacheInstance = null;
}
