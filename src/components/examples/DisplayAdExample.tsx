'use client';

import { AdManager } from '@/components/ads';

/**
 * DisplayAdExample component
 * Example of how to use the new Display Ad unit
 */
const DisplayAdExample = () => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">Display Ad Example</h2>
      <div className="bg-card rounded-lg border border-border shadow-sm p-4">
        <h3 className="font-medium text-foreground mb-3">Sponsored</h3>
        <div className="bg-muted/30 rounded-md overflow-hidden">
          <AdManager type="display" />
        </div>
      </div>
    </div>
  );
};

export default DisplayAdExample;
