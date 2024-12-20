import ProductMen from "../../components/product/product-men";
import MenSlide from "../../components/slide/menslide";
import SEO from "../../components/shared/SEO";

export default function MenPage() {
	return (
		<>
			<SEO 
				title="Nước hoa nam" 
				description="Bộ sưu tập nước hoa nam cao cấp, chính hãng với mức giá tốt nhất thị trường"
				image="/images/main/nam.jpg"
				url="/nuoc-hoa-nam"
				type="website"
			/>
			<main className="container mx-auto">
				<MenSlide/>
				<h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nam</h1>
				<ProductMen updateTitle={false} />
			</main>
		</>
	);
}