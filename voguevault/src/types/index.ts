// Type definitions for VogueVault

/**
 * Article type definition
 */
export interface Article {
  id: number | string;
  title: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  image: string;
  slug: string;
  excerpt?: string;
}

/**
 * Comment type definition
 */
export interface Comment {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

/**
 * Breadcrumb item type definition
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}
