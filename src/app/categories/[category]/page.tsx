import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articlesData } from '@/data/articlesData';
import ArticleCard from '@/components/articles/ArticleCard';
import { Button } from '@/components/ui/button';
import Newsletter from '@/components/common/Newsletter';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return {
    title: `${category} - VogueVaults`,
    description: `Explore our collection of ${params.category} articles at VogueVaults.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = params.category.toLowerCase();

  // Validate category
  const validCategories = ['fashion', 'beauty', 'lifestyle', 'culture'];
  if (!validCategories.includes(categoryName)) {
    notFound();
  }

  // Get articles for this category
  const categoryArticles = articlesData.filter(
    (article) => article.category.toLowerCase() === categoryName
  );

  // Format category name for display
  const displayCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{displayCategory}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our collection of {categoryName} articles, featuring the latest trends, tips, and insights.
        </p>
      </div>

      {/* Articles Grid */}
      {categoryArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No articles found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find any articles in this category. Check back soon for new content!
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
