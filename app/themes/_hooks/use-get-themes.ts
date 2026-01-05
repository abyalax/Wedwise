import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import themeElegant from '~/assets/themes/theme-elegant.jpg';
import themeMinimalist from '~/assets/themes/theme-minimalist.jpg';
import themeModern from '~/assets/themes/theme-modern.jpg';
import themeRomantic from '~/assets/themes/theme-romantic.jpg';
import themeRustic from '~/assets/themes/theme-rustic.jpg';
import themeTropical from '~/assets/themes/theme-tropical.jpg';
import { Theme } from '../_types';

const themes: Theme[] = [
  {
    slug: 'minimalist-blush',
    name: 'Blush Minimalist',
    category: 'minimalist',
    image: themeMinimalist,
    isPremium: false,
    features: ['RSVP', 'Gallery', 'Countdown'],
    description: 'A simple and elegant design with a soft blush pink touch.',
  },
  {
    slug: 'rustic-botanical',
    name: 'Rustic Botanical',
    category: 'rustic',
    image: themeRustic,
    isPremium: false,
    features: ['RSVP', 'Gallery', 'Story'],
    description: 'A bohemian feel with floral elements and warm tones.',
  },
  {
    slug: 'elegant-emerald',
    name: 'Elegant Emerald',
    category: 'elegant',
    image: themeElegant,
    isPremium: true,
    features: ['RSVP', 'Gallery', 'Countdown', 'Chatbot', 'Music'],
    description: 'A glamorous design with a golden and emerald green accent.',
  },
  {
    slug: 'modern-geometric',
    name: 'Modern Geometric',
    category: 'modern',
    image: themeModern,
    isPremium: true,
    features: ['RSVP', 'Gallery', 'Countdown', 'Chatbot'],
    description: 'A contemporary design with bold geometric lines.',
  },
  {
    slug: 'romantic-garden',
    name: 'Romantic Garden',
    category: 'romantic',
    image: themeRomantic,
    isPremium: false,
    features: ['RSVP', 'Gallery', 'Story', 'Music'],
    description: 'A romantic design with peony and watercolor roses.',
  },
  {
    slug: 'tropical-paradise',
    name: 'Tropical Paradise',
    category: 'tropical',
    image: themeTropical,
    isPremium: true,
    features: ['RSVP', 'Gallery', 'Countdown', 'Chatbot', 'Music'],
    description: 'A tropical feel for destination wedding venues.',
  },
];

export const queryGetThemes = () =>
  queryOptions({
    queryKey: ['get-themes'],
    queryFn: () => themes,
  });

export const useGetThemes = () => {
  return useSuspenseQuery(queryGetThemes());
};
