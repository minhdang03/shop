import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
import { Product } from "../types/product";
import MainSlide from "../components/slide/mainslide";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import ProductMen from "../components/product/product-men";
import ProductWomen from "../components/product/product-women";

export default function Home() {
	useDocumentTitle('Trang chủ', true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<div className="w-full">
			<MainSlide />
			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 animate-pulse">
					{[...Array(3)].map((_, index) => (
						<div key={index} className="bg-gray-200 rounded-lg h-[400px]"></div>
						))}
				</div>
			) : (
				<>
				<h1 className="text-center text-2xl font-bold my-6 px-4">Nước Hoa Nam</h1>
					<ProductMen limit={3} updateTitle={false} />
					
					<h1 className="text-center text-2xl font-bold my-6 px-4">Nước Hoa Nữ</h1>
					<ProductWomen limit={3} updateTitle={false} />
				</>
			)}
		</div>
	)
}
