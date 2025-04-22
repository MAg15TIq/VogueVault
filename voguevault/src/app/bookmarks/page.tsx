'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBookmarkedArticles } from '@/utils/bookmarks';
import { articles } from '@/data/articles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import OptimizedImage from '@/components/ui/OptimizedImage';
import BookmarkButton from '@/components/features/BookmarkButton';
import { getReadingTime } from '@/utils/readingTime';

export default function BookmarksPage() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarked articles on client side
  useEffect(() => {
    setBookmarkedArticles(getBookmarkedArticles(articles));
    setIsLoading(false);
  }, []);

  // Handle bookmark removal
  const handleBookmarkChange = (articleId: string, isBookmarked: boolean) => {
    if (!isBookmarked) {
      // If article was unbookmarked, remove it from the list
      setBookmarkedArticles(prev => prev.filter(article => article.id !== articleId));
    }
  };

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Bookmarks', href: '/bookmarks' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Bookmarks</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Articles you've saved for later reading
        </p>
      </div>

      {/* Bookmarked Articles */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookmarkedArticles.length === 0 ? (
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Save articles to read them later by clicking the bookmark icon
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkedArticles.map((article) => (
            <div
              key={article.id}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-neutral-800"
            >
              <div className="relative h-48 w-full">
                <OptimizedImage
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <BookmarkButton
                    articleId={article.id}
                    showText={false}
                    variant="minimal"
                    className="bg-white dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-80 rounded-full p-2"
                    onBookmarkChange={(isBookmarked) => handleBookmarkChange(article.id, isBookmarked)}
                  />
                </div>
              </div>
              <div className="p-6">
                <Link
                  href={`/categories/${article.category.toLowerCase()}`}
                  className="text-sm text-primary font-medium"
                >
                  {article.category}
                </Link>
                <h3 className="text-xl font-bold mt-2 mb-3">
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
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      By {article.author}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {getReadingTime(article.content.substring(0, 200))}
                    </span>
                  </div>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                  >
                    Read Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
