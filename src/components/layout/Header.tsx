'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Home,
  ShoppingBag,
  Sparkles,
  Coffee,
  BookOpen
} from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Mock search results - in a real app, this would query your API or search index
    if (e.target.value.length > 2) {
      setSearchResults([
        { title: 'Fashion Trends 2023', href: '/articles/fashion-trends-2023' },
        { title: 'Essential Skincare Routine', href: '/articles/essential-skincare-routine' },
        { title: 'Sustainable Fashion Guide', href: '/articles/sustainable-fashion-guide' },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-background'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Updated to match VogueVaults style with improved visibility */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold tracking-tighter font-serif relative">
              <span className="absolute -inset-1 rounded-lg bg-primary/5 scale-0 transition-all duration-300 group-hover:scale-100"></span>
              <span className="relative bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent dark:from-white dark:via-white/90 dark:to-white/80">VogueVaults</span>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>

          {/* Desktop Navigation - VogueVaults Style */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              href="/categories/fashion"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Fashion
            </Link>

            <Link
              href="/categories/beauty"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Beauty
            </Link>

            <Link
              href="/categories/lifestyle"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Lifestyle
            </Link>

            <Link
              href="/categories/culture"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Culture
            </Link>
          </nav>

          {/* Search Bar - VogueVaults Style */}
          <div className="hidden md:flex items-center bg-muted/50 rounded-full border border-border/50 px-3 py-2 w-[280px] mx-4">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchOpen(true)}
            />
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg max-h-[300px] overflow-y-auto z-50">
                <div className="p-2">
                  <p className="text-xs text-muted-foreground mb-2">Suggestions</p>
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.href}
                      className="block p-2 hover:bg-muted rounded-md text-sm"
                      onClick={() => setSearchOpen(false)}
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:flex items-center">
              <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8 text-foreground">
                <span className="text-sm font-medium">EN</span>
              </Button>
            </div>

            {/* Theme Toggle - Updated for better visibility in both light and dark modes */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-muted/30 hover:bg-muted/50 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="md:hidden rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Sign In / Sign Up */}
            <div className="hidden md:flex space-x-2">
              <Button variant="ghost" size="sm" className="font-medium text-foreground">
                Log In
              </Button>
              <Button size="sm" className="bg-primary text-white font-medium">
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Navigation - VogueVaults Style */}
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Home
                    </Link>

                    <Link
                      href="/categories/fashion"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Fashion
                    </Link>

                    <Link
                      href="/categories/beauty"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Beauty
                    </Link>

                    <Link
                      href="/categories/lifestyle"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                    >
                      <Coffee className="mr-2 h-5 w-5" />
                      Lifestyle
                    </Link>

                    <Link
                      href="/categories/culture"
                      className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      Culture
                    </Link>
                  </nav>

                  {/* Mobile Search - VogueVaults Style */}
                  <div className="pt-2 pb-4">
                    <div className="flex items-center bg-muted/50 rounded-md border border-border/50 px-3 py-2">
                      <Search className="h-4 w-4 text-muted-foreground mr-2" />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8 text-foreground">
                      <span className="text-sm font-medium">EN</span>
                    </Button>
                  </div>

                  {/* Auth Buttons - VogueVaults Style */}
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline" className="w-full text-foreground">
                      Log In
                    </Button>
                    <Button className="w-full bg-primary text-white">
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
