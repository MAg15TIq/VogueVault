'use client';

import ArticleAd from './ArticleAd';
import HorizontalAd from './HorizontalAd';
import VerticalAd from './VerticalAd';
import SidebarAd from './SidebarAd';
import InArticleAd from './InArticleAd';
import AutoRelaxedAd from './AutoRelaxedAd';

type AdType = 'article' | 'horizontal' | 'vertical' | 'sidebar' | 'in-article' | 'autorelaxed';

interface AdManagerProps {
  type: AdType;
  className?: string;
}

const AdManager: React.FC<AdManagerProps> = ({ type, className = '' }) => {
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
        return <AutoRelaxedAd />;
      default:
        return <ArticleAd />;
    }
  };

  // Add a special class for autorelaxed ads to ensure they're visible
  const containerClass = type === 'autorelaxed'
    ? `ad-container autorelaxed-container ${className}`
    : `ad-container ${className}`;

  return (
    <div className={containerClass}>
      {renderAd()}
    </div>
  );
};

export default AdManager;
