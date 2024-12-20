import ProductWomen from "../../components/product/product-women";
import WomenSlide from "../../components/slide/womenslide";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function WomenPage() {
	useDocumentTitle('Nước hoa nữ');

	return (
		<main className="container mx-auto">
			<WomenSlide/>
			<h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nữ</h1>
			<ProductWomen />
		</main>
	);
}