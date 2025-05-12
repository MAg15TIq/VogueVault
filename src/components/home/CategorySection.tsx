'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/articles/ArticleCard';
import { ChevronRight, Shirt, Sparkles, Coffee, BookOpen } from 'lucide-react';

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

interface CategorySectionProps {
  title: string;
  articles: Article[];
  viewAllLink: string;
}

const CategorySection = ({ title, articles, viewAllLink }: CategorySectionProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get unique tags from articles
  const tags = Array.from(
    new Set(
      articles
        .flatMap((article) => article.category)
        .filter(Boolean)
    )
  );

  // Filter articles based on active tag
  const filteredArticles =
    activeTab === 'all'
      ? articles
      : articles.filter((article) => article.category === activeTab);

  // Get category icon
  const getCategoryIcon = () => {
    switch (title.toLowerCase()) {
      case 'fashion':
        return <Shirt className="h-6 w-6 text-primary" />;
      case 'beauty':
        return <Sparkles className="h-6 w-6 text-primary" />;
      case 'lifestyle':
        return <Coffee className="h-6 w-6 text-primary" />;
      case 'culture':
        return <BookOpen className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section ref={ref} className="py-16 border-t border-border/10">
      <div className="container mx-auto px-4">
        {/* Category Header - Horizone Style */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center gap-3">
            <div className="bg-muted/50 p-2 rounded-full">
              {getCategoryIcon()}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif">{title}</h2>
          </div>
          <Link href={viewAllLink}>
            <Button variant="outline" className="group mt-2 md:mt-0 rounded-full px-5">
              View All {title}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Category Tabs - Horizone Style */}
        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={`rounded-full ${activeTab === 'all' ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-muted/50'}`}
          >
            All
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={activeTab === tag ? 'default' : 'outline'}
              onClick={() => setActiveTab(tag)}
              className={`rounded-full capitalize ${activeTab === tag ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-muted/50'}`}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Articles Grid - Horizone Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(0, 3).map((article, index) => (
            <div
              key={article.id}
              className={`transition-all duration-700 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <ArticleCard
                article={article}
                className="h-full transform hover:scale-[1.01] transition-all duration-300 hover:shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Category Description Card - Horizone Style */}
        <div className={`mt-12 bg-muted/30 rounded-xl p-8 border border-border/30 shadow-sm transition-all duration-700 delay-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-primary/10 p-4 rounded-full shrink-0">
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Explore {title}</h3>
              <p className="text-muted-foreground mb-4">
                {title === 'Fashion' && 'Discover the latest trends, sustainable practices, and style guides to elevate your wardrobe.'}
                {title === 'Beauty' && 'Explore skincare routines, makeup tutorials, and beauty product reviews for your self-care journey.'}
                {title === 'Lifestyle' && 'Find wellness tips, home decor inspiration, and productivity hacks to enhance your daily life.'}
                {title === 'Culture' && 'Immerse yourself in art, literature, film, and music discussions that shape our cultural landscape.'}
              </p>
              <Link href={viewAllLink}>
                <Button variant="outline" className="group rounded-full px-5">
                  Browse all {title} articles
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
