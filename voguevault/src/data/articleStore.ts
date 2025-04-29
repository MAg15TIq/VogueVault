// src/data/articleStore.ts
// Single source of truth for article data

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

// Import existing data
import { articlesData } from './articlesData';
import { articles as fullArticles } from './articles';

// Merge the data into a single source of truth
const mergeArticleData = (): Article[] => {
  const mergedArticles: Article[] = [];
  
  // First, add all articles from the full articles array
  fullArticles.forEach(fullArticle => {
    mergedArticles.push({
      id: fullArticle.id,
      title: fullArticle.title,
      excerpt: fullArticle.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      category: fullArticle.category,
      image: fullArticle.image,
      slug: fullArticle.slug,
      publishDate: fullArticle.publishDate,
      author: fullArticle.author,
      content: fullArticle.content
    });
  });
  
  // Then, add any articles from articlesData that aren't already included
  articlesData.forEach(metadataArticle => {
    // Check if this article already exists in the merged array
    const exists = mergedArticles.some(article => 
      article.id === metadataArticle.id || 
      article.slug === metadataArticle.slug
    );
    
    if (!exists) {
      // Add with placeholder content if it doesn't exist
      mergedArticles.push({
        id: metadataArticle.id,
        title: metadataArticle.title,
        excerpt: metadataArticle.excerpt || '',
        category: metadataArticle.category,
        image: metadataArticle.image,
        slug: metadataArticle.slug,
        publishDate: metadataArticle.publishDate,
        author: metadataArticle.author,
        content: `<p>${metadataArticle.excerpt || 'Article content coming soon.'}</p>`
      });
    }
  });
  
  // Sort by publish date (newest first)
  return mergedArticles.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};

// Create the unified articles array
export const articles: Article[] = mergeArticleData();

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
  return articles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedArticles(article: Article, limit: number = 4): Article[] {
  // First, get articles in the same category
  const sameCategory = articles.filter(a => 
    a.category === article.category && a.id !== article.id
  );
  
  // Then, get articles from other categories as fallback
  const otherCategories = articles.filter(a => 
    a.category !== article.category && a.id !== article.id
  );
  
  // Combine and limit to the specified number
  return [...sameCategory, ...otherCategories].slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  if (searchTerms.length === 0) {
    return [];
  }
  
  return articles.filter(article => {
    const searchableText = `
      ${article.title.toLowerCase()}
      ${article.excerpt.toLowerCase()}
      ${article.category.toLowerCase()}
      ${article.author.toLowerCase()}
      ${article.content.replace(/<[^>]*>/g, '').toLowerCase()}
    `;
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}

// Validation function to check for data consistency
export function validateArticleData(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const ids = new Set<number>();
  
  articles.forEach(article => {
    // Check for duplicate slugs
    if (slugs.has(article.slug)) {
      errors.push(`Duplicate slug found: ${article.slug}`);
    } else {
      slugs.add(article.slug);
    }
    
    // Check for duplicate IDs
    if (ids.has(article.id)) {
      errors.push(`Duplicate ID found: ${article.id}`);
    } else {
      ids.add(article.id);
    }
    
    // Check for missing required fields
    if (!article.title) errors.push(`Article ID ${article.id} is missing a title`);
    if (!article.category) errors.push(`Article ID ${article.id} is missing a category`);
    if (!article.image) errors.push(`Article ID ${article.id} is missing an image`);
    if (!article.content) errors.push(`Article ID ${article.id} is missing content`);
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}
