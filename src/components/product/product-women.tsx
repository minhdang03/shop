import { useEffect, useState, useCallback } from "react";
import { API_URL } from "../../config/constants";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ProductCard from "./ProductCard";
import { Product } from "../../types/product";
import InfiniteScroll from "react-infinite-scroll-component";

const ITEMS_PER_PAGE = 12; // Số sản phẩm mỗi lần load

export default function ProductWomen() {
  useDocumentTitle('Nước hoa nữ');
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tất cả sản phẩm một lần
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}/api/user/products?category=676057995957fd2f56673f7d`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          // Hiển thị trang đầu tiên
          setDisplayedProducts(data.data.slice(0, ITEMS_PER_PAGE));
        } else {
          setError("Không thể tải dữ liệu sản phẩm");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Hàm load thêm sản phẩm
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = nextPage * ITEMS_PER_PAGE;
    
    const newProducts = products.slice(start, end);
    if (newProducts.length > 0) {
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setPage(nextPage);
    }
    if (end >= products.length) {
      setHasMore(false);
    }
  }, [page, products]);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nữ</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 animate-pulse">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg h-[300px]"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nữ</h1>
      <InfiniteScroll
        dataLength={displayedProducts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
        endMessage={
          <p className="text-center text-gray-500 p-4">
            Đã hiển thị tất cả sản phẩm
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
