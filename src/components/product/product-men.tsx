import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from "react";
import { API_URL } from "../../config/constants";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { ErrorBoundary } from '../shared/ErrorBoundary';

const ProductCard = lazy(() => import('./ProductCard'));
const ProductSkeleton = lazy(() => import('../shared/ProductSkeleton'));

interface ProductMenProps {
  limit?: number;
  updateTitle?: boolean;
}

export default function ProductMen({ limit = 0, updateTitle = false }: ProductMenProps) {
  if (updateTitle) {
    useDocumentTitle('Nước hoa nam');
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/user/products?category=676057995957fd2f56673f7e`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError("Không thể tải dữ liệu sản phẩm");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      }
    };
    fetchMenProducts();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  const displayedProducts = limit > 0 ? products.slice(0, limit) : products;

  return (
    <div className="container mx-auto" ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {inView ? (
          displayedProducts.map((product) => (
            <ErrorBoundary key={product._id}>
              <Suspense fallback={<ProductSkeleton />}>
                <ProductCard product={product} />
              </Suspense>
            </ErrorBoundary>
          ))
        ) : (
          Array(limit || products.length || 3).fill(0).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))
        )}
      </div>
      {limit > 0 && products.length > limit && inView && (
        <div className="text-center mb-8">
          <Link
            to="/nuoc-hoa-nam"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
}
