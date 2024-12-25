import { Helmet } from 'react-helmet';
import ProductMen from '../../components/product/product-men';
import MenSlide from '../../components/slide/menslide';
import SEO from '../../components/shared/SEO';

export default function MenPerfumePage() {
	return (
		<>
			<SEO 
				title="Nước hoa nam chính hãng | PINO.VN"
				description="Nước hoa nam chính hãng với đa dạng mẫu mã, thương hiệu và mức giá"
				url="https://pino.vn/nuoc-hoa-nam"
			/>
			<MenSlide />
			<div className="py-8">
				<ProductMen />
			</div>
		</>
	);
}