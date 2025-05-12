'use client';

import { AdManager } from '@/components/ads';
import HeroSection from '@/components/home/HeroSection';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import CategorySection from '@/components/home/CategorySection';
import Newsletter from '@/components/common/Newsletter';
import HomePageAds from '@/components/home/HomePageAds';
import { articlesData } from '@/data/articlesData';

// Metadata is now defined in layout.tsx since this is a client component

export default function Home() {
  // Get featured article for hero section
  const featuredArticle = articlesData[0]; // Using the first article as featured

  // Get articles for featured section (excluding the hero article)
  const featuredArticles = articlesData.slice(1, 7);

  // Get fashion articles
  const fashionArticles = articlesData.filter(
    (article) => article.category === 'fashion'
  );

  // Get beauty articles
  const beautyArticles = articlesData.filter(
    (article) => article.category === 'beauty'
  );

  // Get lifestyle articles
  const lifestyleArticles = articlesData.filter(
    (article) => article.category === 'lifestyle'
  );

  // Get culture articles
  const cultureArticles = articlesData.filter(
    (article) => article.category === 'culture'
  );

  return (
    <>
      {/* Hero Section */}
      <HeroSection featuredArticle={featuredArticle} />

      {/* Featured Articles */}
      <FeaturedArticles articles={featuredArticles} />

      {/* Fashion Section */}
      {fashionArticles.length > 0 && (
        <CategorySection
          title="Fashion"
          articles={fashionArticles}
          viewAllLink="/categories/fashion"
        />
      )}

      {/* Ad Section - Demonstrating both approaches */}
      <HomePageAds />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Beauty Section */}
      {beautyArticles.length > 0 && (
        <CategorySection
          title="Beauty"
          articles={beautyArticles}
          viewAllLink="/categories/beauty"
        />
      )}

      {/* Lifestyle Section */}
      {lifestyleArticles.length > 0 && (
        <CategorySection
          title="Lifestyle"
          articles={lifestyleArticles}
          viewAllLink="/categories/lifestyle"
        />
      )}

      {/* Culture Section */}
      {cultureArticles.length > 0 && (
        <CategorySection
          title="Culture"
          articles={cultureArticles}
          viewAllLink="/categories/culture"
        />
      )}

      {/* Bottom Ad Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-medium mb-2">Sponsored Content</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Using AdManager for standard placement */}
            <AdManager type="horizontal" />
          </div>
        </div>
      </section>
    </>
  );
}
