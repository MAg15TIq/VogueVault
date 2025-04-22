/**
 * Bookmark utility functions for saving and retrieving bookmarked articles
 */

import { Article } from '@/types';

const BOOKMARK_KEY = 'voguevault_bookmarks';

/**
 * Get all bookmarked articles from local storage
 * @returns Array of bookmarked article IDs
 */
export function getBookmarks(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const bookmarks = localStorage.getItem(BOOKMARK_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
}

/**
 * Check if an article is bookmarked
 * @param articleId The ID of the article to check
 * @returns True if the article is bookmarked
 */
export function isBookmarked(articleId: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.includes(articleId);
}

/**
 * Add an article to bookmarks
 * @param articleId The ID of the article to bookmark
 * @returns True if the article was successfully bookmarked
 */
export function addBookmark(articleId: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const bookmarks = getBookmarks();

    // Don't add if already bookmarked
    if (bookmarks.includes(articleId)) {
      return true;
    }

    // Add to bookmarks
    bookmarks.push(articleId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return false;
  }
}

/**
 * Remove an article from bookmarks
 * @param articleId The ID of the article to remove from bookmarks
 * @returns True if the article was successfully removed
 */
export function removeBookmark(articleId: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.filter(id => id !== articleId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updatedBookmarks));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
}

/**
 * Toggle bookmark status for an article
 * @param articleId The ID of the article to toggle
 * @returns The new bookmark status (true if bookmarked, false if removed)
 */
export function toggleBookmark(articleId: string): boolean {
  const isCurrentlyBookmarked = isBookmarked(articleId);

  if (isCurrentlyBookmarked) {
    removeBookmark(articleId);
    return false;
  } else {
    addBookmark(articleId);
    return true;
  }
}

/**
 * Get all bookmarked articles with full data
 * @param allArticles Array of all articles to filter from
 * @returns Array of bookmarked articles with full data
 */
export function getBookmarkedArticles(allArticles: Article[]): Article[] {
  const bookmarkIds = getBookmarks();
  return allArticles.filter(article => bookmarkIds.includes(article.id.toString()));
}
