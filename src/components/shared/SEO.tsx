import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

export default function SEO({ title, description, image }: SEOProps) {
  const siteTitle = 'PINO.VN - Nước hoa chính hãng';
  const defaultDescription = 'Chuyên cung cấp nước hoa chính hãng với mức giá tốt nhất thị trường';
  const defaultImage = '/images/main/main.jpg';

  return (
    <Helmet>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
} 