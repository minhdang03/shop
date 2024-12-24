import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = 'PINO.VN - Nước hoa chính hãng',
  description = 'PINO.VN - Hệ thống nước hoa chính hãng uy tín hàng đầu Việt Nam. Cam kết 100% authentic, giao hàng toàn quốc.',
  image = '/images/og-image.jpg',
  url = 'https://pino.vn'
}: SEOProps) {
  const siteTitle = title.includes('|') ? title : `${title} | PINO.VN`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
} 