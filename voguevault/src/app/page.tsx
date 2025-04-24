import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import AdManager from "@/components/ads/AdManager";

// Mock data for featured articles
const featuredArticles = [
  {
    id: 1,
    title: "Summer Fashion Trends 2024: Bold Colors and Sustainable Fabrics",
    excerpt: "Discover the hottest fashion trends for summer 2024, featuring vibrant colors and eco-friendly materials.",
    category: "Fashion",
    image: "/images/articles/fashion/summer-trends.jpg",
    slug: "summer-fashion-trends-2024"
  },
  {
    id: 2,
    title: "The Art of Mindful Living: Finding Balance in a Busy World",
    excerpt: "Learn practical techniques to incorporate mindfulness into your daily routine and improve your well-being.",
    category: "Lifestyle",
    image: "/images/articles/lifestyle/mindful-living.jpg",
    slug: "mindful-living-balance"
  },
  {
    id: 3,
    title: "Clean Beauty Revolution: Ingredients to Look For and Avoid",
    excerpt: "Navigate the world of clean beauty with our comprehensive guide to beneficial and harmful ingredients.",
    category: "Beauty",
    image: "/images/articles/beauty/skincare-science.jpg",
    slug: "clean-beauty-ingredients-guide"
  }
];

// Mock data for categories
const categories = [
  { name: "Fashion", slug: "fashion", image: "/images/categories/fashion.jpg" },
  { name: "Lifestyle", slug: "lifestyle", image: "/images/categories/lifestyle.jpg" },
  { name: "Beauty", slug: "beauty", image: "/images/categories/beauty.jpg" },
  { name: "Culture", slug: "culture", image: "/images/categories/culture.jpg" }
];

// Mock data for latest articles
const latestArticles = [
  {
    id: 4,
    title: "The Rise of Sustainable Fashion Brands",
    excerpt: "Explore how eco-conscious fashion brands are changing the industry landscape.",
    category: "Fashion",
    image: "/images/articles/fashion/sustainable-fashion.jpg",
    slug: "sustainable-fashion-brands"
  },
  {
    id: 5,
    title: "Home Office Design Tips for Productivity",
    excerpt: "Create a workspace that enhances focus and creativity with these design principles.",
    category: "Lifestyle",
    image: "/images/articles/lifestyle/home-organization.jpg",
    slug: "home-office-design-tips"
  },
  {
    id: 6,
    title: "Natural Skincare Routines for Every Skin Type",
    excerpt: "Discover personalized skincare regimens using natural ingredients for all skin concerns.",
    category: "Beauty",
    image: "/images/articles/beauty/natural-skincare-routines.jpg",
    slug: "natural-skincare-routines"
  },
  {
    id: 7,
    title: "The Influence of Street Art on Fashion",
    excerpt: "How urban art movements are shaping contemporary fashion trends worldwide.",
    category: "Culture",
    image: "/images/articles/culture/street-art.jpg",
    slug: "street-art-fashion-influence"
  }
];

export default function Home() {
  return (
    <>
      <Script id="google-adsense-verification" strategy="beforeInteractive">
        {`
          <meta name="google-adsense-account" content="ca-pub-8215873816542659">
        `}
      </Script>
      <Script id="google-adsense" strategy="beforeInteractive" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659" crossOrigin="anonymous" />
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative rounded-xl overflow-hidden h-[500px] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
            <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">Featured</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">The Future of Sustainable Fashion</h1>
            <p className="text-lg mb-6 max-w-2xl">How innovative designers are revolutionizing the industry with eco-friendly practices and materials.</p>
            <Link
              href="/articles/future-sustainable-fashion"
              className="bg-white text-primary hover:bg-primary-light hover:text-white px-6 py-3 rounded-full font-medium transition-colors inline-block"
            >
              Read Article
            </Link>
          </div>
          <div className="absolute inset-0">
            {/* Hero image */}
            <Image
              src="/images/articles/fashion/future-sustainable-fashion.jpg"
              alt="The Future of Sustainable Fashion"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Articles</h2>
          <Link href="/articles" className="text-primary hover:text-primary-dark">
            View All
          </Link>
        </div>

        {/* Ad before featured articles */}
        <div className="mb-8">
          <AdManager type="horizontal" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <div key={article.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
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
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.slug}`}
              className="relative rounded-xl overflow-hidden h-40 group"
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
              {/* Category image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Section */}
      <section className="mb-16">
        <AdManager type="article" />
      </section>

      {/* Latest Articles Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Link href="/articles" className="text-primary hover:text-primary-dark">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((article) => (
            <div key={article.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-primary font-medium">{article.category}</span>
                <h3 className="text-lg font-bold mt-1 mb-2">
                  <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">{article.excerpt}</p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Ad Section */}
      <section className="mb-16">
        <AdManager type="vertical" />
      </section>

      {/* Newsletter Section */}
      <section className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8">Stay updated with the latest fashion trends, lifestyle tips, and exclusive content.</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
    </>
  );
}
