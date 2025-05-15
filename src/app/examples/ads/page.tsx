'use client';

import Link from 'next/link';
import DisplayAdExample from '@/components/examples/DisplayAdExample';

export default function AdsExamplePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Google AdSense Display Ad Example</h1>

      <div className="grid grid-cols-1 gap-8">
        <section>
          <DisplayAdExample />
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About This Implementation</h2>
          <p className="mb-4">
            This page demonstrates the implementation of a Google AdSense display ad unit with the following specifications:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Publisher ID: <code className="bg-muted px-1 py-0.5 rounded">ca-pub-8215873816542659</code></li>
            <li>Ad Slot: <code className="bg-muted px-1 py-0.5 rounded">3084720492</code></li>
            <li>Ad Format: <code className="bg-muted px-1 py-0.5 rounded">auto</code></li>
            <li>Responsive: <code className="bg-muted px-1 py-0.5 rounded">true</code></li>
          </ul>
          <p className="mb-4">
            The implementation uses React components to properly integrate the AdSense code in a Next.js application,
            ensuring that ads are only loaded on the client side and with proper error handling.
          </p>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Original AdSense Code Snippet:</h3>
            <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659"
     crossorigin="anonymous"></script>
<!-- New Display Ad unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8215873816542659"
     data-ad-slot="3084720492"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`}
            </pre>
          </div>
        </section>

        <section className="mt-8 bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-4">Implementation Approaches</h2>
          <p className="mb-4">
            There are two main approaches to implementing AdSense ads in a React/Next.js application:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">1. Using AdManager</h3>
              <p className="mb-2">
                The AdManager component provides a centralized way to manage different ad types.
              </p>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`<AdManager type="display" />`}
              </pre>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">2. Using Direct Component</h3>
              <p className="mb-2">
                Using the DisplayAd component directly gives you more control.
              </p>
              <pre className="bg-card p-3 rounded text-sm overflow-x-auto">
{`<DisplayAd />`}
              </pre>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/examples/ads/dual-approach"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View Dual Approach Example →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
