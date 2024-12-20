import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/constants';

export function useProducts(category?: string, limit?: number) {
  return useQuery({
    queryKey: ['products', category, limit],
    queryFn: async () => {
      const url = category 
        ? `${API_URL}/api/user/products?category=${category}`
        : `${API_URL}/api/user/products`;
      const response = await fetch(url);
      const data = await response.json();
      return limit ? data.data.slice(0, limit) : data.data;
    },
    staleTime: 5 * 60 * 1000, // Cache trong 5 phút
    refetchOnMount: false, // Không refetch khi mount
    refetchOnReconnect: false, // Không refetch khi reconnect
  });
} 