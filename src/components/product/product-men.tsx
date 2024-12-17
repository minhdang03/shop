import { useEffect, useState } from "react";
import { API_URL } from "../../config/constants";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

export default function ProductMen() {
  useDocumentTitle('Nước hoa nam');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nam</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
