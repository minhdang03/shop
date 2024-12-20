import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../../config/constants';
import { Product, ProductVariant } from '../../types/product';
import { useCartStore } from '../../store/cart-store';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { toast } from 'react-hot-toast';

interface ProductDetailsProps {
  updateTitle?: boolean;
}

export default function ProductDetails({ updateTitle }: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const cartStore = useCartStore();

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/user/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setSelectedImage(data.data.variants[0].image);
        setSelectedVariant(data.data.variants[0]);
        return data.data as Product;
      }
      throw new Error('Failed to fetch product');
    }
  });

  useEffect(() => {
    if (updateTitle && product?.name) {
      document.title = `${product.name} | Pino Perfume`;
    }
  }, [product?.name, updateTitle]);

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

  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Có lỗi xảy ra khi tải sản phẩm.</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600 pt-6">
        <Link to="/" className="hover:text-blue-500">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link 
          to={`/${product.category.name === "Nước hoa nam" ? "nuoc-hoa-nam" : "nuoc-hoa-nu"}`} 
          className="hover:text-blue-500"
        >
          {product.category.name}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Phần hình ảnh */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-2xl p-8">
            <img
              src={selectedVariant?.image || "/images/Unknown.jpg"}
              alt={product.name}
              className="w-full h-[500px] object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Phần thông tin */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-light mb-4">{product.name}</h1>
          
          <div className="space-y-6">
            {/* Rating và Trạng thái */}
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <div className="flex text-pink-500 mr-2">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-500 font-medium">Còn hàng</span>
              </div>
            </div>

            {/* Thông tin thương hiệu */}
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex flex-col">
                <span className="text-sm">Thương hiệu</span>
                <span className="font-medium">{product.brand.name}</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-sm">Danh mục</span>
                <span className="font-medium">{product.category.name}</span>
              </div>
            </div>

            {/* Phần chọn variant */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Dung tích:</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant: ProductVariant) => (
                  <button
                    key={variant._id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setSelectedImage(variant.image);
                    }}
                    className={`px-6 py-3 border-2 rounded-lg transition-all ${
                      selectedVariant?._id === variant._id
                        ? 'border-pink-500 bg-pink-500 text-white'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {variant.attributes.SIZE}
                    {variant.price === 0 && ' - Tester'}
                  </button>
                ))}
              </div>
            </div>

            {/* Giá */}
            <div className="py-6 border-y border-gray-100">
              <p className="text-3xl font-light">
                {selectedVariant?.price === 0 
                  ? 'Miễn phí (Tester)' 
                  : `${selectedVariant?.price.toLocaleString()} VNĐ`
                }
              </p>
            </div>

            {/* Số lượng và nút thêm vào giỏ */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center py-3 border-x-2 border-gray-200"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-pink-500 text-white py-4 px-6 rounded-lg hover:bg-pink-600 transition-colors"
                disabled={!selectedVariant}
              >
                Thêm vào giỏ
              </button>
            </div>

            {/* Chính sách bán hàng */}
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-medium">Chính sách b��n hàng</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cam kết chính hãng 100%</span>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Miễn phí giao hàng từ 500.000 VNĐ</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                  <span>Giao hàng toàn quốc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}