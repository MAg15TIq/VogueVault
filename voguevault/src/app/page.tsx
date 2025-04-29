import Image from "next/image";
import Link from "next/link";
import AdManager from "@/components/ads/AdManager";
import { WebsiteStructuredData } from "@/components/seo";

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
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Value Proposition */}
      <section className="mb-16">
        <div className="relative rounded-xl overflow-hidden h-[500px] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
            {/* Value Proposition */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">VogueVault</h1>
              <p className="text-xl font-medium mb-2">Your Premier Destination for Fashion & Lifestyle</p>
              <p className="text-lg max-w-2xl">Curated content on fashion trends, lifestyle tips, beauty secrets, and cultural insights — all in one place.</p>
            </div>

            {/* Featured Article */}
            <div className="mb-6 border-l-4 border-primary pl-4">
              <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">Featured</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">The Future of Sustainable Fashion</h2>
              <p className="text-base mb-4 max-w-2xl">How innovative designers are revolutionizing the industry with eco-friendly practices and materials.</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles/future-sustainable-fashion"
                className="bg-white text-primary hover:bg-primary-light hover:text-white px-6 py-3 rounded-full font-medium transition-colors inline-block"
              >
                Read Featured Article
              </Link>
              <Link
                href="/articles"
                className="bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-full font-medium transition-colors inline-block"
              >
                Explore All Articles
              </Link>
            </div>
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

      {/* Categories Section - Enhanced */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Explore Categories</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">Discover curated content across our four main categories, each offering unique insights and inspiration.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Link
                href={`/categories/${category.slug}`}
                className="relative h-48 w-full group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-all duration-300 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
                {/* Category image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </Link>
              <div className="p-4 bg-white dark:bg-neutral-800 flex-grow">
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                  {category.slug === 'fashion' && 'Explore the latest trends, designer collections, and style guides.'}
                  {category.slug === 'lifestyle' && 'Discover tips for mindful living, wellness, and personal growth.'}
                  {category.slug === 'beauty' && 'Find beauty tips, skincare routines, and makeup tutorials.'}
                  {category.slug === 'culture' && 'Stay informed about art, music, literature, and cultural movements.'}
                </p>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center"
                >
                  Browse Articles
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
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

      {/* Social Proof & Testimonials Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">What Our Readers Say</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">Join thousands of readers who trust VogueVault for quality content on fashion, lifestyle, beauty, and culture.</p>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10k+</div>
            <div className="text-neutral-600 dark:text-neutral-300">Monthly Readers</div>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">40+</div>
            <div className="text-neutral-600 dark:text-neutral-300">Quality Articles</div>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8</div>
            <div className="text-neutral-600 dark:text-neutral-300">Average Rating</div>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2k+</div>
            <div className="text-neutral-600 dark:text-neutral-300">Social Followers</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">"VogueVault has become my go-to source for fashion inspiration. The articles are well-researched and provide practical advice I can actually use in my daily life."</p>
            <div className="flex items-center">
              <div className="font-medium">Sarah J.</div>
              <div className="mx-2">•</div>
              <div className="text-neutral-500 text-sm">Fashion Enthusiast</div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">"The lifestyle articles have genuinely helped me improve my daily routines. I appreciate the depth and thoughtfulness that goes into each piece. Highly recommended!"</p>
            <div className="flex items-center">
              <div className="font-medium">Michael T.</div>
              <div className="mx-2">•</div>
              <div className="text-neutral-500 text-sm">Regular Reader</div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">"The beauty articles on VogueVault have completely transformed my skincare routine. I love how they explain the science behind products and provide honest reviews."</p>
            <div className="flex items-center">
              <div className="font-medium">Aisha K.</div>
              <div className="mx-2">•</div>
              <div className="text-neutral-500 text-sm">Beauty Blogger</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-8 md:p-12 border border-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">Subscribe to our newsletter and be the first to receive:</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Exclusive content not published on the website</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Early access to new features and content</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Curated weekly roundups of our best articles</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Special offers from our partners</span>
              </li>
            </ul>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">We respect your privacy. Unsubscribe at any time.</p>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span className="text-sm">I agree to receive marketing emails</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
