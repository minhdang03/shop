import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetails from "./components/product/product-details";
import Checkout from './pages/checkout';
import Confirmation from './pages/confirmation';
import Products from './pages/products';
import MenPerfumePage from './pages/nam/page';
import WomenPage from './pages/nu/page';
import NotFound from './pages/not-found';
import Layout from "./layout";

export default function PageRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/nuoc-hoa-nam" element={<MenPerfumePage />} />
				<Route path="/nuoc-hoa-nam/:slug" element={<ProductDetails />} />
				<Route path="/nuoc-hoa-nu" element={<WomenPage />} />
				<Route path="/nuoc-hoa-nu/:slug" element={<ProductDetails />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/confirmation" element={<Confirmation />} />
				<Route path="/products" element={<Products />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}
