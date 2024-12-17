import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../../config/constants';
import { Product, ProductVariant } from '../../types/product';
import { useCartStore } from '../../store/cart-store';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const cartStore = useCartStore();

  const { data: product } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/user/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setSelectedImage(data.data.variants[0].image);
        setSelectedVariant(data.data.variants[0]);
        return data.data;
      }
      throw new Error('Failed to fetch product');
    }
  });

  useDocumentTitle(product?.name || 'Chi tiết sản phẩm');

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    cartStore.add({
      product: {
        id: product._id,
        name: product.name,
        price: selectedVariant.price,
        variant: {
          _id: selectedVariant._id,
          name: selectedVariant.name,
          price: selectedVariant.price,
          image: selectedVariant.image,
          attributes: {
            SIZE: selectedVariant.attributes.SIZE
          }
        }
      },
      product_id: product._id,
      variant_id: selectedVariant._id,
      quantity: quantity
    });

    alert('Đã thêm vào giỏ hàng!');
  };

  if (!product) return null;

  return (
    <div id="product-detail-container" className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        {/* Cột trái - Phần hình ảnh */}
        <div className="col-left w-full md:w-1/2 pr-0 md:pr-8">
          <section>
            {/* Hình ảnh chính */}
            <div className="product-imgs mb-4">
              <div className="item bg-gray-50 rounded-lg">
                <img
                  src={selectedVariant?.image || "/images/Unknown.jpg"}
                  alt={product.name}
                  className="w-full h-[400px] object-contain p-4"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Cột phải - Thông tin sản phẩm */}
        <div className="col-right w-full md:w-1/2 mt-8 md:mt-0">
          <section className="w-100">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-4">
              <p className="text-gray-600">Thương hiệu: {product.brand.name}</p>
              <p className="text-gray-600">Danh mục: {product.category.name}</p>
            </div>

            {/* Phần chọn variant */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Dung tích:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setSelectedImage(variant.image);
                    }}
                    className={`px-4 py-2 border rounded-md ${
                      selectedVariant?._id === variant._id
                        ? 'bg-gray-900 text-white'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {variant.attributes.SIZE}
                    {variant.price === 0 && ' - Tester'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-2xl font-bold text-red-600">
                {selectedVariant?.price === 0 
                  ? 'Miễn phí (Tester)' 
                  : `${selectedVariant?.price.toLocaleString()} VNĐ`
                }
              </p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center py-2"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                disabled={!selectedVariant}
              >
                Thêm vào giỏ
              </button>
            </div>

            {/* Chính sách bán hàng */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Chính sách bán hàng</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Cam kết chính hãng 100%</li>
                <li>Đổi trả trong vòng 7 ngày</li>
                <li>Miễn phí giao hàng cho đơn từ 1.000.000đ</li>
                <li>Giao hàng toàn quốc</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}