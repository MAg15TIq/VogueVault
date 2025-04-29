import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary">
              VogueVault
            </Link>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">
              Your premier destination for fashion trends, lifestyle tips, and cultural insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/fashion" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/lifestyle" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/categories/beauty" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="/categories/culture" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                  Culture
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Stay updated with our latest articles and news.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700 text-center text-neutral-600 dark:text-neutral-300">
          <p>© {currentYear} VogueVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
