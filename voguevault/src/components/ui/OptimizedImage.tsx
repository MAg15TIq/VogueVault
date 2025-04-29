'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes = '100vw',
  quality = 80,
  style,
  onLoad,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Use a fallback image if the original image fails to load
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);

    // Check if the image path is relative and might be missing the leading slash
    if (src && !src.startsWith('/') && !src.startsWith('http')) {
      const correctedPath = `/${src}`;
      console.log(`Attempting to load with corrected path: ${correctedPath}`);
      setImgSrc(correctedPath);
      return;
    }

    // If the image is from the articles directory but fails, try a category-based fallback
    if (src && src.includes('/articles/')) {
      const categoryMatch = src.match(/\/articles\/([^\/]+)\//);
      if (categoryMatch && categoryMatch[1]) {
        const category = categoryMatch[1];
        const fallbackPath = `/images/category-${category}.jpg`;
        console.log(`Attempting category fallback: ${fallbackPath}`);
        setImgSrc(fallbackPath);
        return;
      }
    }

    // Default fallback
    setImgSrc('/images/placeholder.jpg');
  };

  // Placeholder blur style
  const placeholderStyle: React.CSSProperties = {
    ...style,
    filter: 'blur(2px)', // Less intense blur
    transition: 'filter 0.3s ease-out',
  };

  // Loaded image style
  const loadedStyle: React.CSSProperties = {
    ...style,
    filter: 'none',
    transition: 'filter 0.3s ease-out',
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={fill ? undefined : (width || 600)}
      height={fill ? undefined : (height || 400)}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOWMyN2IwIiBvcGFjaXR5PSIwLjIiLz48L3N2Zz4="
      className={className}
      style={isLoaded ? loadedStyle : placeholderStyle}
      priority={priority}
      fill={fill}
      sizes={sizes}
      quality={quality}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={handleImageLoad}
      onError={handleImageError}
      unoptimized={imgSrc.startsWith('https://')}
    />
  );
};

export default OptimizedImage;
