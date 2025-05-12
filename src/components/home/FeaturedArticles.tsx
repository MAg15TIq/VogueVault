'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'fashion' | 'beauty' | 'lifestyle' | 'culture';
  image: string;
  author: {
    name: string;
    image: string;
    role: string;
    email: string;
  };
  publishDate: string;
  readTime: number;
  tags: string[];
}

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Limit to 6 articles for display
  const displayArticles = articles.slice(0, 6);

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        {/* Blog Header - Horizone Style */}
        <div className="mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 font-serif transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Blog
          </h2>
          <p className={`text-muted-foreground max-w-2xl transition-all duration-700 delay-100 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Here, we share fashion insights, style guides, and stories that inspire your next look.
          </p>
        </div>

        {/* Category Tabs - Horizone Style */}
        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-200 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Button variant="outline" className="rounded-full bg-primary text-white hover:bg-primary/90">
            All
          </Button>
          <Button variant="outline" className="rounded-full hover:bg-muted/50">
            Fashion
          </Button>
          <Button variant="outline" className="rounded-full hover:bg-muted/50">
            Beauty
          </Button>
          <Button variant="outline" className="rounded-full hover:bg-muted/50">
            Lifestyle
          </Button>
          <Button variant="outline" className="rounded-full hover:bg-muted/50">
            Culture
          </Button>

          <div className="ml-auto flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
            <select className="bg-transparent border border-border rounded-md px-2 py-1 text-sm">
              <option>Newest</option>
              <option>Popular</option>
              <option>Trending</option>
            </select>
          </div>
        </div>

        {/* Featured Articles Grid - Horizone Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayArticles.map((article, index) => (
            <div
              key={article.id}
              className={`transition-all duration-700 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <ArticleCard
                article={article}
                variant="default"
                className="h-full transform hover:scale-[1.01] transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* View All Button - Horizone Style */}
        <div className={`mt-10 text-center transition-all duration-700 delay-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link href="/articles">
            <Button variant="outline" size="lg" className="group rounded-full px-6">
              View All Articles
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
