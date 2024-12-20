import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/shared/ProductCard';
import { Product } from '../../types/product';
import SEO from '../../components/shared/SEO';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { data: menProducts, isLoading: isLoadingMen } = useQuery<Product[]>({
    queryKey: ['men-products', 4],
    queryFn: async () => {
      const res = await fetch('/api/products?category=men&limit=4');
      const data = await res.json();
      return data.data;
    }
  });

  const { data: womenProducts, isLoading: isLoadingWomen } = useQuery<Product[]>({
    queryKey: ['women-products', 4], 
    queryFn: async () => {
      const res = await fetch('/api/products?category=women&limit=4');
      const data = await res.json();
      return data.data;
    }
  });

  return (
    <>
      <SEO 
        title="Trang chủ"
        description="PINO.VN - Nước hoa chính hãng với mức giá tốt nhất thị trường"
      />

      {/* Hero Section */}
      <section className="relative h-[500px] mb-12">
        <img
          src="/images/main/hero.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              PINO.VN
            </h1>
            <p className="text-xl md:text-2xl">
              Nước hoa chính hãng
            </p>
          </div>
        </div>
      </section>

      {/* Men's Products */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Nước hoa nam</h2>
          <Link 
            to="/nuoc-hoa-nam"
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            Xem tất cả
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoadingMen
            ? Array(4).fill(0).map((_, idx) => (
                <ProductCard key={`skeleton-${idx}`} isLoading />
              ))
            : menProducts?.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </section>

      {/* Women's Products */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Nước hoa nữ</h2>
          <Link 
            to="/nuoc-hoa-nu"
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoadingWomen
            ? Array(4).fill(0).map((_, idx) => (
                <ProductCard key={`skeleton-${idx}`} isLoading />
              ))
            : womenProducts?.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-pink-500">
                <svg>...</svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Chính hãng 100%</h3>
              <p className="text-gray-600">
                Cam kết chỉ bán hàng chính hãng
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-pink-500">
                <svg>...</svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Giá tốt nhất</h3>
              <p className="text-gray-600">
                Giá cả cạnh tranh nhất thị trường
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-pink-500">
                <svg>...</svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">
                Luôn sẵn sàng hỗ trợ khách hàng
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 