/**
 * Markdown cache interface and utilities
 * Provides lazy-loaded, async caching for markdown content
 */

import fs from "fs/promises";
import path from "path";

export interface MarkdownCache {
  [key: string]: string;
}

/** Singleton cache and initialization guard */
let markdownCacheInstance: MarkdownCache | null = null;
let initPromise: Promise<MarkdownCache> | null = null;

/**
 * Load markdown content from directory and build cache
 * Uses async file I/O and defers execution until first access.
 * Concurrent callers share the same initialization promise.
 */
export async function loadMarkdownContent({
  contentDirPath,
}: {
  contentDirPath: string;
}): Promise<MarkdownCache> {
  // Return cached instance if available
  if (markdownCacheInstance !== null) {
    return markdownCacheInstance;
  }

  // Share a single in-flight initialization across concurrent callers
  if (initPromise !== null) {
    return initPromise;
  }

  initPromise = (async () => {
    const cache: MarkdownCache = {};
    const contentDir = path.join(process.cwd(), contentDirPath);

    const files = await fs.readdir(contentDir);
    await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const filePath = path.join(contentDir, file);
          const content = await fs.readFile(filePath, "utf-8");
          const slug = `/blog/${file.replace(".md", "")}`;
          cache[slug] = content;
        })
    );

    markdownCacheInstance = cache;
    return cache;
  })();

  return initPromise;
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
  initPromise = null;
}
