import ContentLoader from 'react-content-loader';

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600 pt-6">
        <ContentLoader
          speed={1.5}
          width={300}
          height={20}
          viewBox="0 0 300 20"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="animate-pulse"
        >
          <rect x="0" y="0" rx="3" ry="3" width="60" height="20" />
          <rect x="80" y="0" rx="3" ry="3" width="100" height="20" />
        </ContentLoader>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Phần hình ảnh */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 ease-in-out hover:shadow-lg">
            <ContentLoader
              speed={1.5}
              width={500}
              height={500}
              viewBox="0 0 500 500"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              className="animate-pulse"
            >
              <rect x="0" y="0" rx="8" ry="8" width="500" height="500" />
            </ContentLoader>
          </div>
        </div>

        {/* Phần thông tin */}
        <div className="w-full md:w-1/2">
          <ContentLoader
            speed={1.5}
            width={500}
            height={600}
            viewBox="0 0 500 600"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            className="animate-pulse"
          >
            {/* Tên sản phẩm */}
            <rect x="0" y="0" rx="4" ry="4" width="400" height="32" />

            {/* Rating và trạng thái */}
            <rect x="0" y="52" rx="4" ry="4" width="120" height="24" />
            <rect x="140" y="52" rx="4" ry="4" width="100" height="24" />

            {/* Thông tin thương hiệu */}
            <rect x="0" y="96" rx="4" ry="4" width="80" height="16" />
            <rect x="0" y="116" rx="4" ry="4" width="120" height="24" />
            <rect x="160" y="96" rx="4" ry="4" width="80" height="16" />
            <rect x="160" y="116" rx="4" ry="4" width="120" height="24" />

            {/* Size buttons */}
            <rect x="0" y="180" rx="4" ry="4" width="80" height="16" />
            <rect x="0" y="204" rx="4" ry="4" width="80" height="40" />
            <rect x="90" y="204" rx="4" ry="4" width="80" height="40" />
            <rect x="180" y="204" rx="4" ry="4" width="80" height="40" />

            {/* Giá */}
            <rect x="0" y="280" rx="4" ry="4" width="200" height="40" />

            {/* Số lượng và nút thêm vào giỏ */}
            <rect x="0" y="360" rx="4" ry="4" width="120" height="48" />
            <rect x="140" y="360" rx="4" ry="4" width="200" height="48" />

            {/* Chính sách bán hàng */}
            <rect x="0" y="440" rx="4" ry="4" width="200" height="24" />
            <rect x="0" y="480" rx="8" ry="8" width="240" height="80" className="transition-all duration-300 ease-in-out hover:shadow-md" />
            <rect x="260" y="480" rx="8" ry="8" width="240" height="80" className="transition-all duration-300 ease-in-out hover:shadow-md" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
} 