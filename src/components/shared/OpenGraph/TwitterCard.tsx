import { TwitterCardData } from './types';

export default function TwitterCard({
  title,
  description,
  image,
  url,
  card = 'summary_large_image'
}: TwitterCardData) {
  return (
    <>
      <meta name="twitter:card" content={card} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
    </>
  );
} 