import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  meta?: Record<string, string>;
}

export default function SEO({ 
  title = 'PINO.VN - Nước hoa chính hãng',
  description = 'Nước hoa chính hãng giá tốt nhất thị trường',
  image = 'https://pino.vn/images/og-image.jpg',
  url = 'https://pino.vn',
  type = 'website',
  meta = {}
}: SEOProps) {
  // Đảm bảo image URL là absolute
  const absoluteImage = image.startsWith('http') ? image : `${process.env.VITE_API_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />

      {/* Custom meta tags */}
      {Object.entries(meta).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Helmet>
  );
} 