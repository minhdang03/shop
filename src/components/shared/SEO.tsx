import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

export default function SEO({ title, description, image }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | PINO.VN</title>
      <meta name="description" content={description} />
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://server.pino.vn" />
      <link rel="dns-prefetch" href="https://server.pino.vn" />
      
      {/* PWA */}
      <meta name="theme-color" content="#ffffff" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
} 