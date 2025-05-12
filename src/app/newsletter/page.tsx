import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Check } from 'lucide-react';

export const metadata = {
  title: 'Newsletter - VogueVaults',
  description: 'Subscribe to the VogueVaults newsletter for the latest updates on fashion, beauty, lifestyle, and culture.',
};

export default function NewsletterPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Newsletter', href: '/newsletter' }
  ];

  // Sample newsletter benefits
  const benefits = [
    {
      title: 'Exclusive Content',
      description: 'Get access to articles and insights not published on our website.'
    },
    {
      title: 'Early Access',
      description: 'Be the first to read our latest articles before they go live.'
    },
    {
      title: 'Curated Recommendations',
      description: 'Receive personalized content recommendations based on your interests.'
    },
    {
      title: 'Special Offers',
      description: 'Exclusive deals and promotions from our partners and sponsors.'
    }
  ];

  // Sample newsletter categories
  const categories = [
    {
      name: 'Fashion Weekly',
      description: 'The latest fashion trends, style guides, and industry news.',
      image: '/images/categories/fashion.jpg'
    },
    {
      name: 'Beauty Insider',
      description: 'Beauty tips, product reviews, and skincare advice.',
      image: '/images/categories/beauty.jpg'
    },
    {
      name: 'Lifestyle Digest',
      description: 'Wellness tips, home decor ideas, and productivity hacks.',
      image: '/images/categories/lifestyle.jpg'
    },
    {
      name: 'Culture Spotlight',
      description: 'Arts, entertainment, and cultural trends from around the world.',
      image: '/images/categories/culture.jpg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Newsletter</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Stay updated with the latest trends, articles, and insights from VogueVaults delivered directly to your inbox.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column - Subscription Form */}
        <div>
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Subscribe Now</h2>
              <p className="text-muted-foreground">
                Join thousands of readers who get our content first.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your full name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Your email address" required />
              </div>

              <div className="space-y-3">
                <Label>Newsletter Preferences</Label>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={`category-${index}`} className="text-sm font-normal">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Email Frequency</Label>
                <select
                  id="frequency"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="weekly">Weekly Digest</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="monthly">Monthly Roundup</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="privacy"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <Label htmlFor="privacy" className="text-sm">
                  I agree to the{' '}
                  <Link href="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and consent to receive marketing emails.
                </Label>
              </div>

              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You can unsubscribe at any time by clicking the link in the footer of our emails.
              </p>
            </form>
          </div>
        </div>

        {/* Right Column - Benefits and Preview */}
        <div className="space-y-8">
          {/* Benefits */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Why Subscribe?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Preview */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
            <div className="space-y-6">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                      {category.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">What Our Subscribers Say</h2>
            <div className="space-y-4">
              <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                "The VogueVaults newsletter is the highlight of my week. The content is always fresh, relevant, and beautifully curated."
                <footer className="mt-2 font-medium not-italic text-foreground">— Sarah J.</footer>
              </blockquote>
              <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                "I love how the newsletter gives me a perfect mix of fashion, beauty, and lifestyle content. It's like having a personal curator for all things style."
                <footer className="mt-2 font-medium not-italic text-foreground">— Michael T.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How often will I receive emails?</h3>
              <p className="text-muted-foreground">
                You can choose your preferred frequency during signup: weekly, bi-weekly, or monthly. You can change this preference at any time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Can I customize the content I receive?</h3>
              <p className="text-muted-foreground">
                Yes, you can select which categories you're interested in during signup. We'll tailor your newsletter content based on your preferences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">How do I unsubscribe?</h3>
              <p className="text-muted-foreground">
                You can unsubscribe at any time by clicking the "Unsubscribe" link at the bottom of any newsletter email.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Is my email address secure?</h3>
              <p className="text-muted-foreground">
                Yes, we take data privacy seriously. Your email address and personal information are handled according to our Privacy Policy and will never be shared with third parties without your consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
