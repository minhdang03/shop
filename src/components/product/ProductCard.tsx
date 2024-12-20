import { memo } from 'react';
import { Link } from "react-router-dom";
import { Product, ProductVariant } from "../../types/product";
import { useState } from "react";
import BlurImage from '../shared/BlurImage';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const priceText = process.env.VITE_PRICE_TEXT || "Liên hệ";

  if (!product.variants?.length) {
    return null;
  }

  return (
    <Link 
      to={`/san-pham/${product._id}`} 
      className="block h-full"
    >
      <div className="bg-white hover:shadow-lg hover:rounded-lg transition-shadow h-full flex flex-col group">
        {/* Phần hình ảnh */}
        <div className="relative h-[220px] flex items-center justify-center p-2 flex-shrink-0 transition-colors">
          <BlurImage
            src={selectedVariant?.image || product.images[0] || "/images/Unknown.jpg"}
            alt={product.name}
            className="max-h-[200px] w-auto object-contain transition-transform group-hover:scale-105"
            wrapperClassName="flex items-center justify-center"
          />
        </div>

        {/* Phần thông tin */}
        <div className="p-3 border-t flex flex-col flex-grow">
          <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Phần chọn size */}
          <div className="flex flex-wrap gap-2 mb-2">
            {product.variants.map((variant) => (
              variant.attributes.SIZE && (
                <button
                  key={variant._id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                  }}
                  className={`px-2 py-1 text-sm border rounded transition-all ${
                    selectedVariant._id === variant._id
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-pink-300 hover:text-pink-500'
                  }`}
                  aria-label={`Chọn size ${variant.attributes.SIZE}`}
                >
                  {variant.attributes.SIZE}
                  {variant.price === 0 && ` - ${priceText}`}
                </button>
              )
            ))}
          </div>

          {/* Phần giá */}
          <div className="mt-auto">
            <p className="text-lg font-semibold text-pink-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedVariant.price === 0 
                ? priceText
                : `${selectedVariant.price.toLocaleString()} VNĐ`
              }
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
