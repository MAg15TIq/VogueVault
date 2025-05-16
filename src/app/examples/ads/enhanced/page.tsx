'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EnhancedDisplayAd } from '@/components/ads';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  AlertCircle, 
  LineChart,
  Zap,
  Eye
} from 'lucide-react';

export default function EnhancedAdPage() {
  // State for configurable options
  const [adSlot, setAdSlot] = useState('3084720492');
  const [location, setLocation] = useState('enhanced-example');
  const [loadDelay, setLoadDelay] = useState(100);
  const [isResponsive, setIsResponsive] = useState(true);
  const [adFormat, setAdFormat] = useState('auto');
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Handle ad load
  const handleAdLoad = () => {
    setLoadStatus('loaded');
    addConsoleMessage('Ad loaded successfully');
  };

  // Handle ad error
  const handleAdError = (error: Error) => {
    setLoadStatus('error');
    addConsoleMessage(`Error: ${error.message}`);
  };

  // Add message to console output
  const addConsoleMessage = (message: string) => {
    setConsoleOutput(prev => [
      `[${new Date().toLocaleTimeString()}] ${message}`,
      ...prev.slice(0, 9) // Keep only the last 10 messages
    ]);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Enhanced Display Ad</h1>
        <p className="text-lg text-muted-foreground mb-4">
          An improved version of the DisplayAd component with additional features and tracking capabilities.
        </p>
        <Link href="/examples/ads" className="text-primary hover:underline">
          ← Back to Ad Examples
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">About EnhancedDisplayAd</h2>
            <p className="mb-6">
              The <code className="bg-muted px-1 py-0.5 rounded">EnhancedDisplayAd</code> component extends the basic DisplayAd 
              with additional features like impression tracking, configurable load delay, and viewport detection.
            </p>
            
            <div className="bg-muted p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium mb-2">Basic Usage:</h3>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`import { EnhancedDisplayAd } from '@/components/ads';

// In your JSX:
<EnhancedDisplayAd 
  location="homepage-banner"
  onLoad={() => console.log('Ad loaded')}
  onError={(error) => console.error('Ad error:', error)}
/>`}
              </pre>
            </div>
            
            <div className="flex items-start gap-2 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-md mb-6">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-300">Key Improvements</h4>
                <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-400">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Impression tracking with location context</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Viewport detection using Intersection Observer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LineChart className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Load and error callbacks for analytics integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Interactive Demo</h2>
            <p className="mb-6">
              Configure the EnhancedDisplayAd component below to see how it works with different settings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adSlot">Ad Slot</Label>
                  <Input
                    id="adSlot"
                    value={adSlot}
                    onChange={(e) => setAdSlot(e.target.value)}
                    placeholder="Enter ad slot ID"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location Identifier</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location identifier"
                  />
                </div>
                
                <div>
                  <Label htmlFor="adFormat">Ad Format</Label>
                  <select
                    id="adFormat"
                    value={adFormat}
                    onChange={(e) => setAdFormat(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="auto">auto</option>
                    <option value="horizontal">horizontal</option>
                    <option value="vertical">vertical</option>
                    <option value="rectangle">rectangle</option>
                    <option value="fluid">fluid</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loadDelay">Load Delay (ms): {loadDelay}</Label>
                  <Slider
                    id="loadDelay"
                    value={[loadDelay]}
                    min={0}
                    max={1000}
                    step={50}
                    onValueChange={(value) => setLoadDelay(value[0])}
                    className="my-4"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-4">
                  <Switch
                    id="responsive"
                    checked={isResponsive}
                    onCheckedChange={setIsResponsive}
                  />
                  <Label htmlFor="responsive">Responsive</Label>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      setLoadStatus('loading');
                      addConsoleMessage('Refreshing ad...');
                      // Force a re-render by changing a key value
                      setAdSlot(prev => {
                        // Toggle between two values to force re-render
                        return prev === '3084720492' ? '3084720493' : '3084720492';
                      });
                    }}
                    disabled={loadStatus === 'loading'}
                  >
                    Refresh Ad
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 border border-dashed border-primary/30 rounded-md">
              <h3 className="text-lg font-medium mb-4">Live Preview:</h3>
              <div className="bg-muted/30 rounded-md overflow-hidden">
                <EnhancedDisplayAd
                  key={`${adSlot}-${loadDelay}-${isResponsive}-${adFormat}`}
                  adSlot={adSlot}
                  adFormat={adFormat}
                  fullWidthResponsive={isResponsive}
                  location={location}
                  loadDelay={loadDelay}
                  onLoad={handleAdLoad}
                  onError={handleAdError}
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Status: <span className={
                  loadStatus === 'loaded' ? 'text-green-500' :
                  loadStatus === 'error' ? 'text-red-500' :
                  loadStatus === 'loading' ? 'text-amber-500' : 'text-muted-foreground'
                }>
                  {loadStatus === 'idle' ? 'Waiting' : 
                   loadStatus === 'loading' ? 'Loading...' : 
                   loadStatus === 'loaded' ? 'Loaded' : 'Error'}
                </span>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">Console Output</h2>
            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-64 overflow-y-auto">
              {consoleOutput.length > 0 ? (
                consoleOutput.map((message, index) => (
                  <div key={index} className="mb-1">{message}</div>
                ))
              ) : (
                <div className="text-gray-500">No messages yet...</div>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              This console shows events from the EnhancedDisplayAd component, including impression tracking and load events.
            </p>
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
                  <li><code className="bg-muted px-1 py-0.5 rounded">adSlot</code> - Ad slot ID (default: "3084720492")</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">adFormat</code> - Format of the ad (default: "auto")</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">fullWidthResponsive</code> - Whether the ad is responsive (default: true)</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">style</code> - Custom CSS styles</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">className</code> - Additional CSS classes</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">location</code> - Location identifier for tracking (default: "unknown")</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">loadDelay</code> - Delay before loading the ad in ms (default: 100)</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">onLoad</code> - Callback when ad loads successfully</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">onError</code> - Callback when ad fails to load</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium text-primary mb-2">Example Code:</h3>
                <pre className="bg-card p-3 rounded text-xs overflow-x-auto">
{`<EnhancedDisplayAd
  adSlot="3084720492"
  adFormat="auto"
  fullWidthResponsive={true}
  location="article-bottom"
  loadDelay={100}
  onLoad={() => {
    console.log('Ad loaded');
    // Track in analytics
  }}
  onError={(error) => {
    console.error('Ad error:', error);
    // Log error or show fallback
  }}
/>`}
                </pre>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-start gap-2">
                  <LineChart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Tracking Integration</h4>
                    <p className="text-sm">
                      The EnhancedDisplayAd component automatically tracks impressions using the trackAdImpression utility.
                      You can extend this with your own analytics by using the onLoad and onError callbacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
