'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/data/articles';
import { getReadingTime } from '@/utils/readingTime';

interface RelatedArticlesProps {
  articleId: string;
  category?: string;
  limit?: number;
  className?: string;
  showReadingTime?: boolean;
}

const RelatedArticles = ({
  articleId,
  category,
  limit = 3,
  className = '',
  showReadingTime = true,
}: RelatedArticlesProps) => {
  const [relatedArticles, setRelatedArticles] = useState<typeof articles>([]);

  useEffect(() => {
    // Get related articles (same category, excluding current article)
    const filtered = articles
      .filter(article => {
        // If category is provided, filter by it, otherwise use the current article's category
        if (category) {
          return article.category === category && article.id.toString() !== articleId;
        } else {
          // Find the current article to get its category
          const currentArticle = articles.find(a => a.id.toString() === articleId);
          return currentArticle 
            ? article.category === currentArticle.category && article.id.toString() !== articleId
            : false;
        }
      })
      .slice(0, limit);
    
    setRelatedArticles(filtered);
  }, [articleId, category, limit]);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`mt-16 ${className}`}>
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <div key={article.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover">
            <div className="relative h-48 w-full img-hover-zoom">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-sm text-primary font-medium">{article.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </h3>
              <div className="flex justify-between items-center">
                {showReadingTime && (
                  <span className="text-sm text-neutral-500">{getReadingTime(article.content.substring(0, 200))}</span>
                )}
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-primary hover:text-primary-dark font-medium inline-flex items-center btn-glow px-3 py-1 rounded-md"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
