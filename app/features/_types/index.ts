export type FeatureCategory = 'all' | 'core' | 'engagement' | 'ai' | 'integration';

export interface Feature {
  id: string;
  name: string;
  category: FeatureCategory;
  description: string;
  icon: string;
  isPremium: boolean;
}
