'use client';

import { ReactNode } from 'react';
import { AdManager } from '@/components/ads';
import { cn } from '@/lib/utils';

interface CustomAdContainerProps {
  title?: string;
  subtitle?: string;
  adType?: 'display' | 'in-article' | 'autorelaxed' | 'horizontal' | 'vertical' | 'sidebar' | 'article';
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: ReactNode;
  variant?: 'default' | 'gradient' | 'outlined' | 'minimal';
}

/**
 * CustomAdContainer component
 * A reusable, styled container for ads with various design options
 * 
 * @example
 * // Basic usage
 * <CustomAdContainer title="Sponsored" adType="display" />
 * 
 * @example
 * // With custom styling
 * <CustomAdContainer 
 *   title="Featured Content" 
 *   subtitle="Recommended for you"
 *   adType="display"
 *   variant="gradient"
 * />
 * 
 * @example
 * // With custom ad component
 * <CustomAdContainer title="Special Offer">
 *   <DisplayAd />
 * </CustomAdContainer>
 */
const CustomAdContainer = ({
  title,
  subtitle,
  adType = 'display',
  className = '',
  containerClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  children,
  variant = 'default'
}: CustomAdContainerProps) => {
  // Define variant-specific styles
  const variantStyles = {
    default: 'bg-card rounded-lg border border-border shadow-sm',
    gradient: 'bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg shadow-sm',
    outlined: 'bg-background rounded-lg border-2 border-primary/20 shadow-sm',
    minimal: 'bg-transparent'
  };

  return (
    <div className={cn('my-8', className)}>
      <div className={cn('p-4', variantStyles[variant], containerClassName)}>
        {title && (
          <h3 className={cn('font-medium text-foreground mb-3', titleClassName)}>
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className={cn('text-sm text-muted-foreground mb-3', subtitleClassName)}>
            {subtitle}
          </p>
        )}
        
        <div className={cn(
          'overflow-hidden',
          variant === 'default' ? 'bg-muted/30 rounded-md' : '',
          variant === 'gradient' ? 'bg-background rounded-md' : '',
          variant === 'outlined' ? 'bg-muted/20 rounded-md' : ''
        )}>
          {children || <AdManager type={adType} />}
        </div>
        
        {variant === 'gradient' && !subtitle && (
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Sponsored content
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomAdContainer;
