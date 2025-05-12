'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      {/* Newsletter Banner */}
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 font-serif">Join Our Newsletter</h3>
              <p className="text-muted-foreground max-w-md">
                Get the latest fashion trends, beauty tips, and lifestyle insights delivered straight to your inbox.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="min-w-[280px]"
                  required
                />
                <Button type="submit" className="group">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tighter font-serif bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent dark:from-white dark:via-white/90 dark:to-white/80">
                VogueVaults
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Your premier destination for fashion trends, beauty tips, lifestyle inspiration, and cultural insights. Discover the latest in style, wellness, and creativity.
            </p>

            {/* Social Media */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@voguevaults.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Fashion Avenue, Style City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categories/fashion" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/beauty" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="/categories/lifestyle" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/categories/culture" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Culture
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Recent Posts</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/articles/fashion-trends-2023" className="group">
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="https://i.imgur.com/example1.jpg"
                        alt="Fashion Trends"
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Fashion Trends to Watch in 2023</h4>
                      <p className="text-xs text-muted-foreground mt-1">May 15, 2023</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/articles/essential-skincare-routine" className="group">
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="https://i.imgur.com/example2.jpg"
                        alt="Skincare Routine"
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Essential Skincare Routine for All Skin Types</h4>
                      <p className="text-xs text-muted-foreground mt-1">Feb 10, 2023</p>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} VogueVaults. All rights reserved. Made with <Heart className="inline-block h-3 w-3 text-red-500" /> by Malik Mohsin Saleem Khan
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
