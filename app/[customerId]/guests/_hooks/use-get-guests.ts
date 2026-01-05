import { useQuery } from '@tanstack/react-query';
import type { Guest } from '../_types';

// Mock data for guests
const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    phone: '081234567890',
    email: 'budi@example.com',
    rsvpStatus: 'confirmed',
    numberOfGuests: 2,
    notes: 'Akan datang bersama istri',
    createdAt: '2025-12-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    phone: '081234567891',
    email: 'siti@example.com',
    rsvpStatus: 'pending',
    numberOfGuests: 1,
    createdAt: '2025-12-02T14:30:00Z',
  },
  {
    id: '3',
    name: 'Ahmad Wijaya',
    phone: '081234567892',
    rsvpStatus: 'declined',
    numberOfGuests: 0,
    notes: 'Ada acara keluarga',
    createdAt: '2025-12-03T09:15:00Z',
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    rsvpStatus: 'confirmed',
    numberOfGuests: 3,
    notes: 'Bersama orang tua',
    createdAt: '2025-12-04T16:45:00Z',
  },
  {
    id: '5',
    name: 'Rizki Pratama',
    phone: '081234567894',
    rsvpStatus: 'pending',
    numberOfGuests: 2,
    createdAt: '2025-12-05T11:20:00Z',
  },
];

export const useGetGuests = () => {
  return useQuery({
    queryKey: ['guests'],
    queryFn: async (): Promise<Guest[]> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockGuests;
    },
  });
};
