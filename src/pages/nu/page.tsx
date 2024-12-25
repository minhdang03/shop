import { Helmet } from 'react-helmet';
import ProductWomen from '../../components/product/product-women';
import WomenSlide from '../../components/slide/womenslide';
import SEO from '../../components/shared/SEO';

export default function WomenPage() {
	return (
		<>
			<SEO 
				title="Nước hoa nữ chính hãng | PINO.VN"
				description="Nước hoa nữ chính hãng với đa dạng mẫu mã, thương hiệu và mức giá"
				url="https://pino.vn/nuoc-hoa-nu"
			/>
			<WomenSlide />
			<div className="py-8">
				<ProductWomen />
			</div>
		</>
	);
}