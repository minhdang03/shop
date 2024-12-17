import create from 'zustand';
import { produce } from 'immer';

// Thêm hàm helper để đọc/ghi localStorage
const getLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key) || '[]');
const setLocalStorage = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  variant?: {
    _id: string;
    name: string;
    price: number;
    image: string;
    attributes: {
      SIZE: string;
    }
  }
}

interface CartItem {
  product: Product;
  product_id: string;
  quantity: number;
  variant_id?: string;
}

interface CartStore {
  list: CartItem[];
  add: (item: CartItem) => void;
  delete: (item: { product_id: string; variant_id?: string }) => void;
  updateQuantity: (item: { product_id: string; variant_id?: string; quantity: number }) => void;
  increaseQuantity: (item: { product_id: string; variant_id?: string; quantity: number }) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  // Khởi tạo list từ localStorage
  list: getLocalStorage('cart'),
  
  add: (item) =>
    set(
      produce((state) => {
        const existingItem = state.list.find(
          (i: { product_id: string; variant_id: string | undefined; }) => i.product_id === item.product_id && i.variant_id === item.variant_id
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.list.push(item);
        }
        // Lưu vào localStorage sau khi cập nhật
        setLocalStorage('cart', state.list);
      })
    ),

  delete: (item) =>
    set(
      produce((state) => {
        const index = state.list.findIndex(
          (i: { product_id: string; variant_id: string | undefined; }) => i.product_id === item.product_id && i.variant_id === item.variant_id
        );
        if (index !== -1) {
          state.list.splice(index, 1);
          setLocalStorage('cart', state.list);
        }
      })
    ),

  updateQuantity: (item) =>
    set(
      produce((state) => {
        const existingItem = state.list.find(
          (i: { product_id: string; variant_id: string | undefined; }) => i.product_id === item.product_id && i.variant_id === item.variant_id
        );
        if (existingItem) {
          if (item.quantity <= 0) {
            const index = state.list.findIndex(
              (i: { product_id: string; variant_id: string | undefined; }) => i.product_id === item.product_id && i.variant_id === item.variant_id
            );
            state.list.splice(index, 1);
          } else {
            existingItem.quantity = item.quantity;
          }
          setLocalStorage('cart', state.list);
        }
      })
    ),

  increaseQuantity: (item) =>
    set(
      produce((state) => {
        const existingItem = state.list.find(
          (i: { product_id: string; variant_id: string | undefined; }) => i.product_id === item.product_id && i.variant_id === item.variant_id
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
          setLocalStorage('cart', state.list);
        }
      })
    ),

  clearCart: () =>
    set(
      produce((state) => {
        state.list = [];
        setLocalStorage('cart', []);
      })
    ),
}));
