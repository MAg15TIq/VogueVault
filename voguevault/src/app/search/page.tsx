'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock articles data - in a real application, this would come from a database
const allArticles = [
  {
    id: 1,
    title: "Summer Fashion Trends 2024: Bold Colors and Sustainable Fabrics",
    excerpt: "Discover the hottest fashion trends for summer 2024, featuring vibrant colors and eco-friendly materials.",
    category: "Fashion",
    image: "/images/placeholder-1.jpg",
    slug: "summer-fashion-trends-2024",
    publishDate: "2024-04-15"
  },
  {
    id: 2,
    title: "The Art of Mindful Living: Finding Balance in a Busy World",
    excerpt: "Learn practical techniques to incorporate mindfulness into your daily routine and improve your well-being.",
    category: "Lifestyle",
    image: "/images/placeholder-2.jpg",
    slug: "mindful-living-balance",
    publishDate: "2024-04-10"
  },
  {
    id: 3,
    title: "Clean Beauty Revolution: Ingredients to Look For and Avoid",
    excerpt: "Navigate the world of clean beauty with our comprehensive guide to beneficial and harmful ingredients.",
    category: "Beauty",
    image: "/images/placeholder-3.jpg",
    slug: "clean-beauty-ingredients-guide",
    publishDate: "2024-04-05"
  },
  {
    id: 4,
    title: "The Rise of Sustainable Fashion Brands",
    excerpt: "Explore how eco-conscious fashion brands are changing the industry landscape.",
    category: "Fashion",
    image: "/images/placeholder-4.jpg",
    slug: "sustainable-fashion-brands",
    publishDate: "2024-04-02"
  },
  {
    id: 5,
    title: "Home Office Design Tips for Productivity",
    excerpt: "Create a workspace that enhances focus and creativity with these design principles.",
    category: "Lifestyle",
    image: "/images/placeholder-5.jpg",
    slug: "home-office-design-tips",
    publishDate: "2024-03-28"
  },
  {
    id: 6,
    title: "Natural Skincare Routines for Every Skin Type",
    excerpt: "Discover personalized skincare regimens using natural ingredients for all skin concerns.",
    category: "Beauty",
    image: "/images/placeholder-6.jpg",
    slug: "natural-skincare-routines",
    publishDate: "2024-03-25"
  },
  {
    id: 7,
    title: "The Influence of Street Art on Fashion",
    excerpt: "How urban art movements are shaping contemporary fashion trends worldwide.",
    category: "Culture",
    image: "/images/placeholder-7.jpg",
    slug: "street-art-fashion-influence",
    publishDate: "2024-03-20"
  },
  {
    id: 8,
    title: "Vintage Fashion Revival: Styles Making a Comeback",
    excerpt: "From 70s flares to 90s minimalism, discover which retro trends are returning to the runway.",
    category: "Fashion",
    image: "/images/placeholder-8.jpg",
    slug: "vintage-fashion-revival",
    publishDate: "2024-03-15"
  },
  {
    id: 9,
    title: "Digital Detox: Reclaiming Your Time and Attention",
    excerpt: "Practical strategies to reduce screen time and create healthier technology habits.",
    category: "Lifestyle",
    image: "/images/placeholder-9.jpg",
    slug: "digital-detox-guide",
    publishDate: "2024-03-10"
  },
  {
    id: 10,
    title: "The Science of Skincare: Understanding Active Ingredients",
    excerpt: "A deep dive into how retinol, vitamin C, and other actives transform your skin.",
    category: "Beauty",
    image: "/images/placeholder-10.jpg",
    slug: "skincare-active-ingredients",
    publishDate: "2024-03-05"
  },
  {
    id: 11,
    title: "Global Music Trends Reshaping Pop Culture",
    excerpt: "How international sounds are influencing mainstream music and cultural expression.",
    category: "Culture",
    image: "/images/placeholder-11.jpg",
    slug: "global-music-trends",
    publishDate: "2024-03-01"
  }
];

// Categories for filtering
const categories = ["All", "Fashion", "Lifestyle", "Beauty", "Culture"];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchResults, setSearchResults] = useState(allArticles);
  
  // Handle search and filtering
  useEffect(() => {
    let filteredResults = [...allArticles];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredResults = filteredResults.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filteredResults = filteredResults.filter(article => 
        article.category === selectedCategory
      );
    }
    
    // Sort results
    if (sortBy === 'newest') {
      filteredResults.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    } else if (sortBy === 'oldest') {
      filteredResults.sort((a, b) => 
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
    } else if (sortBy === 'alphabetical') {
      filteredResults.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setSearchResults(filteredResults);
  }, [searchQuery, selectedCategory, sortBy]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Search Articles</h1>
      
      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-10 text-sm border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-primary focus:border-primary dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
                placeholder="Search for articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="md:w-48">
            <select
              className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-4 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Sort By */}
          <div className="md:w-48">
            <select
              className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-4 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} 
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </h2>
        
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((article) => (
              <div key={article.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  {/* Placeholder for article image - in production, use real images */}
                  <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary font-medium">{article.category}</span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {new Date(article.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">{article.excerpt}</p>
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
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSortBy('newest');
              }}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Popular Searches */}
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {['Sustainable Fashion', 'Skincare', 'Mindfulness', 'Summer Trends', 'Wellness', 'Beauty Tips'].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="bg-white dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 px-4 py-2 rounded-full text-sm transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
