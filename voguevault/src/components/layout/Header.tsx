   'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl md:text-5xl font-extrabold relative group"
          style={{
            fontFamily: "var(--font-playfair)",
            letterSpacing: "2px",
            textTransform: "uppercase"
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">VogueVault</span>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></span>
          <span className="absolute -top-1 right-0 w-0 h-1 bg-gradient-to-l from-primary to-secondary group-hover:w-full transition-all duration-500 delay-100"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-primary transition-colors nav-link">
            Home
          </Link>
          <Link href="/categories/fashion" className="hover:text-primary transition-colors nav-link">
            Fashion
          </Link>
          <Link href="/categories/lifestyle" className="hover:text-primary transition-colors nav-link">
            Lifestyle
          </Link>
          <Link href="/categories/beauty" className="hover:text-primary transition-colors nav-link">
            Beauty
          </Link>
          <Link href="/categories/culture" className="hover:text-primary transition-colors nav-link">
            Culture
          </Link>

          {/* More Dropdown */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={toggleMoreDropdown}
              className="flex items-center hover:text-primary transition-colors focus:outline-none nav-link"
              aria-expanded={isMoreDropdownOpen}
              aria-haspopup="true"
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMoreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/gallery"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/sitemap"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Search, Bookmarks, Dark Mode Toggle, and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link href="/search" className="hover:text-primary transition-colors header-link">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link href="/bookmarks" className="hover:text-primary transition-colors header-link">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none header-link"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none header-link"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/categories/fashion" className="hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link href="/categories/lifestyle" className="hover:text-primary transition-colors">
              Lifestyle
            </Link>
            <Link href="/categories/beauty" className="hover:text-primary transition-colors">
              Beauty
            </Link>
            <Link href="/categories/culture" className="hover:text-primary transition-colors">
              Culture
            </Link>
            <Link href="/bookmarks" className="hover:text-primary transition-colors">
              Bookmarks
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <div className="flex items-center pt-2">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
