import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useState } from 'react';

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
}

export default function ProductCard({ product, isLoading }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading || !product) {
    return <ProductCardSkeleton />;
  }

  const baseVariant = product.variants[0];
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(baseVariant.price);

  return (
    <Link 
      to={`/san-pham/${product._id}`}
      className="group flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative pt-[100%] w-full overflow-hidden bg-gray-100">
        <div 
          className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        <img
          src={baseVariant.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-all duration-300 ${
            imageLoaded 
              ? 'opacity-100 group-hover:scale-105' 
              : 'opacity-0'
          }`}
        />
      </div>

      {/* Content container */}
      <div className="flex flex-col flex-grow p-4">
        {/* Brand name */}
        <span className="text-sm text-gray-500 mb-1">
          {product.brand?.name}
        </span>

        {/* Product name */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 flex-grow">
          {product.name}
        </h3>

        {/* Variants */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.variants.map(variant => (
            <span 
              key={variant._id}
              className="px-2 py-1 text-xs bg-gray-100 rounded"
            >
              {variant.name}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-pink-500">
          {formattedPrice}
        </div>
      </div>
    </Link>
  );
} 