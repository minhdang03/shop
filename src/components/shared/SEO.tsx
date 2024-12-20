import { Helmet } from 'react-helmet-async';
import OpenGraph from './OpenGraph/OpenGraph';
import TwitterCard from './OpenGraph/TwitterCard';
import { SEOProps } from './OpenGraph/types';
import { DEFAULT_OG_CONFIG, DEFAULT_TWITTER_CONFIG } from './OpenGraph/config';

export default function SEO({ 
  title,
  description = DEFAULT_OG_CONFIG.description,
  image = DEFAULT_OG_CONFIG.image,
  url = DEFAULT_OG_CONFIG.url,
  type = DEFAULT_OG_CONFIG.type,
  siteName = DEFAULT_OG_CONFIG.siteName,
  locale = DEFAULT_OG_CONFIG.locale,
  twitterCard
}: SEOProps) {
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Thẻ title và mô tả cơ bản */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://server.pino.vn" />
      <link rel="dns-prefetch" href="https://server.pino.vn" />
      
      {/* PWA */}
      <meta name="theme-color" content="#ffffff" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Open Graph */}
      <OpenGraph
        title={fullTitle}
        description={description}
        image={image}
        url={url}
        type={type}
        siteName={siteName}
        locale={locale}
      />
      
      {/* Twitter Card */}
      <TwitterCard
        {...(twitterCard || {
          title: fullTitle,
          description,
          image,
          url,
          card: DEFAULT_TWITTER_CONFIG.card
        })}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
} 