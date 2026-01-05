import { StaticImageData } from 'next/image';

export interface Order {
  id: string;
  themeName: string;
  themeSlug: string;
  themeImage: string | StaticImageData;
  packageName: string;
  groomName: string;
  brideName: string;
  eventDate: string;
  status: 'pending' | 'processing' | 'completed';
  totalPrice: number;
  createdAt: string;
}
