'use client';

import Link from 'next/link';
import { AdManager, DisplayAd } from '@/components/ads';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  LayoutGrid, 
  LineChart,
  Smartphone,
  Clock,
  Eye
} from 'lucide-react';

export default function AdBestPracticesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">AdSense Best Practices</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Learn how to effectively implement and optimize Google AdSense ads on your website.
        </p>
        <Link href="/examples/ads" className="text-primary hover:underline">
          ← Back to Ad Examples
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Implementation Approaches</h2>
            <p className="mb-6">
              There are two main approaches to implementing AdSense ads in your React/Next.js application:
            </p>
            
            <Tabs defaultValue="admanager">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admanager">AdManager Component</TabsTrigger>
                <TabsTrigger value="direct">Direct Component</TabsTrigger>
              </TabsList>
              
              <TabsContent value="admanager" className="p-4 border rounded-md mt-2">
                <h3 className="text-lg font-medium mb-2">Using AdManager</h3>
                <p className="mb-4">
                  The AdManager component provides a centralized way to manage different ad types throughout your application.
                  It handles error boundaries, client-side rendering, and consistent styling automatically.
                </p>
                
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="text-md font-medium mb-2">Implementation:</h4>
                  <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`import { AdManager } from '@/components/ads';

// In your JSX:
<AdManager type="display" />`}
                  </pre>
                </div>
                
                <div className="border border-dashed border-primary/30 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Live Example:</p>
                  <AdManager type="display" />
                </div>
                
                <div className="mt-4 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">Recommended for:</span> Standard ad placements, consistent styling, and centralized management
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="direct" className="p-4 border rounded-md mt-2">
                <h3 className="text-lg font-medium mb-2">Using DisplayAd Component Directly</h3>
                <p className="mb-4">
                  Using the DisplayAd component directly gives you more control over the specific implementation
                  and allows for custom styling and positioning.
                </p>
                
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="text-md font-medium mb-2">Implementation:</h4>
                  <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`import { DisplayAd } from '@/components/ads';

// In your JSX:
<DisplayAd />`}
                  </pre>
                </div>
                
                <div className="border border-dashed border-primary/30 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Live Example:</p>
                  <DisplayAd />
                </div>
                
                <div className="mt-4 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">Recommended for:</span> Custom styling, special placements, and more granular control
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Ad Placement Strategies</h2>
            <p className="mb-6">
              Strategic ad placement can significantly impact both user experience and ad performance.
              Here are some effective placement strategies:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Above the Fold</h3>
                </div>
                <p className="text-sm mb-3">
                  Place high-performing ads in the visible area when the page first loads.
                </p>
                <div className="border border-dashed border-primary/30 p-2 rounded-md">
                  <div className="h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded flex items-center justify-center text-xs text-muted-foreground">
                    Header/Top Banner Ad
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">In-Content</h3>
                </div>
                <p className="text-sm mb-3">
                  Place ads within content for higher engagement and visibility.
                </p>
                <div className="border border-dashed border-primary/30 p-2 rounded-md">
                  <div className="h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded flex items-center justify-center text-xs text-muted-foreground">
                    In-Article Ad
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Sidebar</h3>
                </div>
                <p className="text-sm mb-3">
                  Place ads in the sidebar for persistent visibility as users scroll.
                </p>
                <div className="border border-dashed border-primary/30 p-2 rounded-md">
                  <div className="h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded flex items-center justify-center text-xs text-muted-foreground">
                    Sidebar Ad
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">End of Content</h3>
                </div>
                <p className="text-sm mb-3">
                  Place ads at the end of content when users are deciding what to do next.
                </p>
                <div className="border border-dashed border-primary/30 p-2 rounded-md">
                  <div className="h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded flex items-center justify-center text-xs text-muted-foreground">
                    Bottom Banner Ad
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Important Consideration</h4>
                  <p className="text-sm">
                    Balance ad revenue with user experience. Too many ads can drive users away, while too few may limit revenue potential.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Performance Optimization</h2>
            <p className="mb-6">
              Optimize your ads for better performance and user experience with these techniques:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                <Zap className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Lazy Loading</h3>
                  <p className="text-sm">
                    Load ads only when they're about to enter the viewport to improve page load performance.
                    Our <code className="text-xs bg-background px-1 py-0.5 rounded">AdSenseAdUnit</code> component supports this with the <code className="text-xs bg-background px-1 py-0.5 rounded">loadOnlyWhenVisible</code> prop.
                  </p>
                  <pre className="bg-card p-2 rounded text-xs overflow-x-auto mt-2">
{`<AdSenseAdUnit
  adSlot="3084720492"
  loadOnlyWhenVisible={true}
/>`}
                  </pre>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                <Smartphone className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Responsive Ads</h3>
                  <p className="text-sm">
                    Use responsive ad units that adapt to different screen sizes and device types.
                    Set <code className="text-xs bg-background px-1 py-0.5 rounded">data-full-width-responsive="true"</code> for better mobile experience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Delayed Loading</h3>
                  <p className="text-sm">
                    Consider delaying ad loading slightly to prioritize core content rendering.
                    Our components use a small timeout before initializing ads.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                <Eye className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">A/B Testing</h3>
                  <p className="text-sm">
                    Test different ad placements, sizes, and types to find what works best for your audience.
                    Track performance metrics to make data-driven decisions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-start gap-2">
                <LineChart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Monitor Performance</h4>
                  <p className="text-sm">
                    Regularly check your AdSense dashboard to monitor performance metrics like CTR, RPM, and revenue.
                    Use this data to optimize your ad strategy over time.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Do's and Don'ts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Do's</span>
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Follow Google's AdSense program policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Use responsive ad units for better adaptability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Implement lazy loading for better performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Test different ad placements and formats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Balance ad density with user experience</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Don'ts</span>
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Place ads that mimic site content or functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Implement too many ads above the fold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Click on your own ads or encourage others to do so</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Place ads on pages with little to no content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Use language that encourages users to click on ads</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-md border border-red-200 dark:border-red-900/30">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-400">Policy Compliance</h4>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Violating Google's AdSense policies can result in account suspension or termination.
                    Always review the <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer" className="underline">official AdSense program policies</a> before implementing ads.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Custom Ad Implementation Example</h2>
            <p className="mb-6">
              Here's an example of a custom-styled ad implementation that blends well with your content:
            </p>
            
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 text-center">Featured Content</h3>
              <div className="bg-background rounded-md p-4">
                <DisplayAd />
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Sponsored content
              </p>
            </div>
            
            <div className="mt-6 bg-muted p-4 rounded-md">
              <h4 className="text-md font-medium mb-2">Implementation:</h4>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`<div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg shadow-sm">
  <h3 className="text-xl font-medium mb-3 text-center">Featured Content</h3>
  <div className="bg-background rounded-md p-4">
    <DisplayAd />
  </div>
  <p className="text-xs text-center mt-2 text-muted-foreground">
    Sponsored content
  </p>
</div>`}
              </pre>
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <section className="bg-card rounded-lg border border-border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Quick Reference</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-primary mb-2">Ad Components:</h3>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-muted px-1 py-0.5 rounded">DisplayAd</code> - Standard display ad</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">InArticleAd</code> - In-article format</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">AutoRelaxedAd</code> - Multiple ads format</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">HorizontalAd</code> - Horizontal banner</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">VerticalAd</code> - Vertical banner</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">SidebarAd</code> - Sidebar placement</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-primary mb-2">AdManager Types:</h3>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-muted px-1 py-0.5 rounded">display</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">in-article</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">autorelaxed</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">horizontal</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">vertical</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">sidebar</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">article</code></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-primary mb-2">Example Ad:</h3>
              <div className="bg-muted/30 rounded-md overflow-hidden">
                <AdManager type="sidebar" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
