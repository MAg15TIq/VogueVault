'use client';

import Script from 'next/script';

interface WebsiteStructuredDataProps {
  siteName: string;
  siteUrl: string;
}

export const WebsiteStructuredData = ({ siteName, siteUrl }: WebsiteStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  authorName: string;
  publishDate: string;
  modifiedDate?: string;
  categoryName: string;
}

export const ArticleStructuredData = ({
  title,
  description,
  url,
  imageUrl,
  authorName,
  publishDate,
  modifiedDate,
  categoryName
}: ArticleStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: authorName
    },
    publisher: {
      '@type': 'Organization',
      name: 'VogueVault',
      logo: {
        '@type': 'ImageObject',
        url: `${url.split('/').slice(0, 3).join('/')}/images/logo.png`
      }
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    articleSection: categoryName
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbStructuredData = ({ items }: BreadcrumbStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface LocalBusinessStructuredDataProps {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export const LocalBusinessStructuredData = ({
  name,
  description,
  url,
  logoUrl,
  telephone,
  email,
  address,
  sameAs = []
}: LocalBusinessStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo: logoUrl,
    telephone,
    email,
    address: address ? {
      '@type': 'PostalAddress',
      ...address
    } : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined
  };

  // Remove undefined properties
  Object.keys(structuredData).forEach(key => {
    const typedKey = key as keyof typeof structuredData;
    if (structuredData[typedKey] === undefined) {
      delete structuredData[typedKey];
    }
  });

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
