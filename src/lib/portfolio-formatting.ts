/**
 * Portfolio presentation utilities
 * Separated from filtering logic for better separation of concerns
 */

/**
 * Format date for display
 */
export const formatEssayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Split abstract into sentences
 * Shared utility to avoid regex duplication
 */
const splitIntoSentences = (text: string): string[] => {
  return text.split(/\.(?=\s+[A-Z]|$)/).filter((s) => s.trim().length > 0);
};

/**
 * Truncate abstract for accordion preview
 */
export const truncateAbstract = (
  abstract: string,
  sentences: number = 2
): string => {
  const sentencesArray = splitIntoSentences(abstract);

  if (sentencesArray.length <= sentences) {
    return abstract;
  }

  // Take the first N sentences and add ellipsis
  const truncated = sentencesArray.slice(0, sentences).join(".") + ".";
  return truncated + "...";
};

/**
 * Check if abstract should be truncated
 */
export const shouldTruncateAbstract = (
  abstract: string,
  sentences: number = 2
): boolean => {
  const sentencesArray = splitIntoSentences(abstract);
  return sentencesArray.length > sentences;
};
