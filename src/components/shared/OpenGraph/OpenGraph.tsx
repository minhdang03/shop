import { OpenGraphData } from './types';

export default function OpenGraph({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName = 'PINO.VN',
  locale = 'vi_VN'
}: OpenGraphData) {
  return (
    <>
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
    </>
  );
} 