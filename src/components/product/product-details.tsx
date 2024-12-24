import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../../config/constants';
import { Product, ProductVariant } from '../../types/product';
import { useCartStore } from '../../store/cart-store';
import { toast } from 'react-hot-toast';
import SEO from '../shared/SEO';
import ProductDetailsSkeleton from '../shared/skeletons/ProductDetailsSkeleton';
import { slugify } from '../../utils/slugify';

interface ProductDetailsProps {
  updateTitle?: boolean;
}

export default function ProductDetails({ updateTitle = true }: ProductDetailsProps) {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const productId = location.state?.productId;
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const cartStore = useCartStore();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/user/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        const defaultVariant = data.data.variants[0];
        setSelectedImage(defaultVariant.image);
        setSelectedVariant(defaultVariant);
        return data.data as Product;
      }
      throw new Error('Failed to fetch product');
    }
  });

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    cartStore.addToCart({
      product: {
        id: product._id,
        name: product.name,
        price: selectedVariant.price,
        variant: selectedVariant
      },
      product_id: product._id,
      variant_id: selectedVariant._id,
      quantity: quantity
    });

    toast.success('Đã thêm vào giỏ hàng!');
  };

  if (isLoading || !product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 pb-20 sm:pb-4 bg-gradient-to-b from-pink-50/50 to-white">
      <SEO 
        title={product?.name}
        description={`Mua ${product?.name} chính hãng tại PINO.VN. Giao hàng toàn quốc, đảm bảo chất lượng.`}
        image={product?.images[0]}
      />
      {/* Breadcrumb với màu gradient */}
      <div className="mb-2 sm:mb-8 text-xs sm:text-sm text-gray-600 pt-10 sm:pt-6 md:pt-6">
        <Link to="/" className="hover:text-pink-500 transition-colors">Trang chủ</Link>
        <span className="mx-2 text-pink-300">/</span>
        <Link 
          to={`/${product.category.name === "Nước hoa nam" ? "nuoc-hoa-nam" : "nuoc-hoa-nu"}`} 
          className="hover:text-pink-500 transition-colors"
          onClick={() => window.scrollTo(0, 0)}
        >
          {product.category.name}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-12">
        {/* Phần hình ảnh với shadow và border */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
            <img
              src={selectedVariant?.image || "/images/Unknown.jpg"}
              alt={product.name}
              className="w-full h-[250px] sm:h-[500px] object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Phần thông tin với các điểm nhấn màu sắc */}
        <div className="w-full md:w-1/2">
          <h1 className="text-xl sm:text-4xl font-light mb-2 sm:mb-4 bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
            {product.name}
          </h1>
          
          {/* Rating và Trạng thái */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex items-center">
              <div className="flex text-yellow-500 mr-2 text-sm sm:text-base animate-pulse">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-500 font-medium text-sm sm:text-base">Còn hàng</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-6">
            {/* Thông tin thương hiệu với gradient */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-pink-400">Thương hiệu</span>
                <span className="font-medium text-sm sm:text-base text-gray-700">{product.brand.name}</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-pink-200"></div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-pink-400">Danh mục</span>
                <span className="font-medium text-sm sm:text-base text-gray-700">{product.category.name}</span>
              </div>
            </div>

            {/* Size buttons với hiệu ứng */}
            <div>
              <p className="text-xs sm:text-sm text-pink-400 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setSelectedImage(variant.image);
                    }}
                    className={`px-3 sm:px-6 py-1.5 sm:py-3 border-2 text-sm sm:text-base transition-all hover:scale-105 ${
                      selectedVariant?._id === variant._id
                        ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-lg'
                        : 'border-pink-200 hover:border-pink-300 hover:bg-pink-50'
                    } rounded-lg`}
                  >
                    {variant.attributes.SIZE}
                    {variant.price === 0 && 'lỗi'}
                  </button>
                ))}
              </div>
            </div>

            {/* Giá với gradient text */}
            <div className="py-3 sm:py-6 border-y border-pink-100">
              <p className="text-xl sm:text-3xl font-light bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
                {!selectedVariant ? (
                  product.variants[0]?.price === 0 
                    ? 'Liên hệ' 
                    : `${product.variants[0]?.price.toLocaleString()} VNĐ`
                ) : (
                  selectedVariant.price === 0 
                    ? 'Liên hệ' 
                    : `${selectedVariant.price.toLocaleString()} VNĐ`
                )}
              </p>
            </div>

            {/* Số lượng và nút thêm vào giỏ */}
            <div className="hidden sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center border-2 border-pink-200 rounded-lg overflow-hidden text-sm sm:text-base">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 hover:rounded-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 sm:w-16 text-center py-2 sm:py-3 border-x-2 border-gray-200"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 hover:rounded-lg"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base hover:from-pink-600 hover:to-pink-500 transition-all rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={!selectedVariant}
              >
                Thêm vào giỏ
              </button>
            </div>            
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar cho Mobile với gradient */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-pink-50 border-t border-pink-100 p-2 sm:hidden z-50 backdrop-blur-lg">
        <div className="grid grid-cols-5 gap-1">
          {/* Hotline */}
          <a 
            href="tel:0792299471" 
            className="flex flex-col items-center justify-center p-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-xs mt-1">Hotline</span>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/pino.vn" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-xs mt-1">Facebook</span>
          </a>

          {/* Zalo */}
          <a 
            href="https://zalo.me/0792299471" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 50 50" fill="currentColor">
              <path d="M25,2C12.3,2,2,12.3,2,25s10.3,23,23,23s23-10.3,23-23S37.7,2,25,2z M35.8,33.2c-0.2,0.5-0.4,1-0.7,1.5 c-0.3,0.5-0.7,0.9-1.1,1.3c-0.4,0.4-0.9,0.7-1.4,0.9c-0.5,0.2-1.1,0.3-1.7,0.3c-0.9,0-1.7-0.2-2.4-0.5c-0.7-0.3-1.4-0.8-2-1.4 c-0.6-0.6-1.1-1.3-1.4-2c-0.3-0.7-0.5-1.5-0.5-2.4c0-0.9,0.2-1.7,0.5-2.4c0.3-0.7,0.8-1.4,1.4-2c0.6-0.6,1.3-1.1,2-1.4 c0.7-0.3,1.5-0.5,2.4-0.5c0.9,0,1.7,0.2,2.4,0.5c0.7,0.3,1.4,0.8,2,1.4c0.6,0.6,1.1,1.3,1.4,2c0.3,0.7,0.5,1.5,0.5,2.4 C36.3,31.7,36.1,32.5,35.8,33.2z"/>
            </svg>
            <span className="text-xs mt-1">Zalo</span>
          </a>

          {/* Thêm vào giỏ */}
          <button 
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className="col-span-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}