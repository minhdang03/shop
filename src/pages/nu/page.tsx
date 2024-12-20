import ProductWomen from "../../components/product/product-women";
import WomenSlide from "../../components/slide/womenslide";
import SEO from "../../components/shared/SEO";

export default function WomenPage() {
	return (
		<>
			<SEO 
				title="Nước hoa nữ"
				description="Bộ sưu tập nước hoa nữ cao cấp, chính hãng với mức giá tốt nhất thị trường"
				image="/images/main/nu.jpg"
				url="/nuoc-hoa-nu"
			/>
			<main className="container mx-auto">
				<WomenSlide/>
				<h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nữ</h1>
				<ProductWomen updateTitle={false} />
			</main>
		</>
	);
}