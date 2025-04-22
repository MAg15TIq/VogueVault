/**
 * Reading List utility functions for managing articles to read later
 */

import { Article } from '@/types';

const READING_LIST_KEY = 'voguevault_reading_list';

/**
 * Get all reading list articles from local storage
 * @returns Array of reading list article IDs with progress
 */
export function getReadingList(): { id: string; progress: number; addedAt: string }[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const readingList = localStorage.getItem(READING_LIST_KEY);
    return readingList ? JSON.parse(readingList) : [];
  } catch (error) {
    console.error('Error getting reading list:', error);
    return [];
  }
}

/**
 * Check if an article is in the reading list
 * @param articleId The ID of the article to check
 * @returns True if the article is in the reading list
 */
export function isInReadingList(articleId: string): boolean {
  const readingList = getReadingList();
  return readingList.some(item => item.id === articleId);
}

/**
 * Add an article to reading list
 * @param articleId The ID of the article to add
 * @returns True if the article was successfully added
 */
export function addToReadingList(articleId: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const readingList = getReadingList();
    
    // Don't add if already in reading list
    if (readingList.some(item => item.id === articleId)) {
      return true;
    }
    
    // Add to reading list with 0 progress
    readingList.push({
      id: articleId,
      progress: 0,
      addedAt: new Date().toISOString(),
    });
    
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(readingList));
    return true;
  } catch (error) {
    console.error('Error adding to reading list:', error);
    return false;
  }
}

/**
 * Remove an article from reading list
 * @param articleId The ID of the article to remove
 * @returns True if the article was successfully removed
 */
export function removeFromReadingList(articleId: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const readingList = getReadingList();
    const updatedReadingList = readingList.filter(item => item.id !== articleId);
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(updatedReadingList));
    return true;
  } catch (error) {
    console.error('Error removing from reading list:', error);
    return false;
  }
}

/**
 * Toggle reading list status for an article
 * @param articleId The ID of the article to toggle
 * @returns The new reading list status (true if added, false if removed)
 */
export function toggleReadingList(articleId: string): boolean {
  const isCurrentlyInList = isInReadingList(articleId);
  
  if (isCurrentlyInList) {
    removeFromReadingList(articleId);
    return false;
  } else {
    addToReadingList(articleId);
    return true;
  }
}

/**
 * Update reading progress for an article
 * @param articleId The ID of the article to update
 * @param progress The reading progress (0-100)
 * @returns True if the progress was successfully updated
 */
export function updateReadingProgress(articleId: string, progress: number): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const readingList = getReadingList();
    const updatedReadingList = readingList.map(item => {
      if (item.id === articleId) {
        return { ...item, progress: Math.min(100, Math.max(0, progress)) };
      }
      return item;
    });
    
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(updatedReadingList));
    return true;
  } catch (error) {
    console.error('Error updating reading progress:', error);
    return false;
  }
}

/**
 * Get all reading list articles with full data
 * @param allArticles Array of all articles to filter from
 * @returns Array of reading list articles with full data and progress
 */
export function getReadingListArticles(allArticles: Article[]): (Article & { progress: number; addedAt: string })[] {
  const readingList = getReadingList();
  
  return readingList
    .map(item => {
      const article = allArticles.find(a => a.id === item.id);
      if (!article) return null;
      
      return {
        ...article,
        progress: item.progress,
        addedAt: item.addedAt,
      };
    })
    .filter(Boolean) as (Article & { progress: number; addedAt: string })[];
}

/**
 * Sort reading list articles by different criteria
 * @param articles Array of reading list articles
 * @param sortBy Sort criteria ('date', 'progress', 'title')
 * @param sortOrder Sort order ('asc' or 'desc')
 * @returns Sorted array of reading list articles
 */
export function sortReadingList(
  articles: (Article & { progress: number; addedAt: string })[],
  sortBy: 'date' | 'progress' | 'title' = 'date',
  sortOrder: 'asc' | 'desc' = 'desc'
): (Article & { progress: number; addedAt: string })[] {
  return [...articles].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        break;
      case 'progress':
        comparison = a.progress - b.progress;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
