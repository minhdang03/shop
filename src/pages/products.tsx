import { useEffect, useState } from 'react';
import { API_URL } from '../config/constants';
import { Product } from '../types/product';
import ProductList from "../components/product/product-list";

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await fetch(`${API_URL}/api/user/products`);
				const data = await response.json();
				if (data.success) {
					setProducts(data.data);
				}
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<main>
				<h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 animate-pulse">
					{[...Array(6)].map((_, index) => (
						<div key={index} className="bg-gray-200 rounded-lg h-[400px]"></div>
					))}
				</div>
			</main>
		);
	}

	return (
		<main>
			<h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
			<ProductList products={products} />
		</main>
	);
}
