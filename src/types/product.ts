export interface ProductVariant {
  _id: string;
  sku: string;
  name: string;
  image: string;
  images: string[];
  attributes: {
    SIZE: string;
  };
  price: number;
  costPrice: number;
  stock: number;
  active: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  brand: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  variants: ProductVariant[];
  images?: string[];
  price?: number;
} 