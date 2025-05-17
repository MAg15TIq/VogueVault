'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AdManager from '@/components/ads/AdManager';
import ArticleCard from '@/components/articles/ArticleCard'; // Assuming ArticleCard can handle the NewArticle structure or is adapted
import {
  Share2,
  Bookmark,
  Copy,
  List,
} from 'lucide-react';

// Define the new Article structure based on the provided template
interface ArticleAuthor {
  name: string;
  image: string;
  role: string;
  bio: string;
}

interface ArticleImage {
  src: string;
  alt: string; // SEO: Alt text with keywords
}


interface ArticleSection {
  id: string;
  title: string; // For H2/H3 heading
  // Content can be a simple string (HTML/Markdown) or a more structured object
  // For simplicity, using string here. In a real app, this might be a rich text object.
  content: string;
  // Optional elements for a section
  subheading?: string; // For H3 within a section
  listItems?: string[]; // For bullet points or numbered lists
  quote?: { text: string; source?: string };
  image?: ArticleImage;
}

interface FAQItem {
  question: string;
  answer: string;
}

export interface NewArticle {
  id: string;
  slug: string; // SEO: For URL structure
  title: string; // SEO: H1, page title (60-70 chars)
  metaDescription: string; // SEO: For meta tag (150-160 chars) - Handled at page level (e.g., Next.js metadata)
  primaryKeyword: string; // SEO: For content strategy

  category: string;
  author: ArticleAuthor;
  publishDate: string; // ISO date string
  readTime: number; // in minutes
  featuredImage: ArticleImage;

  introduction: {
    id: string;
    text: string;
  };

  backgroundContext?: ArticleSection;
  mainPoint1: ArticleSection;
  mainPoint2: ArticleSection;
  mainPoint3: ArticleSection;
  practicalApplication: ArticleSection;
  futureTrends?: ArticleSection;

  conclusion: {
    id: string;
    text: string;
  };

  faq?: {
    id: string;
    items: FAQItem[];
  };

  tags: string[]; // SEO: Relevant tags
}

interface ArticleTemplateProps {
  article: NewArticle;
  relatedArticles: NewArticle[]; // Assuming related articles also follow this structure
}

const ArticleTemplate: React.FC<ArticleTemplateProps> = ({ article, relatedArticles }) => {
  const [activeSection, setActiveSection] = useState<string>(article.introduction?.id || 'introduction');
  const [tocVisible, setTocVisible] = useState<boolean>(true);
  const [tocCollapsed, setTocCollapsed] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Create table of contents sections with safety checks
  const articleSectionsForToc = React.useMemo(() => {
    if (!article) return [];

    const sections = [
      { id: article.introduction?.id || 'introduction', title: 'Introduction' },
    ];

    // Add background context if it exists
    if (article.backgroundContext?.id && article.backgroundContext?.title) {
      sections.push({
        id: article.backgroundContext.id,
        title: article.backgroundContext.title
      });
    }

    // Add main points with safety checks
    if (article.mainPoint1?.id && article.mainPoint1?.title) {
      sections.push({ id: article.mainPoint1.id, title: article.mainPoint1.title });
    }

    if (article.mainPoint2?.id && article.mainPoint2?.title) {
      sections.push({ id: article.mainPoint2.id, title: article.mainPoint2.title });
    }

    if (article.mainPoint3?.id && article.mainPoint3?.title) {
      sections.push({ id: article.mainPoint3.id, title: article.mainPoint3.title });
    }

    // Add practical application if it exists
    if (article.practicalApplication?.id && article.practicalApplication?.title) {
      sections.push({
        id: article.practicalApplication.id,
        title: article.practicalApplication.title
      });
    }

    // Add future trends if they exist
    if (article.futureTrends?.id && article.futureTrends?.title) {
      sections.push({ id: article.futureTrends.id, title: article.futureTrends.title });
    }

    // Add conclusion
    sections.push({ id: 'conclusion', title: 'Conclusion' });

    // Add FAQ if it exists
    if (article.faq?.id) {
      sections.push({ id: article.faq.id, title: 'FAQ' });
    }

    return sections;
  }, [
    article?.introduction?.id,
    article?.backgroundContext?.id,
    article?.backgroundContext?.title,
    article?.mainPoint1?.id,
    article?.mainPoint1?.title,
    article?.mainPoint2?.id,
    article?.mainPoint2?.title,
    article?.mainPoint3?.id,
    article?.mainPoint3?.title,
    article?.practicalApplication?.id,
    article?.practicalApplication?.title,
    article?.futureTrends?.id,
    article?.futureTrends?.title,
    article?.faq?.id
  ]);

  useEffect(() => {
    // Skip if article is not available
    if (!article?.introduction?.id) return;

    const handleScroll = () => {
      const sections = articleSectionsForToc.map(sec => document.getElementById(sec.id)).filter(Boolean);
      let currentSectionId = article.introduction.id || 'introduction';

      sections.forEach((sectionEl) => {
        if (sectionEl) {
          const sectionTop = sectionEl.getBoundingClientRect().top;
          if (sectionTop < 200) { // Adjust offset as needed
            currentSectionId = sectionEl.id;
          }
        }
      });
      setActiveSection(currentSectionId);

      if (window.innerWidth < 1024) {
        setTocVisible(window.scrollY <= 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article?.introduction?.id, articleSectionsForToc]); // Re-run if article intro ID or sections change

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareMenuRef]);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const toggleSave = () => setIsSaved(!isSaved);
  const toggleTocCollapse = () => setTocCollapsed(!tocCollapsed);

  // Helper to render a generic section
  const renderSection = (section: ArticleSection | undefined, sectionTitleOverride?: string) => {
    if (!section) return null;
    return (
      <section id={section.id} className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-primary/30 text-foreground font-serif relative">
          <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-primary/80 rounded-r-md hidden md:block"></span>
          {sectionTitleOverride || section.title}
        </h2>
        {/* SEO: Use H3 for subheadings if section.subheading exists */}
        {section.subheading && <h3 className="text-xl font-semibold mb-4 text-primary/90 font-serif">{section.subheading}</h3>}

        {/* Content - Assuming it's HTML/Markdown rendered by prose styles */}
        <div className="prose-headings:font-semibold prose-headings:text-primary/90 prose-p:mb-4 prose-ul:my-6 prose-ol:my-6" dangerouslySetInnerHTML={{ __html: section.content }} />

        {/* SEO: Image with alt text */}
        {section.image && (
          <figure className="my-8">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={section.image.src}
                alt={section.image.alt} // SEO: Keyword-rich alt text
                fill
                className="object-cover"
              />
            </div>
            {/* Optional: figcaption */}
          </figure>
        )}
        {/* SEO: Bullet points/numbered lists - Assuming they are part of section.content HTML */}
        {/* SEO: Quotes - Assuming they are part of section.content HTML or handled by a custom component */}
      </section>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SEO: Meta Description is handled at the page level in Next.js (e.g. using generateMetadata) */}
      {/* <Head><meta name="description" content={article.metaDescription} /></Head> */}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1">
          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="mb-6">
              <Link
                href={`/categories/${article.category.toLowerCase()}`}
                className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full uppercase tracking-wider mb-4"
              >
                {article.category}
              </Link>
              {/* SEO: H1 Title (60-70 characters) */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif">
                {article.title}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={article.author.image} alt={article.author.name} unoptimized />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(article.publishDate)} · {article.readTime} min read
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="relative" ref={shareMenuRef}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}>
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                    {isShareMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg border z-50 overflow-hidden">
                        <div className="p-2">
                          <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted flex items-center gap-2" onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'); setIsShareMenuOpen(false); }}>
                            <span className="text-blue-600">FB</span> Facebook
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted flex items-center gap-2" onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank'); setIsShareMenuOpen(false); }}>
                            <span className="text-sky-500">X</span> Twitter
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted flex items-center gap-2" onClick={() => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank'); setIsShareMenuOpen(false); }}>
                            <span className="text-blue-700">in</span> LinkedIn
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted flex items-center gap-2" onClick={() => { copyToClipboard(); setIsShareMenuOpen(false); }}>
                            <Copy className="h-4 w-4" /> {copySuccess ? 'Copied!' : 'Copy Link'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button variant={isSaved ? "default" : "outline"} size="sm" className="flex items-center gap-1" onClick={toggleSave}>
                    <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-5xl mx-auto mb-12 relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage.src}
              alt={article.featuredImage.alt} // SEO: Alt text for featured image
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content - Professional SEO Template Structure */}
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            {/* Introduction (150-200 words) */}
            <section id={article.introduction.id} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-primary/30 text-foreground font-serif relative">
                <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-primary/80 rounded-r-md hidden md:block"></span>
                Introduction
              </h2>
              <div className="text-lg leading-relaxed prose-p:mb-4 prose-p:first-of-type:text-xl prose-p:first-of-type:font-medium" dangerouslySetInnerHTML={{ __html: article.introduction.text }} />
            </section>

            {/* Section 1: Background/Context (200-250 words) */}
            {article.backgroundContext && renderSection(article.backgroundContext)}

            {/* Section 2: Main Point #1 (250-300 words) */}
            {renderSection(article.mainPoint1)}

            {/* In-article Ad Placement */}
            <div className="my-12">
              <AdManager type="in-article" />
            </div>

            {/* Section 3: Main Point #2 (250-300 words) */}
            {renderSection(article.mainPoint2)}

            {/* Section 4: Main Point #3 (250-300 words) */}
            {renderSection(article.mainPoint3)}

            {/* Section 5: Practical Application/Tips (200-250 words) */}
            {renderSection(article.practicalApplication)}

            {/* Section 6: Future Trends/Considerations (Optional) (150-200 words) */}
            {article.futureTrends && renderSection(article.futureTrends)}

            {/* Conclusion (150-200 words) */}
            <section id="conclusion" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-primary/30 text-foreground font-serif relative">
                <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-primary/80 rounded-r-md hidden md:block"></span>
                Conclusion
              </h2>
              <div className="prose-headings:font-semibold prose-headings:text-primary/90 prose-p:mb-4">
                {/* Remove any h2 tags that might be in the conclusion text */}
                <div dangerouslySetInnerHTML={{
                  __html: article.conclusion.text.replace(/<h2>Conclusion<\/h2>/g, '')
                }} />
              </div>
            </section>

            {/* Multiplex/AutoRelaxed Ad */}
            <div className="my-12">
              <AdManager type="autorelaxed" />
            </div>

            {/* Article Bottom Ad */}
            <div className="my-12">
              <AdManager type="article" />
            </div>

            {/* FAQ Section (Optional but recommended for SEO) (150-200 words) */}
            {article.faq && (
              <section id={article.faq.id} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-primary/30 text-foreground font-serif relative">
                  <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-primary/80 rounded-r-md hidden md:block"></span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {article.faq.items.map((faq, index) => (
                    <div key={index} className="bg-muted/50 p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-3 text-primary/90 font-serif">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author Bio */}
            <section className="mt-16 border-t pt-8">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={article.author.image} alt={article.author.name} unoptimized />
                  <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{article.author.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{article.author.role}</p>
                  <p>{article.author.bio}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Related Articles */}
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-primary/30 text-foreground font-serif relative">
              <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-primary/80 rounded-r-md hidden md:block"></span>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={{
                  id: relatedArticle.id,
                  title: relatedArticle.title,
                  slug: relatedArticle.slug,
                  excerpt: relatedArticle.introduction.text.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
                  category: relatedArticle.category as 'fashion' | 'beauty' | 'lifestyle' | 'culture',
                  image: relatedArticle.featuredImage.src,
                  author: {
                    name: relatedArticle.author.name,
                    image: relatedArticle.author.image,
                    role: relatedArticle.author.role,
                    email: relatedArticle.author.bio || '', // Use bio as email or empty string
                  },
                  publishDate: relatedArticle.publishDate,
                  readTime: relatedArticle.readTime,
                  tags: relatedArticle.tags,
                }} variant="compact" />
              ))}
            </div>

            {/* Bottom Horizontal Ad */}
            <div className="mt-16">
              <AdManager type="horizontal" />
            </div>
          </div>
        </main>

        {/* Table of Contents Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className={`sticky top-24 ${tocVisible ? 'block' : 'hidden lg:block'}`} ref={tocRef}>
            <div className="bg-card rounded-lg border border-border shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Table of Contents</h3>
                <Button variant="ghost" size="sm" onClick={toggleTocCollapse} className="h-8 w-8 p-0">
                  <List className="h-4 w-4" />
                </Button>
              </div>
              {!tocCollapsed && (
                <nav className="space-y-1">
                  {articleSectionsForToc.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block py-1 px-2 text-sm rounded-md transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* Ad Placement */}
            <div className="bg-card rounded-lg border border-border shadow-sm p-4 mb-6">
              <h3 className="font-medium text-foreground mb-3">Sponsored</h3>
              <div className="bg-muted/30 rounded-md overflow-hidden">
                <AdManager type="sidebar" />
              </div>
            </div>

            {/* Tags */}
            <div className="bg-card rounded-lg border border-border shadow-sm p-4">
              <h3 className="font-medium text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block px-3 py-1 bg-muted/50 text-foreground/80 text-xs rounded-full hover:bg-muted hover:text-foreground"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleTemplate;
