'use client';

import { AdManager, DisplayAd } from '@/components/ads';
import Link from 'next/link';

export default function DualApproachPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Dual Implementation Approach</h1>
        <p className="text-lg text-muted-foreground mb-4">
          This page demonstrates how to use both the AdManager component and direct DisplayAd component approaches together.
        </p>
        <Link href="/examples/ads" className="text-primary hover:underline">
          ← Back to Ad Examples
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Using AdManager Component</h2>
            <p className="mb-6">
              The AdManager component provides a centralized way to manage different ad types throughout your application.
              It handles error boundaries, client-side rendering, and consistent styling automatically.
            </p>
            
            {/* Example using AdManager */}
            <div className="bg-muted p-4 rounded-md mb-4">
              <h3 className="text-lg font-medium mb-2">Example Implementation:</h3>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`import { AdManager } from '@/components/ads';

// In your JSX:
<AdManager type="display" />`}
              </pre>
            </div>
            
            {/* Actual AdManager implementation */}
            <div className="border border-dashed border-primary/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-2">AdManager Implementation:</p>
              <AdManager type="display" />
            </div>
          </section>

          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Using DisplayAd Component Directly</h2>
            <p className="mb-6">
              Using the DisplayAd component directly gives you more control over the specific implementation
              and allows for custom styling and positioning.
            </p>
            
            {/* Example using direct component */}
            <div className="bg-muted p-4 rounded-md mb-4">
              <h3 className="text-lg font-medium mb-2">Example Implementation:</h3>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`import { DisplayAd } from '@/components/ads';

// In your JSX:
<DisplayAd />`}
              </pre>
            </div>
            
            {/* Actual direct implementation */}
            <div className="border border-dashed border-primary/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Direct Component Implementation:</p>
              <DisplayAd />
            </div>
          </section>

          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling Example</h2>
            <p className="mb-6">
              When using the DisplayAd component directly, you can easily apply custom styling and wrappers.
              This example shows a specially styled ad container.
            </p>
            
            {/* Custom styled direct implementation */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 text-center">Featured Promotion</h3>
              <div className="bg-background rounded-md p-4">
                <DisplayAd />
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Custom styled advertisement container
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section className="bg-card rounded-lg border border-border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">When to Use Each Approach</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-primary mb-2">Use AdManager When:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>You want consistent ad presentation</li>
                <li>You're implementing standard ad placements</li>
                <li>You want centralized error handling</li>
                <li>You need to easily switch between ad types</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-primary mb-2">Use Direct Component When:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>You need custom styling or positioning</li>
                <li>You're implementing a special ad placement</li>
                <li>You want more explicit control</li>
                <li>You're testing a new ad implementation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-primary mb-2">Sidebar Ad Example:</h3>
              <div className="bg-muted/30 rounded-md overflow-hidden">
                <AdManager type="sidebar" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom section */}
      <section className="mt-12 bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-semibold mb-4">Combined Approach in Real-World Scenarios</h2>
        <p className="mb-6">
          In real-world applications, you'll often use both approaches together. Standard ad placements
          use AdManager for consistency, while special promotional areas might use direct components
          for more customization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Article Template Example:</h3>
            <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`// Standard placement in article
<div className="my-12">
  <AdManager type="in-article" />
</div>

// Special promotional section
<div className="promo-section">
  <h3>Special Offer</h3>
  <DisplayAd />
</div>`}
            </pre>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Benefits of Combined Approach:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consistency for standard placements</li>
              <li>Flexibility for special cases</li>
              <li>Better organization of ad logic</li>
              <li>Easier testing and optimization</li>
              <li>Improved maintainability</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom ad */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Bottom Ad Example:</h3>
          <AdManager type="horizontal" />
        </div>
      </section>
    </div>
  );
}
