import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home';
import Checkout from './pages/checkout';
import Confirmation from './pages/confirmation';
import Products from './pages/products';
import MenPerfumePage from './pages/nam/page';
import WomenPage from './pages/nu/page';
import ProductDetails from './components/product/product-details';
import NotFound from './pages/not-found';

export default function PageRoutes() {
	return (
		<Routes>
			<Route path={'/'} element={<Layout/>}>
				<Route index element={<Home/>} />
				<Route path={'checkout'} element={<Checkout/>} />
				<Route path={'confirmation'} element={<Confirmation/>} />
				<Route path={'products'} element={<Products/>} />
				<Route path={'nuoc-hoa-nam'} element={<MenPerfumePage/>} />
				<Route path={'nuoc-hoa-nu'} element={<WomenPage/>} />
				<Route path={'san-pham/:id'} element={<ProductDetails />} />
				<Route path={'*'} element={<NotFound/>} />
			</Route>
		</Routes>
	)
}
