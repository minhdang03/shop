import {Route, Routes} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Products from "./pages/products";
import MenPerfumePage from "./pages/nam/page";
import ProductDetails from "./components/product/product-details";
import NamPage from "./pages/nam/page";
import WomenPage from "./pages/nu/page";
import ProductMen from "./components/product/product-men";
import ProductWomen from "./components/product/product-women";

export default function PageRoutes(){
	return (
		<Routes>
			<Route path={'/'} element={<Layout/>}>
				<Route index element={<Home/>} />
				<Route path={'checkout'} element={<Checkout/>} />
				<Route path={'confirmation'} element={<Confirmation/>} />
				<Route path={'products'} element={<Products/>} />
				<Route path={'nam'} element={<MenPerfumePage/>} />
				<Route path={'nu'} element={<WomenPage/>} />
				<Route path={'san-pham/:id'} element={<ProductDetails />} />
				<Route path={'*'} element={<NotFound/>} />
			</Route>
		</Routes>
	)
}
