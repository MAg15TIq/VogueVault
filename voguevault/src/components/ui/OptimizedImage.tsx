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
    // If the image fails to load, use a placeholder
    setImgSrc('https://placehold.co/600x400/9c27b0/ffffff?text=VogueVault');
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
