'use client';

import Link from 'next/link';
import Image from 'next/image';

interface AuthorCardProps {
  authorName: string;
  variant?: 'compact' | 'full';
  className?: string;
}

const AuthorCard = ({
  authorName,
  variant = 'compact',
  className = ''
}: AuthorCardProps) => {
  // For now, we only have one author - Malik Mohsin Saleem Khan
  const authorImagePath = '/images/team/malik-mohsin.jpg';
  const authorRole = 'Founder & Author';
  const authorBio = 'Malik Mohsin Saleem Khan is the creative force behind VogueVault, bringing his passion for fashion, lifestyle, beauty, and culture to every article on the site.';

  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
          <Image
            src={authorImagePath}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <Link href="/about" className="font-medium hover:text-primary transition-colors">
            {authorName}
          </Link>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{authorRole}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
          <Image
            src={authorImagePath}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <Link href="/about" className="text-xl font-bold hover:text-primary transition-colors">
            {authorName}
          </Link>
          <p className="text-sm text-primary mb-2">{authorRole}</p>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">{authorBio}</p>
          <Link
            href="/about"
            className="inline-block mt-3 text-primary hover:text-primary-dark font-medium text-sm"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
