'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReadingProgress from '@/components/ui/ReadingProgress';
import TableOfContents from '@/components/ui/TableOfContents';
import BookmarkButton from '@/components/features/BookmarkButton';
import ReadingListButton from '@/components/features/ReadingListButton';
import ShareButtons from '@/components/features/ShareButtons';
import CommentSection from '@/components/features/CommentSection';
import AdManager from '@/components/ads/AdManager';
import { getReadingTime } from '@/utils/readingTime';
import { updateReadingProgress } from '@/utils/readingList';
import { articles } from '@/data/articles';

export default function ArticleClientPage({ slug }: { slug: string }) {
  const article = articles.find(article => article.slug === slug);
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

  // Get related articles (same category, excluding current article)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // Create breadcrumb items for this article
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: article.category, href: `/categories/${article.category.toLowerCase()}` },
    { label: article.title, href: `/articles/${article.slug}` }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
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
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
          className="object-cover"
        />
      </div>

      {/* Article Content with Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block">
          <TableOfContents contentRef={contentRef} sticky />

          {/* Sidebar Ad */}
          <div className="mt-8">
            <AdManager type="sidebar" />
          </div>
        </div>

        {/* Article Content */}
        <div className="lg:col-span-3">
          <div ref={contentRef} className="prose prose-lg dark:prose-invert max-w-none">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden mb-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <TableOfContents contentRef={contentRef} sticky={false} />
            </div>

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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>

          {/* Related Articles Ad */}
          <div className="mb-8">
            <AdManager type="horizontal" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <div key={relatedArticle.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover">
                <div className="relative h-48 w-full img-hover-zoom">
                  <Image
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{relatedArticle.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">
                    <Link href={`/articles/${relatedArticle.slug}`} className="hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </Link>
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-500">{getReadingTime(relatedArticle.content.substring(0, 200))}</span>
                    <Link
                      href={`/articles/${relatedArticle.slug}`}
                      className="text-primary hover:text-primary-dark font-medium inline-flex items-center btn-glow px-3 py-1 rounded-md"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
