'use client';

import { AdManager, DisplayAd } from '@/components/ads';

/**
 * HomePageAds component
 * Demonstrates both ad implementation approaches on the home page
 */
const HomePageAds = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
            Featured Promotions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover products and services that complement your style and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side: Using AdManager approach */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h3 className="font-medium text-foreground mb-3 text-center">
              Sponsored Content
            </h3>
            <div className="bg-muted/30 rounded-md overflow-hidden">
              <AdManager type="display" />
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Advertisement via AdManager component
            </p>
          </div>

          {/* Right side: Using direct component approach */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border shadow-sm p-6">
            <h3 className="font-medium text-foreground mb-3 text-center">
              Special Promotion
            </h3>
            <div className="bg-background rounded-md p-4">
              <DisplayAd />
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Advertisement via direct DisplayAd component
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageAds;
