/**
 * Markdown content loading utilities
 * Re-exports from markdown-cache module for backward compatibility.
 *
 * @deprecated Import directly from "@/lib/markdown-cache" instead.
 * This re-export file exists only for backward compatibility during migration.
 */

export {
  loadMarkdownContent,
  getMarkdownFromCache,
  clearMarkdownCache,
  type MarkdownCache,
} from "./markdown-cache";
