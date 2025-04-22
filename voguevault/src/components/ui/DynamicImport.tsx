'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

interface DynamicImportProps {
  componentName: string;
  fallback?: React.ReactNode;
  props?: Record<string, any>;
}

/**
 * A component that dynamically imports other components when needed
 * This helps with code splitting and reducing initial bundle size
 */
const DynamicImport = ({ componentName, fallback = null, props = {} }: DynamicImportProps) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Map component names to their import paths
        const componentMap: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
          // UI Components
          'TableOfContents': () => import('@/components/ui/TableOfContents'),
          'ReadingProgress': () => import('@/components/ui/ReadingProgress'),
          'OptimizedImage': () => import('@/components/ui/OptimizedImage'),
          
          // Feature Components
          'CommentSection': () => import('@/components/features/CommentSection'),
          'BookmarkButton': () => import('@/components/features/BookmarkButton'),
          'ShareButtons': () => import('@/components/features/ShareButtons'),
          'RelatedArticles': () => import('@/components/features/RelatedArticles'),
          
          // Add more components as needed
        };

        if (!componentMap[componentName]) {
          throw new Error(`Component "${componentName}" not found in component map`);
        }

        // Dynamically import the component
        const { default: ImportedComponent } = await componentMap[componentName]();
        setComponent(() => ImportedComponent);
      } catch (err) {
        console.error(`Error loading component "${componentName}":`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    loadComponent();
  }, [componentName]);

  if (error) {
    // Return a minimal error state
    return <div className="text-error text-sm">Failed to load component</div>;
  }

  if (!Component) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default DynamicImport;

/**
 * Helper function to dynamically import a component
 * @param componentName The name of the component to import
 * @param options Additional options like loading delay
 * @returns A dynamically imported component
 */
export const dynamicComponent = (componentName: string, options = {}) => {
  return dynamic(() => {
    // Map component names to their import paths
    const componentMap: Record<string, Promise<{ default: React.ComponentType<any> }>> = {
      // UI Components
      'TableOfContents': import('@/components/ui/TableOfContents'),
      'ReadingProgress': import('@/components/ui/ReadingProgress'),
      'OptimizedImage': import('@/components/ui/OptimizedImage'),
      
      // Feature Components
      'CommentSection': import('@/components/features/CommentSection'),
      'BookmarkButton': import('@/components/features/BookmarkButton'),
      'ShareButtons': import('@/components/features/ShareButtons'),
      'RelatedArticles': import('@/components/features/RelatedArticles'),
      
      // Add more components as needed
    };

    if (!componentMap[componentName]) {
      throw new Error(`Component "${componentName}" not found in component map`);
    }

    return componentMap[componentName];
  }, options);
};
