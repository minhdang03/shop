import {Route, Routes} from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/home/page";
import NotFound from "./pages/not-found";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import NamPage from "./pages/nam/page";
import WomenPage from "./pages/nu/page";
import ProductDetails from "./components/product/product-details";

export default function PageRoutes(){
	return (
		<Routes>
			<Route path={'/'} element={<Layout/>}>
				<Route index element={<HomePage/>} />
				<Route path={'checkout'} element={<Checkout/>} />
				<Route path={'confirmation'} element={<Confirmation/>} />
				<Route path={'nuoc-hoa-nam'} element={<NamPage/>} />
				<Route path={'nuoc-hoa-nu'} element={<WomenPage/>} />
				<Route path={'san-pham/:id'} element={<ProductDetails updateTitle={true} />} />
				<Route path={'*'} element={<NotFound/>} />
			</Route>
		</Routes>
	)
}
