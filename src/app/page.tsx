import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import CategorySection from '@/components/home/CategorySection';
import Newsletter from '@/components/common/Newsletter';
import { articlesData } from '@/data/articlesData';

export const metadata: Metadata = {
  title: 'VogueVaults - Fashion, Beauty, Lifestyle & Culture',
  description: 'Discover the latest trends in fashion, beauty, lifestyle, and culture at VogueVaults.',
};

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
    </>
  );
}
