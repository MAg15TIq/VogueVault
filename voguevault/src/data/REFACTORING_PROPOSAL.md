# Article Data Refactoring Proposal

## Current Issues

Currently, the VogueVault project maintains article data in two separate files:
- `articles.ts`: Contains full article content with HTML
- `articlesData.ts`: Contains metadata about articles

This dual-source approach has led to several issues:
1. ID mismatches between the two files
2. Potential for duplicate IDs or slugs
3. Difficulty maintaining consistency when adding new articles
4. No automated validation to catch inconsistencies

## Proposed Solution: Single Source of Truth

### 1. Create a Unified Data Structure

Replace the current dual-file approach with a single source of truth:

```typescript
// src/data/articleStore.ts

// Define the article types
export interface ArticleMetadata {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  publishDate: string;
  author: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

// Store all articles in a single array
const articles: Article[] = [
  {
    id: 1,
    title: "Summer Fashion Trends 2024",
    excerpt: "Discover the hottest fashion trends...",
    category: "Fashion",
    image: "/images/articles/fashion/summer-trends-2024.jpg",
    slug: "summer-fashion-trends-2024",
    publishDate: "2024-04-15",
    author: "Emma Rodriguez",
    content: `<p>Full HTML content here...</p>`
  },
  // More articles...
];

// Export the full articles array
export { articles };

// Export a derived array with just the metadata (for lighter-weight usage)
export const articlesMetadata: ArticleMetadata[] = articles.map(
  ({ id, title, excerpt, category, image, slug, publishDate, author }) => 
  ({ id, title, excerpt, category, image, slug, publishDate, author })
);

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticleById(id: number): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedArticles(article: Article, count: number = 3): Article[] {
  return articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, count);
}
```

### 2. Update Import References

Update all files that currently import from `articles.ts` or `articlesData.ts` to import from the new `articleStore.ts` file.

### 3. Add Validation Functions

Include built-in validation functions in the article store:

```typescript
// Add to articleStore.ts

export function validateArticles() {
  const errors: string[] = [];
  
  // Check for duplicate IDs
  const idCounts = new Map<number, number>();
  for (const article of articles) {
    idCounts.set(article.id, (idCounts.get(article.id) || 0) + 1);
  }
  
  for (const [id, count] of idCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicate article ID found: ${id} (appears ${count} times)`);
    }
  }
  
  // Check for duplicate slugs
  const slugCounts = new Map<string, number>();
  for (const article of articles) {
    slugCounts.set(article.slug, (slugCounts.get(article.slug) || 0) + 1);
  }
  
  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicate article slug found: "${slug}" (appears ${count} times)`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### 4. Implementation Plan

1. Create the new `articleStore.ts` file
2. Migrate all articles from both files into the new structure
3. Update imports across the codebase
4. Add tests to ensure the new structure works correctly
5. Remove the old files once the migration is complete

### Benefits

1. **Single Source of Truth**: No more inconsistencies between files
2. **Type Safety**: Better TypeScript typing for article data
3. **Maintainability**: Easier to add new articles without introducing errors
4. **Performance**: Potentially better performance by avoiding duplicate data
5. **Validation**: Built-in validation functions to ensure data integrity

### Potential Challenges

1. **File Size**: The combined file might be large, but this can be mitigated by:
   - Splitting articles into separate files by category
   - Using dynamic imports for article content
   
2. **Migration Effort**: Will require updating imports across the codebase

## Conclusion

Moving to a single source of truth for article data will significantly improve the maintainability and reliability of the VogueVault project. The initial investment in refactoring will pay off through reduced bugs and easier future development.
