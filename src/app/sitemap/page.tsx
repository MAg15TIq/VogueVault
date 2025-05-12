import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { articlesData } from '@/data/articlesData';

export const metadata = {
  title: 'Sitemap - VogueVaults',
  description: 'Sitemap for VogueVaults - Your premier destination for fashion trends, lifestyle tips, and cultural insights.',
};

export default function SitemapPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Sitemap', href: '/sitemap' }
  ];

  // Group articles by category
  const articlesByCategory = articlesData.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, typeof articlesData>);

  // Sort categories alphabetically
  const categories = Object.keys(articlesByCategory).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          A complete map of all pages on VogueVaults
        </p>
      </div>

      {/* Sitemap Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Main Pages</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <Link href="/" className="text-primary hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/about" className="text-primary hover:underline">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="text-primary hover:underline">Contact Us</Link>
            </li>
            <li>
              <Link href="/articles" className="text-primary hover:underline">All Articles</Link>
            </li>
            <li>
              <Link href="/search" className="text-primary hover:underline">Search</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
            </li>
            <li>
              <Link href="/faq" className="text-primary hover:underline">FAQ</Link>
            </li>
            <li>
              <Link href="/gallery" className="text-primary hover:underline">Gallery</Link>
            </li>
            <li>
              <Link href="/sitemap" className="text-primary hover:underline">Sitemap</Link>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">Categories</h2>
          <ul className="list-disc pl-6 mb-6">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="text-primary hover:underline"
                >
                  {category}
                </Link>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-2">
                  ({articlesByCategory[category].length} articles)
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">All Articles</h2>
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-bold mb-3">{category}</h3>
              <ul className="list-disc pl-6">
                {articlesByCategory[category]
                  .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
                  .map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-primary hover:underline"
                      >
                        {article.title}
                      </Link>
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-2">
                        ({new Date(article.publishDate).toLocaleDateString()})
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
