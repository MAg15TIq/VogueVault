import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/data/articleStore';

import ArticleClientPage from './client-page';

// This is a dynamic route, so we need to generate metadata for each article
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found - VogueVault',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: `${article.title} - VogueVault`,
    description: article.excerpt || article.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://voguevault.com'}${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author],
      section: article.category
    }
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleClientPage slug={slug} />;
}
