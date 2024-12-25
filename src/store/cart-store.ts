import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductVariant } from '../types/product';

interface CartItem {
  product_id: string;
  variant_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    variant: ProductVariant;
  };
}

interface CartProduct {
  id: string;
  name: string;
  price: number;
  variant: {
    _id: string;
    sku: string;
    name: string;
    images: string[];
    attributes: {
      SIZE: string;
    };
    price: number;
    costPrice: number;
    stock: number;
    active: boolean;
  };
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  increaseQuantity: (productId: string, variantId: string) => void;
  decreaseQuantity: (productId: string, variantId: string) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id && i.variant_id === item.variant_id
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id && i.variant_id === item.variant_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },

      removeFromCart: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product_id === productId && item.variant_id === variantId)
          ),
        }));
      },

      increaseQuantity: (productId, variantId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId && item.variant_id === variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId, variantId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId && item.variant_id === variantId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalAmount: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      partialize: (state) => ({ items: state.items }), // only persist items array
    }
  )
);
