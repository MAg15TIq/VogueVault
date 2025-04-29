import { articles, validateArticleData } from '@/data/articleStore';

/**
 * Validates article data consistency using the unified data source
 * @returns Object containing validation results
 */
export function validateArticles() {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Use the built-in validation function from articleStore
  const validation = validateArticleData();

  if (!validation.valid) {
    errors.push(...validation.errors);
  }

  // Additional checks can be added here if needed

  // Check for articles without content
  const articlesWithoutContent = articles.filter(article => !article.content || article.content.trim() === '');
  if (articlesWithoutContent.length > 0) {
    const slugs = articlesWithoutContent.map(a => a.slug).join(', ');
    warnings.push(`Articles without content: ${slugs}`);
  }

  // Check for articles without images
  const articlesWithoutImages = articles.filter(article => !article.image || article.image.trim() === '');
  if (articlesWithoutImages.length > 0) {
    const slugs = articlesWithoutImages.map(a => a.slug).join(', ');
    warnings.push(`Articles without images: ${slugs}`);
  }

  // Check for articles with very short content
  const shortArticles = articles.filter(article => {
    const textContent = article.content.replace(/<[^>]*>/g, '');
    return textContent.length < 500; // Less than 500 characters is considered short
  });

  if (shortArticles.length > 0) {
    const slugs = shortArticles.map(a => a.slug).join(', ');
    warnings.push(`Articles with very short content (< 500 chars): ${slugs}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: `Validation completed with ${errors.length} errors and ${warnings.length} warnings.`
  };
}

/**
 * Find duplicate values in an array
 * @param array The array to check for duplicates
 * @returns Array of duplicate values
 */
function findDuplicates<T>(array: T[]): T[] {
  const seen = new Set<T>();
  const duplicates = new Set<T>();

  for (const item of array) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  return Array.from(duplicates);
}
