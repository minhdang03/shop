import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from "../../config/constants";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { ErrorBoundary } from '../shared/ErrorBoundary';
import { Helmet } from 'react-helmet';
import ProductGridSkeleton from '../shared/skeletons/ProductGridSkeleton';
import ProductCardSkeleton from '../shared/skeletons/ProductCardSkeleton';

const ProductCard = lazy(() => import('./ProductCard'));

interface ProductMenProps {
  limit?: number;
  updateTitle?: boolean;
}

export default function ProductMen({ limit = 0, updateTitle = true }: ProductMenProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['men-products'],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/api/user/products?category=676057995957fd2f56673f7e`
      );
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
      throw new Error('Failed to fetch products');
    }
  });

  // Số lượng sản phẩm thực tế sẽ hiển thị
  const displayedProducts = products ? (limit > 0 ? products.slice(0, limit) : products) : [];
  const skeletonCount = limit || products?.length || 9; // Fallback to 9 if no data yet

  return (
    <div className="container mx-auto" ref={ref}>
      {updateTitle && (
        <Helmet>
          <title>Nước hoa nam | PINO.VN</title>
        </Helmet>
      )}

      {(!inView || isLoading) ? (
        <ProductGridSkeleton count={skeletonCount} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {displayedProducts.map((product) => (
            <ErrorBoundary key={product._id}>
              <Suspense fallback={<ProductCardSkeleton />}>
                <ProductCard product={product} />
              </Suspense>
            </ErrorBoundary>
          ))}
        </div>
      )}

      {limit > 0 && products && products.length > limit && (
        <div className="text-center mb-8">
          <Link
            to="/nuoc-hoa-nam"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
}
