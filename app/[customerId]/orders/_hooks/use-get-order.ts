import { useQuery } from '@tanstack/react-query';
import ThemeElegant from '~/assets/themes/theme-elegant.jpg';
import type { Order } from '../_types';

// Mock data for order
const mockOrder: Order = {
  id: 'ORD-2025-001',
  themeName: 'Elegant Rose',
  themeSlug: 'elegant',
  themeImage: ThemeElegant,
  packageName: 'Premium',
  groomName: 'Muhammad Rizki',
  brideName: 'Anisa Putri',
  eventDate: '2026-03-15',
  status: 'processing',
  totalPrice: 599000,
  createdAt: '2025-12-01T10:00:00Z',
};

export const useGetOrder = (orderId?: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async (): Promise<Order> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockOrder;
    },
    enabled: true, // In real app, this would be: !!orderId
  });
};
