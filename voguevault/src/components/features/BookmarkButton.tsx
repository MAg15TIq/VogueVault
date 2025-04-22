'use client';

import { useState, useEffect } from 'react';
import { isBookmarked, toggleBookmark } from '@/utils/bookmarks';

interface BookmarkButtonProps {
  articleId: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal';
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const BookmarkButton = ({
  articleId,
  className = '',
  showText = true,
  size = 'md',
  variant = 'default',
  onBookmarkChange,
}: BookmarkButtonProps) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check initial bookmark status
  useEffect(() => {
    setIsBookmarkedState(isBookmarked(articleId));
  }, [articleId]);

  const handleToggleBookmark = () => {
    // Start animation
    setIsAnimating(true);
    
    // Toggle bookmark status
    const newStatus = toggleBookmark(articleId);
    setIsBookmarkedState(newStatus);
    
    // Notify parent component if callback provided
    if (onBookmarkChange) {
      onBookmarkChange(newStatus);
    }
    
    // End animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Determine icon size based on the size prop
  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  // Determine button styles based on variant
  let buttonStyles = '';
  
  switch (variant) {
    case 'outline':
      buttonStyles = `border border-neutral-200 dark:border-neutral-700 
                     ${isBookmarkedState 
                       ? 'bg-primary bg-opacity-10 text-primary border-primary' 
                       : 'hover:border-primary hover:text-primary'}`;
      break;
    case 'minimal':
      buttonStyles = '';
      break;
    default: // 'default'
      buttonStyles = `${isBookmarkedState 
                       ? 'bg-primary bg-opacity-10 text-primary' 
                       : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`;
  }

  // Combine all classes
  const buttonClasses = `
    flex items-center justify-center transition-all duration-200
    ${size === 'sm' ? 'text-sm py-1 px-2' : size === 'lg' ? 'py-3 px-4' : 'py-2 px-3'}
    ${buttonStyles}
    ${isAnimating ? 'scale-110' : ''}
    ${className}
  `;

  return (
    <button
      onClick={handleToggleBookmark}
      className={buttonClasses}
      aria-label={isBookmarkedState ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      {isBookmarkedState ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${iconSize} ${isAnimating ? 'animate-pulse' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )}
      
      {showText && (
        <span className="ml-2">{isBookmarkedState ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
};

export default BookmarkButton;
