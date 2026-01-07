import { queryOptions, useQuery } from '@tanstack/react-query';
import { PricingPlan } from '../_types';

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 150000,
    description: 'Basic package for simple digital invitations',
    features: ['Digital Invitation', 'Countdown Timer', 'Audio Music', 'Gallery (max 10 photos)', 'RSVP Online', 'Share via Link'],
    isPopular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 350000,
    description: 'Comprehensive package for the best wedding experience',
    features: [
      'All Basic features',
      'Story of the Bride and Groom',
      'Unlimited Gallery',
      'WhatsApp Integration',
      'Custom Domain',
      'Analytics Dashboard',
      'Priority Support',
    ],
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 750000,
    description: 'Exclusive package with AI Assistant and premium features',
    features: [
      'All Premium features',
      '24/7 AI Chatbot',
      'WhatsApp AI Assistant',
      'Guest Management',
      'Catering Management',
      'Souvenir Tracking',
      'Dedicated Support',
      'Custom Integration',
    ],
    isPopular: false,
  },
];

export const queryGetPricing = () =>
  queryOptions({
    queryKey: ['get-pricing'],
    queryFn: () => pricingPlans,
  });

export const useGetPricing = () => {
  return useQuery(queryGetPricing());
};
