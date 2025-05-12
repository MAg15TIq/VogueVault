'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: 'fashion' | 'beauty' | 'lifestyle' | 'culture';
    image: string;
    author: {
      name: string;
      image: string;
      role: string;
      email: string;
    };
    publishDate: string;
    readTime: number;
    tags: string[];
  };
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const ArticleCard = ({ article, variant = 'default', className }: ArticleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`}>
        <Card
          className={cn(
            "overflow-hidden h-full hover:shadow-md transition-all duration-300 border-0 bg-transparent",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="relative h-24 rounded-md overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className={`object-cover transition-transform duration-500 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
                unoptimized
              />
            </div>
            <div className="col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="text-base font-semibold line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {formatDate(article.publishDate)} · {article.readTime} min read
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <Card
        className={cn(
          `overflow-hidden h-full hover:shadow-md transition-all duration-300 ${
            variant === 'featured' ? 'border-0 bg-transparent' : ''
          }`,
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            unoptimized
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full uppercase tracking-wider">
              {article.category}
            </span>
          </div>
        </div>
        <CardContent className="pt-6">
          <h3 className={`font-semibold line-clamp-2 group-hover:text-primary transition-colors ${
            variant === 'featured' ? 'text-xl' : 'text-lg'
          }`}>
            {article.title}
          </h3>
          {variant === 'featured' && (
            <p className="text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={article.author.image} alt={article.author.name} />
              <AvatarFallback>{getInitials(article.author.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{article.author.name}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(article.publishDate)} · {article.readTime} min read
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
