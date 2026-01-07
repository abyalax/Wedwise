import { queryOptions, useQuery } from '@tanstack/react-query';
import { Feature, FeatureCategory } from '../_types';

const features: Feature[] = [
  {
    id: 'digital-invitation',
    name: 'Digital Invitation',
    category: 'core',
    description: 'Interactive digital invitation with premium design that can be customized',
    icon: 'Mail',
    isPremium: false,
  },
  {
    id: 'countdown',
    name: 'Countdown Timer',
    category: 'core',
    description: 'Engaging countdown timer to special day with animated graphics',
    icon: 'Clock',
    isPremium: false,
  },
  {
    id: 'audio-music',
    name: 'Audio Music',
    category: 'engagement',
    description: 'Romantic background music that accompanies guests opening the invitation',
    icon: 'Music',
    isPremium: false,
  },
  {
    id: 'gallery',
    name: 'Gallery of Bride and Groom',
    category: 'engagement',
    description: 'Elegant slideshow gallery of pre-wedding photos',
    icon: 'Image',
    isPremium: false,
  },
  {
    id: 'story',
    name: 'Story of Bride and Groom',
    category: 'engagement',
    description: 'Interactively tell the love story with a timeline',
    icon: 'Heart',
    isPremium: false,
  },
  {
    id: 'rsvp',
    name: 'Online RSVP',
    category: 'core',
    description: 'Easy online confirmation of guest attendance',
    icon: 'CheckCircle',
    isPremium: false,
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    category: 'ai',
    description: "24/7 AI assistant ready to answer guests' questions",
    icon: 'Bot',
    isPremium: true,
  },
  {
    id: 'whatsapp-integration',
    name: 'WhatsApp Integration',
    category: 'integration',
    description: 'Automated invitation and reminder via WhatsApp',
    icon: 'MessageCircle',
    isPremium: true,
  },
];

const featureCategories: { value: FeatureCategory; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'core', label: 'Core' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'ai', label: 'AI' },
  { value: 'integration', label: 'Integration' },
];

export const queryGetFeatures = () =>
  queryOptions({
    queryKey: ['get-features'],
    queryFn: () => features,
  });

export const useGetFeatures = () => {
  return useQuery(queryGetFeatures());
};

export const queryGetFeatureCategories = () =>
  queryOptions({
    queryKey: ['get-feature-categories'],
    queryFn: () => featureCategories,
  });

export const useGetFeatureCategories = () => {
  return useQuery(queryGetFeatureCategories());
};
