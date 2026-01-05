import { StaticImageData } from 'next/image';

export type ThemeCategory = 'all' | 'minimalist' | 'rustic' | 'elegant' | 'modern' | 'romantic' | 'tropical';

export interface Theme {
  slug: string;
  name: string;
  category: ThemeCategory;
  image: string | StaticImageData;
  isPremium: boolean;
  features: string[];
  description: string;
}
