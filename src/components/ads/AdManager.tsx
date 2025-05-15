'use client';

import { ReactNode } from 'react';
import AdErrorBoundary from './AdErrorBoundary';
import ArticleAd from './ArticleAd';
import HorizontalAd from './HorizontalAd';
import VerticalAd from './VerticalAd';
import SidebarAd from './SidebarAd';
import InArticleAd from './InArticleAd';
import NewAutoRelaxedAd from './NewAutoRelaxedAd';
import NewDisplayAd from './NewDisplayAd';
import ClientOnlyAd from './ClientOnlyAd';

type AdType = 'article' | 'horizontal' | 'vertical' | 'sidebar' | 'in-article' | 'autorelaxed' | 'display';

interface AdManagerProps {
  type: AdType;
  className?: string;
  children?: ReactNode;
}

/**
 * AdManager component
 * Central component for managing different ad types
 * Provides a consistent interface for all ad components
 */
const AdManager = ({ type, className = '', children }: AdManagerProps) => {
  const renderAd = () => {
    switch (type) {
      case 'article':
        return <ArticleAd />;
      case 'horizontal':
        return <HorizontalAd />;
      case 'vertical':
        return <VerticalAd />;
      case 'sidebar':
        return <SidebarAd />;
      case 'in-article':
        return <InArticleAd />;
      case 'autorelaxed':
        return <NewAutoRelaxedAd />;
      case 'display':
        return <NewDisplayAd />;
      default:
        return <ArticleAd />;
    }
  };

  // Add a special class for autorelaxed ads to ensure they're visible
  const containerClass = type === 'autorelaxed'
    ? `ad-manager autorelaxed-container ${className}`
    : `ad-manager ${className}`;

  return (
    <AdErrorBoundary>
      <div className={containerClass}>
        <ClientOnlyAd>
          {renderAd()}
        </ClientOnlyAd>
        {children}
      </div>
    </AdErrorBoundary>
  );
};

export default AdManager;
