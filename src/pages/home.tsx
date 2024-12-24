import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
import { Product } from "../types/product";
import MainSlide from "../components/slide/mainslide";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import ProductMen from "../components/product/product-men";
import ProductWomen from "../components/product/product-women";
import ProductSkeleton from "../components/shared/ProductSkeleton";

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
				<ProductSkeleton />
			) : (
				<>
					<h1 className="text-center text-2xl font-bold my-6 px-4">Nước Hoa Nam</h1>
					<ProductMen limit={3} updateTitle={false} />
				</>
			)}
		</div>
	)
}
