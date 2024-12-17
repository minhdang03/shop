import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { Product, ProductVariant } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // State để theo dõi variant được chọn
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);

  // Nếu không có variants thì return null hoặc placeholder
  if (!product.variants?.length) {
    return null;
  }

  return (
    <Link to={`/san-pham/${product._id}`} className="block h-full">
      <div className="bg-white hover:shadow-lg hover:rounded-lg transition-shadow h-full flex flex-col">
        {/* Phần hình ảnh */}
        <div className="relative h-[220px] flex items-center justify-center p-2 flex-shrink-0">
          <LazyLoadImage
            src={selectedVariant?.image || product.images[0] || "/images/Unknown.jpg"}
            alt={product.name}
            className="max-h-[200px] w-auto object-contain"
            wrapperClassName="flex items-center justify-center"
          />
        </div>

        {/* Phần thông tin */}
        <div className="p-3 border-t flex flex-col flex-grow">
          <h4 className="text-base font-medium text-gray-900 mb-2">
            {product.name}
          </h4>

          {/* Phần chọn size */}
          <div className="flex flex-wrap gap-2 mb-2">
            {product.variants.map((variant) => (
              // Chỉ hiển thị nếu có SIZE
              variant.attributes.SIZE && (
                <button
                  key={variant._id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                  }}
                  className={`px-2 py-1 text-sm border transition-all ${
                    selectedVariant._id === variant._id
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-gray-900 hover:rounded-md'
                  }`}
                >
                  {variant.attributes.SIZE}
                </button>
              )
            ))}
          </div>

          {/* Phần giá */}
          <div className="mt-auto">
            <p className="text-lg font-semibold text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedVariant.price.toLocaleString()} VNĐ
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
