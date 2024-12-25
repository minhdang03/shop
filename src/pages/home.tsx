import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
import { Product } from "../types/product";
import MainSlide from "../components/slide/mainslide";
import ProductMen from "../components/product/product-men";
import ProductWomen from "../components/product/product-women";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SEO from "../components/shared/SEO";

export default function Home() {
	return (
		<>
			<SEO 
				title="PINO.VN - Nước hoa chính hãng"
				description="Chuyên cung cấp nước hoa chính hãng với giá tốt nhất thị trường"
				url="https://pino.vn"
			/>
			<div className="w-full">
				<MainSlide />
				<div className="mt-8">
					<h1 className="text-center text-2xl font-bold mb-6 px-4">Nước Hoa Nam</h1>
					<ProductMen limit={3} updateTitle={false} />
				</div>
			</div>
		</>
	);
}
