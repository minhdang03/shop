import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import LazyImage from '../LazyImage';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const baseVariant = product.variants[0];
  
  return (
    <Link 
      to={`/product/${product._id}`}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
        <LazyImage
          src={baseVariant.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            {baseVariant.price.toLocaleString()}đ
          </p>
          <span className="text-sm text-gray-500">
            {baseVariant.attributes.SIZE}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Sử dụng memo để tránh re-render không cần thiết
export default memo(ProductCard);
