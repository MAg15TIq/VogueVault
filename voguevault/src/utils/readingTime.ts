/**
 * Calculate the estimated reading time for a given text
 * @param text The text content to calculate reading time for
 * @param wordsPerMinute The average reading speed in words per minute (default: 200)
 * @returns An object containing the reading time in minutes and the word count
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200) {
  // Remove HTML tags if present
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Count words by splitting on whitespace
  const words = cleanText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  // Calculate reading time in minutes
  const minutes = wordCount / wordsPerMinute;
  
  // Round to nearest minute, with a minimum of 1 minute
  const readingTime = Math.max(1, Math.round(minutes));
  
  return {
    minutes: readingTime,
    wordCount,
  };
}

/**
 * Format the reading time into a human-readable string
 * @param minutes The reading time in minutes
 * @returns A formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Calculate and format the reading time for a given text
 * @param text The text content to calculate reading time for
 * @param wordsPerMinute The average reading speed in words per minute (default: 200)
 * @returns A formatted string (e.g., "5 min read")
 */
export function getReadingTime(text: string, wordsPerMinute = 200): string {
  const { minutes } = calculateReadingTime(text, wordsPerMinute);
  return formatReadingTime(minutes);
}
