export interface OpenGraphData {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  locale?: string;
}

export interface TwitterCardData {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  card?: 'summary' | 'summary_large_image';
}

export interface SEOProps extends OpenGraphData {
  twitterCard?: TwitterCardData;
} 