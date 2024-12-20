import ProductMen from "../../components/product/product-men";
import MenSlide from "../../components/slide/menslide";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function MenPage() {
	useDocumentTitle('Nước hoa nam');
	
	return (
		<main className="container mx-auto">
			<MenSlide/>
			<h1 className="text-2xl font-bold my-6 px-4">Nước Hoa Nam</h1>
			<ProductMen updateTitle={true} />
		</main>
	);
}