import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articlesData, Article } from '@/data/articlesData';
import ArticleTemplate, { NewArticle } from '@/components/articles/ArticleTemplate';
import { generateArticleMetadata } from '@/lib/articleUtils';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = articlesData.find((article) => article.slug === params.slug);

  if (!article) {
    return {
      title: 'Article Not Found - VogueVaults',
      description: 'The requested article could not be found.',
    };
  }

  return generateArticleMetadata(article.title, article.excerpt, article.tags);
}

// Convert Article to NewArticle format
function convertToNewArticleFormat(article: Article): NewArticle {
  // Extract introduction from content
  let introText = '';
  if (article.structuredContent) {
    const introMatch = article.content.match(/<section id="introduction">([\s\S]*?)<\/section>/);
    introText = introMatch ? introMatch[1] : article.content.substring(0, 500);
  } else {
    introText = article.content.substring(0, 500); // Fallback to first 500 chars for non-structured content
  }

  // Create sections from content
  const contentSections = article.structuredContent
    ? extractStructuredContent(article.content)
    : createDefaultSections(article.content);

  // Create the article object
  const newArticle: NewArticle = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    metaDescription: article.excerpt,
    primaryKeyword: article.tags[0] || '',
    category: article.category,
    author: {
      name: article.author.name,
      image: article.author.image,
      role: article.author.role,
      bio: 'Author bio information' // Default bio since original format doesn't have it
    },
    publishDate: article.publishDate,
    readTime: article.readTime,
    featuredImage: {
      src: article.image,
      alt: article.title
    },
    introduction: {
      id: 'introduction',
      text: introText
    },
    backgroundContext: contentSections.backgroundContext,
    mainPoint1: contentSections.mainPoint1,
    mainPoint2: contentSections.mainPoint2,
    mainPoint3: contentSections.mainPoint3,
    practicalApplication: contentSections.practicalApplication,
    futureTrends: contentSections.futureTrends,
    conclusion: {
      id: 'conclusion',
      text: contentSections.conclusion
    },
    tags: article.tags
  };

  // Add FAQ section if it exists
  if (contentSections.faqItems && contentSections.faqItems.length > 0) {
    newArticle.faq = {
      id: 'faq',
      items: contentSections.faqItems
    };
  }

  return newArticle;
}

// Helper function to extract structured content or create default sections
function extractStructuredContent(content: string) {
  // For structured content, we need to properly parse the HTML to extract sections
  // First, let's identify the sections by looking for section tags with IDs
  const introMatch = content.match(/<section id="introduction">([\s\S]*?)<\/section>/);
  const backgroundMatch = content.match(/<section id="section-1">([\s\S]*?)<\/section>/);
  const mainPoint1Match = content.match(/<section id="section-2">([\s\S]*?)<\/section>/);
  const mainPoint2Match = content.match(/<section id="section-3">([\s\S]*?)<\/section>/);
  const mainPoint3Match = content.match(/<section id="section-4">([\s\S]*?)<\/section>/);
  const practicalMatch = content.match(/<section id="section-5">([\s\S]*?)<\/section>/);
  const conclusionMatch = content.match(/<section id="conclusion">([\s\S]*?)<\/section>/);

  // Extract titles from the sections
  const getTitle = (sectionContent: string | null) => {
    if (!sectionContent) return '';
    const titleMatch = sectionContent.match(/<h2>(.*?)<\/h2>/);
    return titleMatch ? titleMatch[1] : '';
  };

  // Extract content without the title
  const getContent = (sectionContent: string | null) => {
    if (!sectionContent) return '<p>Content not available</p>';
    // Remove the h2 tag but keep the rest of the content
    return sectionContent.replace(/<h2>.*?<\/h2>/, '').trim();
  };

  // Check for future trends section (optional)
  const futureTrendsMatch = content.match(/<section id="section-6">([\s\S]*?)<\/section>/);

  // Extract FAQs section if it exists
  const faqMatch = content.match(/<section id="faq">([\s\S]*?)<\/section>/);

  // Process FAQ items if they exist
  let faqItems = [];
  if (faqMatch) {
    const faqContent = faqMatch[1];
    const questionMatches = faqContent.matchAll(/<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g);

    if (questionMatches) {
      for (const match of questionMatches) {
        if (match.length >= 3) {
          faqItems.push({
            question: match[1].trim(),
            answer: match[2].trim()
          });
        }
      }
    }
  }

  return {
    backgroundContext: backgroundMatch ? {
      id: 'background',
      title: getTitle(backgroundMatch[1]) || 'Background',
      content: getContent(backgroundMatch[1])
    } : undefined,
    mainPoint1: {
      id: 'main-point-1',
      title: getTitle(mainPoint1Match ? mainPoint1Match[1] : null) || 'Main Point 1',
      content: getContent(mainPoint1Match ? mainPoint1Match[1] : null)
    },
    mainPoint2: {
      id: 'main-point-2',
      title: getTitle(mainPoint2Match ? mainPoint2Match[1] : null) || 'Main Point 2',
      content: getContent(mainPoint2Match ? mainPoint2Match[1] : null)
    },
    mainPoint3: {
      id: 'main-point-3',
      title: getTitle(mainPoint3Match ? mainPoint3Match[1] : null) || 'Main Point 3',
      content: getContent(mainPoint3Match ? mainPoint3Match[1] : null)
    },
    practicalApplication: {
      id: 'practical-application',
      title: getTitle(practicalMatch ? practicalMatch[1] : null) || 'Practical Application',
      content: getContent(practicalMatch ? practicalMatch[1] : null)
    },
    futureTrends: futureTrendsMatch ? {
      id: 'future-trends',
      title: getTitle(futureTrendsMatch[1]) || 'Future Trends',
      content: getContent(futureTrendsMatch[1])
    } : undefined,
    conclusion: conclusionMatch ? getContent(conclusionMatch[1]) : '<p>Conclusion content</p>',
    faqItems: faqItems.length > 0 ? faqItems : undefined
  };
}

// Create default sections for non-structured content
function createDefaultSections(content: string) {
  // Split content into roughly equal parts for each section
  const contentLength = content.length;
  const sectionSize = Math.floor(contentLength / 7); // Divide into 7 parts to include background and future trends

  return {
    backgroundContext: {
      id: 'background',
      title: 'Background',
      content: content.substring(0, sectionSize)
    },
    mainPoint1: {
      id: 'main-point-1',
      title: 'Main Point 1',
      content: content.substring(sectionSize, sectionSize * 2)
    },
    mainPoint2: {
      id: 'main-point-2',
      title: 'Main Point 2',
      content: content.substring(sectionSize * 2, sectionSize * 3)
    },
    mainPoint3: {
      id: 'main-point-3',
      title: 'Main Point 3',
      content: content.substring(sectionSize * 3, sectionSize * 4)
    },
    practicalApplication: {
      id: 'practical-application',
      title: 'Practical Application',
      content: content.substring(sectionSize * 4, sectionSize * 5)
    },
    futureTrends: {
      id: 'future-trends',
      title: 'Future Trends',
      content: content.substring(sectionSize * 5, sectionSize * 6)
    },
    conclusion: content.substring(sectionSize * 6),
    faqItems: [] // Empty array for non-structured content
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesData.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Convert to new article format
  const newFormatArticle = convertToNewArticleFormat(article);

  // Get related articles (same category, excluding current article)
  const relatedArticles = articlesData
    .filter(
      (a) => a.category === article.category && a.id !== article.id
    )
    .slice(0, 3)
    .map(convertToNewArticleFormat); // Convert related articles too

  return <ArticleTemplate article={newFormatArticle} relatedArticles={relatedArticles} />;
}
