import { useGetPricing } from '../_hooks/use-get-pricing';
import { PricingCard } from './pricing-card';

export function PricingGrid() {
  const { data: plans } = useGetPricing();

  return (
    <div className="grid gap-8 md:grid-cols-3 py-10">
      {plans.map((plan, index) => (
        <PricingCard key={plan.id} plan={plan} index={index} />
      ))}
    </div>
  );
}
