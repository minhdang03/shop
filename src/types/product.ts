export interface ProductVariant {
  _id: string;
  sku: string;
  name: string;
  image: string;
  attributes: {
    SIZE: string;
  };
  price: number;
  costPrice: number;
  stock: number;
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
  images: string[];
  variants: ProductVariant[];
} 