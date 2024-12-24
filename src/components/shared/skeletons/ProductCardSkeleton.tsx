import ContentLoader from 'react-content-loader';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white h-full rounded">
      <ContentLoader
        speed={1.5}
        width={300}
        height={400}
        viewBox="0 0 300 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className="animate-pulse"
      >
        {/* Hình ảnh */}
        <rect x="0" y="0" rx="8" ry="8" width="300" height="220" />
        
        {/* Tên sản phẩm - 2 dòng */}
        <rect x="16" y="236" rx="4" ry="4" width="260" height="20" />
        <rect x="16" y="264" rx="4" ry="4" width="200" height="20" />
        
        {/* Các nút size */}
        <rect x="16" y="300" rx="4" ry="4" width="60" height="32" />
        <rect x="84" y="300" rx="4" ry="4" width="60" height="32" />
        <rect x="152" y="300" rx="4" ry="4" width="60" height="32" />
        
        {/* Giá */}
        <rect x="16" y="348" rx="4" ry="4" width="120" height="28" />
      </ContentLoader>
    </div>
  );
} 