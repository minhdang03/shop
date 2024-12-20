import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle('Không tìm thấy trang', true);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-8">Không tìm thấy trang bạn yêu cầu</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
