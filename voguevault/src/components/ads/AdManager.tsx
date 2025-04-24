'use client';

import ArticleAd from './ArticleAd';
import HorizontalAd from './HorizontalAd';
import VerticalAd from './VerticalAd';
import SidebarAd from './SidebarAd';
import InArticleAd from './InArticleAd';

type AdType = 'article' | 'horizontal' | 'vertical' | 'sidebar' | 'in-article';

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
      default:
        return <ArticleAd />;
    }
  };

  return (
    <div className={`ad-container ${className}`}>
      {renderAd()}
    </div>
  );
};

export default AdManager;
