/**
 * About content loader with caching and generic section parsing
 * Implements React.cache() for per-request deduplication
 */

import { readFileSync } from "fs";
import { join } from "path";
import { cache } from "react";

export interface AboutSection {
  id: string;
  title: string;
  content: string;
}

export interface AboutContent {
  dialog: AboutSection;
  synthialog: AboutSection;
}

/**
 * Parse a single section from markdown
 */
const parseSection = (
  sectionText: string,
  sectionId: string,
  fallbackTitle: string
): AboutSection => {
  const titleMatch = sectionText.match(/## (.+)/);
  const title = titleMatch?.[1] || fallbackTitle;
  // Use the matched title (including ##) to ensure we remove the exact string
  const content = sectionText.replace(titleMatch?.[0] ?? "", "").trim();

  return {
    id: sectionId,
    title,
    content,
  };
};

/**
 * Load and parse about content sections
 * Cached with React.cache() for per-request deduplication
 */
export const loadAboutContent = cache((): AboutContent => {
  try {
    const filePath = join(
      process.cwd(),
      "src/content/dialog-synthialog-about-pages.md"
    );
    const fileContent = readFileSync(filePath, "utf8");

    // Split the content by the separator
    const sections = fileContent.split("---").map((section) => section.trim());

    // Parse sections using the shared parser
    const dialog = parseSection(sections[0], "dialog", "About Dialog");
    const synthialog = parseSection(
      sections[1],
      "synthialog",
      "About Synthialog"
    );

    return { dialog, synthialog };
  } catch (error) {
    console.error("Error loading about content:", error);
    // Return default content if file reading fails
    return {
      dialog: {
        id: "dialog",
        title: "About Dialog",
        content: "Content not available.",
      },
      synthialog: {
        id: "synthialog",
        title: "About Synthialog",
        content: "Content not available.",
      },
    };
  }
});
