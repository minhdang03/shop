export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton với tỷ lệ giống ProductCard */}
      <div className="relative pt-[100%] w-full">
        <div className="absolute inset-0 bg-gray-200" />
      </div>

      {/* Content container - giữ layout giống ProductCard */}
      <div className="flex flex-col flex-grow p-4">
        {/* Brand skeleton */}
        <div className="h-4 bg-gray-200 rounded w-20 mb-1" />

        {/* Name skeleton - 2 lines với flex-grow */}
        <div className="flex-grow mb-2">
          <div className="h-5 bg-gray-200 rounded w-full mb-1" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Variants skeleton - flex wrap */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 w-14 bg-gray-200 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-6 w-12 bg-gray-200 rounded" />
        </div>

        {/* Price skeleton - giống kích thước thật */}
        <div className="h-7 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );
} 