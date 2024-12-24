import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Helmet>
        <title>404 - Không tìm thấy trang | PINO.VN</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Không tìm thấy trang bạn yêu cầu</p>
        <Link 
          to="/"
          className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
