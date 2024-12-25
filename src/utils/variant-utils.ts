import { slugify } from './slugify';

export const generateVariantSlug = (productName: string, variantSize: string): string => {
  const baseSlug = slugify(productName);
  const sizeSlug = slugify(variantSize);
  return `${baseSlug}-${sizeSlug}`;
}; 