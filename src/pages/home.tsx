import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
import { Product } from "../types/product";
import MainSlide from "../components/slide/mainslide";
import ProductMen from "../components/product/product-men";
import ProductWomen from "../components/product/product-women";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div className="w-full">
			<Helmet>
				<title>PINO.VN - Nước hoa chính hãng</title>
			</Helmet>
			<MainSlide />
			<div className="mt-8">
				<h1 className="text-center text-2xl font-bold mb-6 px-4">Nước Hoa Nam</h1>
				<ProductMen limit={3} updateTitle={false} />
			</div>
		</div>
	);
}
