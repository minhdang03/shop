import ContentLoader from 'react-content-loader';

export default function SlidesSkeleton() {
  return (
    <div className="relative w-full aspect-[21/9] md:aspect-[21/7]">
      <ContentLoader
        speed={1.5}
        width="100%"
        height="100%"
        viewBox="0 0 1400 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className="animate-pulse"
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
} 