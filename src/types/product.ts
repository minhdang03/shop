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
  price: number;
  _id: string;
  name: string;
  description?: string;
  brand: {
    _id: string;
    name: string;
  };
  category: {
    [x: string]: any;
    _id: string;
    name: string;
  };
  images: string[];
  variants: ProductVariant[];
} 