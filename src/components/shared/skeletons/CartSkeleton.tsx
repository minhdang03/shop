import ContentLoader from 'react-content-loader';

export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <ContentLoader
          speed={2}
          width={1200}
          height={600}
          viewBox="0 0 1200 600"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Tiêu đề */}
          <rect x="400" y="0" rx="4" ry="4" width="400" height="40" />
          
          {/* Sản phẩm trong giỏ hàng */}
          <rect x="0" y="80" rx="8" ry="8" width="800" height="120" />
          <rect x="0" y="220" rx="8" ry="8" width="800" height="120" />
          
          {/* Form thông tin */}
          <rect x="840" y="80" rx="8" ry="8" width="360" height="400" />
          
          {/* Tổng tiền */}
          <rect x="0" y="380" rx="4" ry="4" width="200" height="32" />
          <rect x="600" y="380" rx="4" ry="4" width="200" height="32" />
        </ContentLoader>
      </div>
    </div>
  );
} 