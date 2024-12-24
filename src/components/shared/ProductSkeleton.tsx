export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Ảnh sản phẩm */}
          <div className="bg-gray-200 rounded-lg h-[400px]" />
          
          {/* Thông tin sản phẩm */}
          <div className="mt-4 space-y-3 p-4">
            {/* Tên sản phẩm */}
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            
            {/* Thương hiệu */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            
            {/* Giá */}
            <div className="h-5 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
} 