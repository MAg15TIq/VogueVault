import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { articlesData } from '@/data/articlesData';

// Mock category data - in a real application, this would come from a database
const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    description: "Explore the latest trends, designer collections, and style guides for every season.",
    image: "/images/category-fashion.jpg"
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Discover tips for mindful living, home decor, wellness practices, and personal growth.",
    image: "/images/category-lifestyle.jpg"
  },
  {
    name: "Beauty",
    slug: "beauty",
    description: "Find beauty tips, product reviews, skincare routines, and makeup tutorials for all skin types.",
    image: "/images/category-beauty.jpg"
  },
  {
    name: "Culture",
    slug: "culture",
    description: "Stay informed about art, music, literature, and cultural movements shaping our world.",
    image: "/images/category-culture.jpg"
  }
];

// Use the articles from the shared data file
// We'll create a simplified version for the category page that includes only the necessary fields
const articles = articlesData.map(article => ({
  id: article.id,
  title: article.title,
  excerpt: article.excerpt || '',
  category: article.category,
  image: article.image,
  slug: article.slug,
  publishDate: article.publishDate,
  author: article.author
}));

// Generate metadata for each category page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found - VogueVault',
      description: 'The requested category could not be found.'
    };
  }

  return {
    title: `${category.name} - VogueVault`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter articles by category
  const categoryArticles = articles.filter(article =>
    article.category.toLowerCase() === category.name.toLowerCase()
  );

  // Create breadcrumb items for this category
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: category.name, href: `/categories/${category.slug}` }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Category Header */}
      <div className="relative rounded-xl overflow-hidden h-[300px] w-full mb-12">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg max-w-2xl">{category.description}</p>
        </div>
        <div className="absolute inset-0">
          {/* Category image */}
          <Image
            src={`/images/categories/${category.slug}.jpg`}
            alt={category.name}
            fill
            className="object-cover opacity-80"
          />
        </div>
      </div>

      {/* Category Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryArticles.length > 0 ? (
          categoryArticles.map((article) => (
            <div key={article.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                {/* Placeholder for article image - in production, use real images */}
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
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
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              There are currently no articles in this category. Please check back later.
            </p>
          </div>
        )}
      </div>

      {/* Other Categories Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Explore Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories
            .filter(cat => cat.slug !== slug)
            .map((cat) => (
              <Link
                key={cat.name}
                href={`/categories/${cat.slug}`}
                className="relative rounded-xl overflow-hidden h-32 group"
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
                {/* Category image */}
                <Image
                  src={`/images/categories/${cat.slug}.jpg`}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
