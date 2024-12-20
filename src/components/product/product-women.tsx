import { Suspense, lazy, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { API_URL } from "../../config/constants";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { ErrorBoundary } from '../shared/ErrorBoundary';

const ProductCard = lazy(() => import('./ProductCard'));
const ProductSkeleton = lazy(() => import('../shared/ProductSkeleton'));

interface ProductWomenProps {
  limit?: number;
  updateTitle?: boolean;
}

function ProductWomen({ limit = 0, updateTitle = false }: ProductWomenProps) {
  useDocumentTitle(updateTitle ? 'Nước hoa nữ' : '');

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['women-products', limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/api/user/products?category=676057995957fd2f56673f7f${limit ? `&limit=${limit}` : ''}`
      );
      const data = await response.json();
      if (!data.success) throw new Error("Không thể tải dữ liệu sản phẩm");
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    retry: 1
  });

  if (error) {
    return <div className="text-center text-red-500 p-4">{(error as Error).message}</div>;
  }

  const displayedProducts = limit > 0 ? products.slice(0, limit) : products;

  return (
    <div className="container mx-auto" ref={ref}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {inView ? (
          displayedProducts.map((product: Product) => (
            <ErrorBoundary key={product._id} fallback={<ProductSkeleton />}>
              <Suspense fallback={<ProductSkeleton />}>
                <ProductCard product={product} />
              </Suspense>
            </ErrorBoundary>
          ))
        ) : (
          Array(limit || 8).fill(0).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))
        )}
      </div>
      
      {limit > 0 && products.length > limit && inView && (
        <div className="text-center mb-8">
          <Link
            to="/nuoc-hoa-nu"
            className="inline-block px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(ProductWomen);
