'use client';

import { useState, useEffect } from 'react';
import { isInReadingList, toggleReadingList } from '@/utils/readingList';

interface ReadingListButtonProps {
  articleId: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal';
  onStatusChange?: (isInReadingList: boolean) => void;
}

const ReadingListButton = ({
  articleId,
  className = '',
  showText = true,
  size = 'md',
  variant = 'default',
  onStatusChange,
}: ReadingListButtonProps) => {
  const [isInList, setIsInList] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check initial reading list status
  useEffect(() => {
    setIsInList(isInReadingList(articleId));
  }, [articleId]);

  const handleToggleReadingList = () => {
    // Start animation
    setIsAnimating(true);
    
    // Toggle reading list status
    const newStatus = toggleReadingList(articleId);
    setIsInList(newStatus);
    
    // Notify parent component if callback provided
    if (onStatusChange) {
      onStatusChange(newStatus);
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
                     ${isInList 
                       ? 'bg-primary bg-opacity-10 text-primary border-primary' 
                       : 'hover:border-primary hover:text-primary'}`;
      break;
    case 'minimal':
      buttonStyles = '';
      break;
    default: // 'default'
      buttonStyles = `${isInList 
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
      onClick={handleToggleReadingList}
      className={buttonClasses}
      aria-label={isInList ? 'Remove from reading list' : 'Add to reading list'}
    >
      {isInList ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${iconSize} ${isAnimating ? 'animate-pulse' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )}
      
      {showText && (
        <span className="ml-2">{isInList ? 'In Reading List' : 'Add to Reading List'}</span>
      )}
    </button>
  );
};

export default ReadingListButton;
