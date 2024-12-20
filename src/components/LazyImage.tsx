import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export default function LazyImage({ 
  src, 
  alt, 
  className,
  fallback = '/images/placeholder.jpg' 
}: LazyImageProps) {
  const [isError, setIsError] = useState(false);

  return (
    <LazyLoadImage
      src={isError ? fallback : src}
      alt={alt}
      effect="blur"
      className={className}
      onError={() => setIsError(true)}
      loading="lazy"
      threshold={100}
      placeholderSrc={fallback}
    />
  );
} 