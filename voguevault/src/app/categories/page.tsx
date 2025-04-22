import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

// Mock category data - in a real application, this would come from a database
const categories = [
  { 
    name: "Fashion", 
    slug: "fashion", 
    description: "Explore the latest trends, designer collections, and style guides for every season.",
    image: "/images/category-fashion.jpg",
    articleCount: 4
  },
  { 
    name: "Lifestyle", 
    slug: "lifestyle", 
    description: "Discover tips for mindful living, home decor, wellness practices, and personal growth.",
    image: "/images/category-lifestyle.jpg",
    articleCount: 3
  },
  { 
    name: "Beauty", 
    slug: "beauty", 
    description: "Find beauty tips, product reviews, skincare routines, and makeup tutorials for all skin types.",
    image: "/images/category-beauty.jpg",
    articleCount: 2
  },
  { 
    name: "Culture", 
    slug: "culture", 
    description: "Stay informed about art, music, literature, and cultural movements shaping our world.",
    image: "/images/category-culture.jpg",
    articleCount: 2
  }
];

export const metadata = {
  title: 'Categories - VogueVault',
  description: 'Explore our collection of articles across fashion, lifestyle, beauty, and culture.',
};

export default function CategoriesPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Explore our collection of articles across various topics, from the latest fashion trends to lifestyle tips and cultural insights.
        </p>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link 
            key={category.slug} 
            href={`/categories/${category.slug}`}
            className="group"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                {/* Placeholder for category image - in production, use real images */}
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-3xl font-bold">{category.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <span className="bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-full text-sm">
                    {category.articleCount} {category.articleCount === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">{category.description}</p>
                <div className="text-primary font-medium flex items-center group-hover:underline">
                  Explore Category
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
