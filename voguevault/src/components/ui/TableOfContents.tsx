'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface TocItem {
  id: string;
  text: string;
  level: number;
  isActive?: boolean;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement | null>;
  className?: string;
  headingSelector?: string;
  smooth?: boolean;
  offset?: number;
  sticky?: boolean;
  title?: string;
  floatingPosition?: boolean;
}

const TableOfContents = ({
  contentRef,
  className = '',
  headingSelector = 'h2, h3, h4',
  smooth = true,
  offset = 100,
  sticky = true,
  title = 'Table of Contents',
  floatingPosition = false,
}: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth >= 1024);
  const tocRef = useRef<HTMLDivElement>(null);

  // Extract headings from the content
  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const headings = Array.from(content.querySelectorAll(headingSelector));

    const items: TocItem[] = headings.map((heading) => {
      // Ensure heading has an id, or generate one
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substr(2, 9)}`;
      }

      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setTocItems(items);
  }, [contentRef, headingSelector]);

  // Track active heading on scroll
  useEffect(() => {
    if (!contentRef.current || tocItems.length === 0) return;

    const handleScroll = () => {
      const headingElements = tocItems.map(item => document.getElementById(item.id));

      // Find the heading that's currently in view
      const currentHeading = headingElements.reduce((prev, current) => {
        if (!current) return prev;

        const { top } = current.getBoundingClientRect();
        return top < offset + 20 && top > 0 ? current : prev;
      }, headingElements[0]);

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [contentRef, tocItems, offset]);

  // Close TOC when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(event.target as Node) && floatingPosition) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [floatingPosition]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (floatingPosition) {
        // Expand on desktop, collapse on mobile
        setIsExpanded(window.innerWidth >= 1024);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [floatingPosition]);

  // Scroll to heading when clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    if (smooth) {
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, top);
    }

    // Close the TOC after clicking if it's in floating position
    if (floatingPosition) {
      setIsExpanded(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (tocItems.length === 0) {
    return null;
  }

  // Determine classes based on whether it's floating or not
  const containerClasses = floatingPosition
    ? `toc-floating fixed left-0 top-1/2 transform -translate-y-1/2 ${isExpanded ? 'translate-x-0' : '-translate-x-[calc(100%-40px)]'} transition-transform duration-300 ease-in-out`
    : `${className} ${sticky ? 'sticky top-24' : ''}`;

  const contentClasses = floatingPosition
    ? 'toc-content bg-white dark:bg-neutral-800 rounded-r-lg p-4 max-h-[70vh] overflow-y-auto'
    : '';

  return (
    <div ref={tocRef} className={containerClasses}>
      <div className={contentClasses}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {floatingPosition && (
            <button
              onClick={toggleExpanded}
              className="toc-toggle-btn p-1 rounded-full"
              aria-label={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isExpanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                )}
              </svg>
            </button>
          )}
        </div>
        <nav className={`${floatingPosition && !isExpanded ? 'hidden' : 'block'}`}>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li
                key={item.id}
                className={`
                  ${item.level === 2 ? 'ml-0' : item.level === 3 ? 'ml-4' : 'ml-8'}
                  ${activeId === item.id ? 'text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300'}
                `}
              >
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(item.id);
                  }}
                  className="hover:text-primary transition-colors block py-1"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {floatingPosition && !isExpanded && (
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full toc-toggle-btn rounded-r-md cursor-pointer"
          onClick={toggleExpanded}
        >
          <span className="toc-tab">Table of Contents</span>
        </div>
      )}
    </div>
  );
};

export default TableOfContents;
