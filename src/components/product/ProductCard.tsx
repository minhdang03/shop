import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Product, ProductVariant } from "../../types/product";
import { useInView } from 'react-intersection-observer';
import { slugify } from '../../utils/slugify';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => {
    return product.variants && product.variants.length > 0 
      ? product.variants[0] 
      : null;
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categoryPath = product.category.name === "Nước hoa nam" ? "nuoc-hoa-nam" : "nuoc-hoa-nu";
  const baseSlug = slugify(product.name);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedVariant) return;

    const path = `/${categoryPath}/${baseSlug}?v=${slugify(selectedVariant.attributes.SIZE)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  const handleVariantClick = (variant: ProductVariant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariant(variant);
    setImageLoaded(false);
  };

  if (!product.variants?.length || !selectedVariant) {
    return null;
  }

  return (
    <div 
      onClick={handleCardClick}
      className="cursor-pointer"
      ref={ref}
    >
      <div className="bg-white hover:shadow-lg hover:rounded-lg transition-shadow h-full flex flex-col group">
        <div className="relative h-[220px] flex items-center justify-center p-2 flex-shrink-0 transition-colors">
          {inView && (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
              )}
              <img
                key={selectedVariant?._id}
                src={selectedVariant?.images?.[0] || selectedVariant?.image || "/images/Unknown.jpg"}
                alt={product.name}
                className={`max-h-[200px] w-auto object-contain mix-blend-multiply transition-transform group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            </>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.variants.map(variant => variant.attributes.SIZE && (
              <button
                key={variant._id}
                onClick={(e) => handleVariantClick(variant, e)}
                className={`px-2 py-1 text-sm border transition-all hover:rounded-lg ${
                  selectedVariant?._id === variant._id
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-pink-300 hover:text-pink-500'
                }`}
                aria-label={`Chọn size ${variant.attributes.SIZE}`}
              >
                {variant.attributes.SIZE}
                {variant.price === 0 && ` - Liên hệ`}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <p className="text-lg font-semibold text-pink-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedVariant?.price === 0 
                ? `Liên hệ`
                : `${selectedVariant?.price.toLocaleString()} VNĐ`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
