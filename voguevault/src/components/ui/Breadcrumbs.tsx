'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  homeLabel?: string;
  separator?: string;
}

const Breadcrumbs = ({
  items = [],
  homeLabel = 'Home',
  separator = '/'
}: BreadcrumbsProps) => {
  const pathname = usePathname();

  // If no items are provided, generate them from the pathname
  const breadcrumbItems = items.length > 0
    ? items
    : pathname ? generateBreadcrumbsFromPath(pathname, homeLabel) : [{ label: homeLabel, href: '/' }];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm text-neutral-500 dark:text-neutral-400">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-neutral-400 dark:text-neutral-500">{separator}</span>
            )}

            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-neutral-800 dark:text-neutral-200" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Helper function to generate breadcrumbs from a pathname
const generateBreadcrumbsFromPath = (pathname: string | null, homeLabel: string): BreadcrumbItem[] => {
  if (!pathname) return [{ label: homeLabel, href: '/' }];

  const segments = pathname.split('/').filter(Boolean);

  // Start with home
  const breadcrumbs: BreadcrumbItem[] = [
    { label: homeLabel, href: '/' }
  ];

  // Add each segment
  let path = '';
  segments.forEach((segment) => {
    path += `/${segment}`;

    // Format the label (capitalize, replace hyphens with spaces)
    let label = segment;

    // Handle dynamic routes with [param]
    if (segment.startsWith('[') && segment.endsWith(']')) {
      // This is a placeholder for dynamic routes
      label = 'Details';
    } else {
      // Format regular routes
      label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
    }

    breadcrumbs.push({ label, href: path });
  });

  return breadcrumbs;
};

export default Breadcrumbs;
