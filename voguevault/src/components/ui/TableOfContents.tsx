'use client';

import { useState, useEffect } from 'react';
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
}

const TableOfContents = ({
  contentRef,
  className = '',
  headingSelector = 'h2, h3, h4',
  smooth = true,
  offset = 100,
  sticky = true,
  title = 'Table of Contents',
}: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

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
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className={`${className} ${sticky ? 'sticky top-24' : ''}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <nav>
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
  );
};

export default TableOfContents;
