import { articles } from '@/data/articles';
import { articlesData } from '@/data/articlesData';

/**
 * Validates consistency between articles and articlesData
 * @returns Object containing validation results
 */
export function validateArticles() {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for ID mismatches
  const articlesMap = new Map(articles.map(article => [article.slug, article]));
  const articlesDataMap = new Map(articlesData.map(article => [article.slug, article]));
  
  // Check for articles that exist in both collections but have different IDs
  for (const [slug, articleData] of articlesDataMap.entries()) {
    const article = articlesMap.get(slug);
    if (article && article.id !== articleData.id) {
      errors.push(`ID mismatch for article "${slug}": articles.ts has ID ${article.id}, articlesData.ts has ID ${articleData.id}`);
    }
  }
  
  // Check for duplicate IDs in articles.ts
  const articleIds = articles.map(article => article.id);
  const duplicateArticleIds = findDuplicates(articleIds);
  if (duplicateArticleIds.length > 0) {
    errors.push(`Duplicate IDs found in articles.ts: ${duplicateArticleIds.join(', ')}`);
  }
  
  // Check for duplicate IDs in articlesData.ts
  const articleDataIds = articlesData.map(article => article.id);
  const duplicateArticleDataIds = findDuplicates(articleDataIds);
  if (duplicateArticleDataIds.length > 0) {
    errors.push(`Duplicate IDs found in articlesData.ts: ${duplicateArticleDataIds.join(', ')}`);
  }
  
  // Check for duplicate slugs in articles.ts
  const articleSlugs = articles.map(article => article.slug);
  const duplicateArticleSlugs = findDuplicates(articleSlugs);
  if (duplicateArticleSlugs.length > 0) {
    errors.push(`Duplicate slugs found in articles.ts: ${duplicateArticleSlugs.join(', ')}`);
  }
  
  // Check for duplicate slugs in articlesData.ts
  const articleDataSlugs = articlesData.map(article => article.slug);
  const duplicateArticleDataSlugs = findDuplicates(articleDataSlugs);
  if (duplicateArticleDataSlugs.length > 0) {
    errors.push(`Duplicate slugs found in articlesData.ts: ${duplicateArticleDataSlugs.join(', ')}`);
  }
  
  // Check for articles in articlesData.ts that don't exist in articles.ts
  for (const [slug, articleData] of articlesDataMap.entries()) {
    if (!articlesMap.has(slug)) {
      warnings.push(`Article "${slug}" exists in articlesData.ts but not in articles.ts`);
    }
  }
  
  // Check for articles in articles.ts that don't exist in articlesData.ts
  for (const [slug, article] of articlesMap.entries()) {
    if (!articlesDataMap.has(slug)) {
      warnings.push(`Article "${slug}" exists in articles.ts but not in articlesData.ts`);
    }
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
