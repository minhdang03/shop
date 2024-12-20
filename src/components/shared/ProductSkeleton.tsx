export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
} 