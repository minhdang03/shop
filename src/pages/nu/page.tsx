import { Helmet } from 'react-helmet';
import ProductWomen from '../../components/product/product-women';
import WomenSlide from '../../components/slide/womenslide';

export default function WomenPage() {
	return (
		<div>
			<Helmet>
				<title>Nước hoa nữ | PINO.VN</title>
			</Helmet>
			<WomenSlide />
			<div className="py-8">
				<ProductWomen />
			</div>
		</div>
	);
}