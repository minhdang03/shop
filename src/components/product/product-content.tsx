import { useState } from 'react';
import { Product, ProductVariant } from '../../types/product';

interface ProductContentProps {
  product: Product;
}

export default function ProductContent({ product }: ProductContentProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', {
      product,
      variant: selectedVariant,
      quantity
    });
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      
      <div className="text-gray-600 mb-4">
        <p>Thương hiệu: {product.brand.name}</p>
        <p>Danh mục: {product.category.name}</p>
      </div>

      <div className="text-3xl font-bold text-red-500 mb-6">
        {selectedVariant.price.toLocaleString()} VNĐ
      </div>

      {/* Phần chọn size */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Kích thước:</label>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant._id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 rounded border ${
                selectedVariant._id === variant._id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {variant.attributes.SIZE}
            </button>
          ))}
        </div>
      </div>

      {/* Phần số lượng */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Số lượng:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center border rounded py-1"
          />
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Nút thêm vào giỏ hàng */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Thêm vào giỏ hàng
      </button>

      {/* Phần mô tả sẽ được thêm sau */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Mô tả sản phẩm</h2>
        <div className="prose max-w-none">
          {product.description || 'Chưa có mô tả cho sản phẩm này'}
        </div>
      </div>
    </div>
  );
} 