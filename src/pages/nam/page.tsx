import { Helmet } from 'react-helmet';
import ProductMen from '../../components/product/product-men';
import MenSlide from '../../components/slide/menslide';

export default function MenPerfumePage() {
	return (
		<div>
			<Helmet>
				<title>Nước hoa nam | PINO.VN</title>
			</Helmet>
			<MenSlide />
			<div className="py-8">
				<ProductMen />
			</div>
		</div>
	);
}