import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';

import ArticleClientPage from './client-page';

// This is a dynamic route, so we need to generate metadata for each article
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const article = articles.find(article => article.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found - VogueVault',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: `${article.title} - VogueVault`,
    description: article.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...',
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const article = articles.find(article => article.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleClientPage slug={slug} />;
}
