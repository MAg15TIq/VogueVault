'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReadingProgress from '@/components/ui/ReadingProgress';
import TableOfContents from '@/components/ui/TableOfContents';
import BookmarkButton from '@/components/features/BookmarkButton';
import ReadingListButton from '@/components/features/ReadingListButton';
import ShareButtons from '@/components/features/ShareButtons';
import CommentSection from '@/components/features/CommentSection';
import SocialProof from '@/components/features/SocialProof';
import AdManager from '@/components/ads/AdManager';
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/seo';
import { getReadingTime } from '@/utils/readingTime';
import { updateReadingProgress } from '@/utils/readingList';
import { getArticleBySlug, getRelatedArticles } from '@/data/articleStore';

export default function ArticleClientPage({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!article) {
    return <div>Article not found</div>;
  }

  // Update reading progress when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const windowHeight = window.innerHeight;
      const documentHeight = element.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate reading progress (0-100)
      const progress = Math.min(100, Math.max(0, (scrollTop / (documentHeight - windowHeight)) * 100));

      // Update reading progress in storage
      updateReadingProgress(article.id.toString(), progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [article.id]);

  // Format the publish date
  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate reading time
  const readingTime = getReadingTime(article.content);

  // Get related articles using the helper function
  const relatedArticles = getRelatedArticles(article, 4);

  // Create breadcrumb items for this article
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: article.category, href: `/categories/${article.category.toLowerCase()}` },
    { label: article.title, href: `/articles/${article.slug}` }
  ];

  // Get the current URL for structured data
  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/articles/${article.slug}`;
    }
    return `/articles/${article.slug}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Structured Data for SEO */}
      <ArticleStructuredData
        title={article.title}
        description={article.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...'}
        url={getFullUrl()}
        imageUrl={article.image.startsWith('http') ? article.image : `${typeof window !== 'undefined' ? window.location.origin : ''}${article.image}`}
        authorName={article.author}
        publishDate={article.publishDate}
        categoryName={article.category}
      />

      <BreadcrumbStructuredData
        items={breadcrumbItems.map(item => ({
          name: item.label,
          url: item.href.startsWith('http') ? item.href : `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}`
        }))}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgress targetRef={contentRef} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Article Header */}
      <div className="mb-8">
        <Link href={`/categories/${article.category.toLowerCase()}`} className="text-primary font-medium">
          {article.category}
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center text-neutral-600 dark:text-neutral-400">
          <span>By {article.author}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{readingTime}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
        <OptimizedImage
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Floating Table of Contents (visible on all screen sizes) */}
      <TableOfContents contentRef={contentRef} floatingPosition={true} />

      {/* Article Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          {/* Sidebar Ad */}
          <div className="sticky top-24">
            <AdManager type="sidebar" />

            {/* Social Proof - Compact */}
            <div className="mt-8">
              <SocialProof
                variant="compact"
                showStats={true}
                showTestimonials={true}
                title=""
                description=""
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="lg:col-span-3">
          <div ref={contentRef} className="prose prose-lg dark:prose-invert max-w-none">
            {/* Top Ad */}
            <AdManager type="horizontal" />

            <div dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Middle Ad */}
            <AdManager type="in-article" />

            {/* Bottom Ad */}
            <AdManager type="article" />
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ShareButtons
                url={`/articles/${article.slug}`}
                title={article.title}
                description={article.content.substring(0, 150)}
                image={article.image}
                showLabel={true}
                variant="minimal"
              />
              <div className="flex space-x-2">
                <ReadingListButton
                  articleId={article.id.toString()}
                  variant="outline"
                  className="rounded-md"
                  showText={false}
                />
                <BookmarkButton
                  articleId={article.id.toString()}
                  variant="outline"
                  className="rounded-md"
                  showText={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto px-4 max-w-3xl">
        <CommentSection articleId={article.id.toString()} />
      </div>

      {/* Enhanced Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 bg-neutral-50 dark:bg-neutral-900 py-12 px-4 md:px-8 rounded-xl">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">You May Also Like</h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Explore more articles similar to "{article.title}" that might interest you
              </p>
            </div>

            {/* Related Articles Ad */}
            <div className="mb-8">
              <AdManager type="horizontal" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <OptimizedImage
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      quality={80}
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 m-2 rounded">
                      {relatedArticle.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      <Link href={`/articles/${relatedArticle.slug}`} className="hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 flex items-center">
                      <span className="mr-2">By {relatedArticle.author}</span>
                      <span>•</span>
                      <span className="ml-2">{getReadingTime(relatedArticle.content.substring(0, 200))}</span>
                    </div>
                    <div className="mt-auto pt-3">
                      <Link
                        href={`/articles/${relatedArticle.slug}`}
                        className="text-primary hover:text-primary-dark font-medium inline-flex items-center group"
                      >
                        Read Article
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Articles Button */}
            <div className="text-center mt-10">
              <Link
                href={`/categories/${article.category.toLowerCase()}`}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors inline-block"
              >
                View All {article.category} Articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
