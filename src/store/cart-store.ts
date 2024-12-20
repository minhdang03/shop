import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product_id: string;
  variant_id: string;
  quantity: number;
  product: any;
}

interface CartStore {
  list: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (item: { product_id: string; variant_id: string; quantity: number }) => void;
  increaseQuantity: (product_id: string, variant_id: string) => void;
  decreaseQuantity: (product_id: string, variant_id: string) => void;
  removeFromCart: (product_id: string, variant_id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      list: [],
      
      addToCart: (newItem) =>
        set((state) => {
          const existingItem = state.list.find(
            (item) =>
              item.product_id === newItem.product_id &&
              item.variant_id === newItem.variant_id
          );

          if (existingItem) {
            return {
              list: state.list.map((item) =>
                item.product_id === newItem.product_id &&
                item.variant_id === newItem.variant_id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          }

          return { list: [...state.list, newItem] };
        }),

      updateQuantity: (updateItem) =>
        set((state) => ({
          list: state.list.map((item) =>
            item.product_id === updateItem.product_id &&
            item.variant_id === updateItem.variant_id
              ? { ...item, quantity: updateItem.quantity }
              : item
          ),
        })),

      increaseQuantity: (product_id, variant_id) =>
        set((state) => ({
          list: state.list.map((item) =>
            item.product_id === product_id && item.variant_id === variant_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (product_id, variant_id) =>
        set((state) => ({
          list: state.list.map((item) =>
            item.product_id === product_id && item.variant_id === variant_id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),

      removeFromCart: (product_id, variant_id) =>
        set((state) => ({
          list: state.list.filter(
            (item) =>
              !(item.product_id === product_id && item.variant_id === variant_id)
          ),
        })),

      getTotalItems: () => {
        const state = get();
        return state.list.reduce((total, item) => total + item.quantity, 0);
      },

      clearCart: () => set({ list: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
