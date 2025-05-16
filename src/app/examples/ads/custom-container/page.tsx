'use client';

import Link from 'next/link';
import { CustomAdContainer, DisplayAd } from '@/components/ads';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CustomAdContainerPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Custom Ad Container Examples</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Learn how to use the CustomAdContainer component to create beautifully styled ad placements.
        </p>
        <Link href="/examples/ads" className="text-primary hover:underline">
          ← Back to Ad Examples
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">About CustomAdContainer</h2>
            <p className="mb-6">
              The <code className="bg-muted px-1 py-0.5 rounded">CustomAdContainer</code> component provides a reusable, 
              styled container for your ads with various design options. It helps maintain consistent styling 
              across your site while making it easy to customize the appearance of ad placements.
            </p>
            
            <div className="bg-muted p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium mb-2">Basic Usage:</h3>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`import { CustomAdContainer } from '@/components/ads';

// In your JSX:
<CustomAdContainer 
  title="Sponsored" 
  adType="display" 
/>`}
              </pre>
            </div>
            
            <Tabs defaultValue="default">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="default">Default</TabsTrigger>
                <TabsTrigger value="gradient">Gradient</TabsTrigger>
                <TabsTrigger value="outlined">Outlined</TabsTrigger>
                <TabsTrigger value="minimal">Minimal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="default" className="p-4 border rounded-md mt-2">
                <h3 className="text-lg font-medium mb-2">Default Variant</h3>
                <p className="mb-4">
                  The default variant uses a card background with a subtle border and shadow.
                </p>
                
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Sponsored Content" 
                    adType="display"
                  />
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Sponsored Content" 
  adType="display"
/>`}
                </pre>
              </TabsContent>
              
              <TabsContent value="gradient" className="p-4 border rounded-md mt-2">
                <h3 className="text-lg font-medium mb-2">Gradient Variant</h3>
                <p className="mb-4">
                  The gradient variant uses a subtle gradient background for a more eye-catching appearance.
                </p>
                
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Featured Promotion" 
                    adType="display"
                    variant="gradient"
                  />
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Featured Promotion" 
  adType="display"
  variant="gradient"
/>`}
                </pre>
              </TabsContent>
              
              <TabsContent value="outlined" className="p-4 border rounded-md mt-2">
                <h3 className="text-lg font-medium mb-2">Outlined Variant</h3>
                <p className="mb-4">
                  The outlined variant uses a more prominent border with the primary color.
                </p>
                
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Special Offer" 
                    adType="display"
                    variant="outlined"
                  />
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Special Offer" 
  adType="display"
  variant="outlined"
/>`}
                </pre>
              </TabsContent>
              
              <TabsContent value="minimal" className="p-4 border rounded-md mt-2">
                <h3 className="text-lg font-medium mb-2">Minimal Variant</h3>
                <p className="mb-4">
                  The minimal variant has no background or border, for a cleaner integration with your content.
                </p>
                
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Recommended" 
                    adType="display"
                    variant="minimal"
                  />
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Recommended" 
  adType="display"
  variant="minimal"
/>`}
                </pre>
              </TabsContent>
            </Tabs>
          </section>

          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Advanced Usage</h2>
            <p className="mb-6">
              The CustomAdContainer component supports additional customization options:
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">With Subtitle</h3>
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Featured Content" 
                    subtitle="Recommended based on your interests"
                    adType="display"
                    variant="gradient"
                  />
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Featured Content" 
  subtitle="Recommended based on your interests"
  adType="display"
  variant="gradient"
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">With Custom Styling</h3>
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Premium Offer" 
                    adType="display"
                    variant="outlined"
                    containerClassName="border-amber-300/50 bg-amber-50/10"
                    titleClassName="text-amber-700 font-bold"
                  />
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Premium Offer" 
  adType="display"
  variant="outlined"
  containerClassName="border-amber-300/50 bg-amber-50/10"
  titleClassName="text-amber-700 font-bold"
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">With Custom Ad Component</h3>
                <div className="mb-4">
                  <CustomAdContainer 
                    title="Special Promotion"
                    variant="gradient"
                  >
                    <DisplayAd />
                  </CustomAdContainer>
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<CustomAdContainer 
  title="Special Promotion"
  variant="gradient"
>
  <DisplayAd />
</CustomAdContainer>`}
                </pre>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Integration Examples</h2>
            <p className="mb-6">
              Here are some examples of how to integrate the CustomAdContainer in different parts of your site:
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">In Article Content</h3>
                <div className="prose max-w-none mb-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                  </p>
                  
                  <CustomAdContainer 
                    adType="in-article"
                    variant="minimal"
                  />
                  
                  <p>
                    Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor.
                  </p>
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>

<CustomAdContainer 
  adType="in-article"
  variant="minimal"
/>

<p>
  Donec et mollis dolor. Praesent et diam eget libero...
</p>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">In Sidebar</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-2 bg-muted p-4 rounded-md">
                    <p className="text-sm">Main Content Area</p>
                  </div>
                  <div className="col-span-1">
                    <CustomAdContainer 
                      title="Sponsored"
                      adType="sidebar"
                      variant="default"
                      className="my-0"
                    />
                  </div>
                </div>
                
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<div className="sidebar">
  <CustomAdContainer 
    title="Sponsored"
    adType="sidebar"
    variant="default"
  />
</div>`}
                </pre>
              </div>
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <section className="bg-card rounded-lg border border-border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Component API</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary mb-2">Props:</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="bg-muted px-1 py-0.5 rounded">title</code> - Optional title text</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">subtitle</code> - Optional subtitle text</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">adType</code> - Type of ad to display</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">variant</code> - Visual style variant</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">className</code> - Additional outer container classes</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">containerClassName</code> - Additional inner container classes</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">titleClassName</code> - Additional title classes</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">subtitleClassName</code> - Additional subtitle classes</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">children</code> - Optional custom ad component</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">Variants:</h3>
                <ul className="space-y-1 text-sm">
                  <li><code className="bg-muted px-1 py-0.5 rounded">default</code> - Card with border</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">gradient</code> - Subtle gradient background</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">outlined</code> - Prominent border</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">minimal</code> - No background or border</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">Ad Types:</h3>
                <ul className="space-y-1 text-sm">
                  <li><code className="bg-muted px-1 py-0.5 rounded">display</code> - Standard display ad</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">in-article</code> - In-article format</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">autorelaxed</code> - Multiple ads format</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">horizontal</code> - Horizontal banner</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">vertical</code> - Vertical banner</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">sidebar</code> - Sidebar placement</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-primary mb-2">Example:</h3>
              <CustomAdContainer 
                title="Sidebar Ad"
                subtitle="Sponsored content"
                adType="sidebar"
                variant="gradient"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
