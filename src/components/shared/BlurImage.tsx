import { useState } from 'react';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export default function BlurImage({ 
  src, 
  alt, 
  className = '',
  wrapperClassName = '' 
}: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt}
        className={`
          duration-700 ease-in-out
          ${isLoading 
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
          }
          ${className}
        `}
        onLoad={() => setLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
} 