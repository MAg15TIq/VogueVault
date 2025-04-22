'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getReadingListArticles, sortReadingList, removeFromReadingList } from '@/utils/readingList';
import { articles } from '@/data/articles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { getReadingTime } from '@/utils/readingTime';

type SortOption = 'date' | 'progress' | 'title';
type SortOrder = 'asc' | 'desc';

export default function ReadingListPage() {
  const [readingListArticles, setReadingListArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Load reading list articles on client side
  useEffect(() => {
    const articlesWithProgress = getReadingListArticles(articles);
    setReadingListArticles(sortReadingList(articlesWithProgress, sortBy, sortOrder));
    setIsLoading(false);
  }, [sortBy, sortOrder]);

  // Handle removing an article from reading list
  const handleRemoveFromList = (articleId: string) => {
    removeFromReadingList(articleId);
    setReadingListArticles(prev => prev.filter(article => article.id !== articleId));
  };

  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle sort order if clicking the same option
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort option with default desc order
      setSortBy(option);
      setSortOrder('desc');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reading List', href: '/reading-list' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Reading List</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Articles you've saved to read later
        </p>
      </div>

      {/* Sort Controls */}
      {readingListArticles.length > 0 && (
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {readingListArticles.length} {readingListArticles.length === 1 ? 'article' : 'articles'} in your reading list
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Sort by:</span>
            <div className="flex border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
              <button
                onClick={() => handleSortChange('date')}
                className={`px-3 py-1 text-sm ${
                  sortBy === 'date'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSortChange('progress')}
                className={`px-3 py-1 text-sm ${
                  sortBy === 'progress'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                Progress {sortBy === 'progress' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSortChange('title')}
                className={`px-3 py-1 text-sm ${
                  sortBy === 'title'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                Title {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading List Articles */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : readingListArticles.length === 0 ? (
        <div className="py-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-neutral-300 dark:text-neutral-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Your reading list is empty</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Add articles to your reading list to read them later
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Browse Articles
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {readingListArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 h-48 md:h-auto">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/categories/${article.category.toLowerCase()}`}
                        className="text-sm text-primary font-medium"
                      >
                        {article.category}
                      </Link>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Added on {formatDate(article.addedAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {article.content.substring(0, 150)}...
                    </p>

                    {/* Reading Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-neutral-600 dark:text-neutral-400">Reading Progress</span>
                        <span className="font-medium">{article.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${article.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-neutral-500 dark:text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {getReadingTime(article.content)}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRemoveFromList(article.id)}
                        className="px-3 py-1 text-sm border border-neutral-200 dark:border-neutral-700 rounded-md hover:text-error hover:border-error transition-colors"
                      >
                        Remove
                      </button>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Continue Reading
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
