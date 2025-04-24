import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { articlesData } from '@/data/articlesData';

import ArticleClientPage from './client-page';

// This is a dynamic route, so we need to generate metadata for each article
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const article = articles.find(article => article.slug === slug);
  const articleData = articlesData.find(article => article.slug === slug);

  if (!article && !articleData) {
    return {
      title: 'Article Not Found - VogueVault',
      description: 'The requested article could not be found.'
    };
  }

  if (article) {
    return {
      title: `${article.title} - VogueVault`,
      description: article.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...',
    };
  } else if (articleData) {
    return {
      title: `${articleData.title} - VogueVault`,
      description: articleData.excerpt || 'Read this article on VogueVault',
    };
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const article = articles.find(article => article.slug === slug);
  const articleData = articlesData.find(article => article.slug === slug);

  // If the article doesn't exist in the articles array but exists in articlesData,
  // we need to create a temporary article with default content
  if (!article && articleData) {
    // Add the article to the articles array with default content
    articles.push({
      id: articleData.id,
      title: articleData.title,
      content: `<p>${articleData.excerpt || 'Article content coming soon.'}</p>`,
      category: articleData.category,
      author: articleData.author,
      publishDate: articleData.publishDate,
      image: articleData.image,
      slug: articleData.slug
    });
  } else if (!article && !articleData) {
    notFound();
  }

  return <ArticleClientPage slug={slug} />;
}
