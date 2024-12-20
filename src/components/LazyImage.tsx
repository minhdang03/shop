import { useState, useEffect } from 'react';

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
  const [imageSrc, setImageSrc] = useState<string>(fallback);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsError(false);
    };
    
    img.onerror = () => {
      setImageSrc(fallback);
      setIsError(true);
    };
  }, [src, fallback]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isError ? 'opacity-50' : 'opacity-100'
      } ${className}`}
      onError={() => {
        setImageSrc(fallback);
        setIsError(true);
      }}
    />
  );
} 