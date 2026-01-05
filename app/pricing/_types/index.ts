export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular: boolean;
}
