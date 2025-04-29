'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import OptimizedImage from '@/components/ui/OptimizedImage';
import AdManager from '@/components/ads/AdManager';
import { getReadingTime } from '@/utils/readingTime';
import { articlesMetadata, searchArticles } from '@/data/articleStore';

// Use the metadata version of articles for better performance
const articles = articlesMetadata;


export default function ArticlesPage() {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' }
  ];

  // Filter and sort articles when dependencies change
  useEffect(() => {
    let result = [...articles];

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(article => article.category === selectedCategory);
    }

    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      // Use the optimized search function from articleStore
      const searchResults = searchArticles(searchQuery);
      // Get the IDs of the search results
      const searchResultIds = new Set(searchResults.map(article => article.id));
      // Filter the current results to only include articles that match the search
      result = result.filter(article => searchResultIds.has(article.id));
    }

    // Apply sorting
    if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
    } else if (sortOption === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'z-a') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredArticles(result);
  }, [selectedCategory, sortOption, searchQuery]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Articles</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Explore our latest articles covering fashion trends, lifestyle tips, beauty advice, and cultural insights.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
            >
              All
            </button>
            {['Fashion', 'Lifestyle', 'Beauty', 'Culture'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm font-medium">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ad before articles */}
      <div className="mb-8">
        <AdManager type="horizontal" />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
          <div key={article.id} className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <OptimizedImage
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={80}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <Link
                  href={`/categories/${article.category.toLowerCase()}`}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  {article.category}
                </Link>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {new Date(article.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3">
                <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">{article.excerpt}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    By {article.author}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {getReadingTime(article.excerpt)}
                  </span>
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSortOption('newest');
              }}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Ad after articles */}
      <div className="mt-8 mb-8">
        <AdManager type="article" />
      </div>

      {/* Results Count */}
      {filteredArticles.length > 0 && (
        <div className="mt-8 text-center text-neutral-600 dark:text-neutral-400">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
        </div>
      )}
    </div>
  );
}
