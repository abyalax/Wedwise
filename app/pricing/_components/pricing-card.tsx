import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { PricingPlan } from '../_types';

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.15 }}>
      <Card className={`relative h-full transition-all duration-300 hover:shadow-card-hover ${plan.isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="gap-1 bg-rose-gold border-0 text-primary-foreground shadow-lg px-4">
              <Star className="h-3 w-3 fill-current" />
              Most Popular
            </Badge>
          </div>
        )}
        <CardHeader className="pb-4 pt-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-card-foreground">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
          <div className="mt-4">
            <span className="font-serif text-4xl font-bold text-primary">{formatPrice(plan.price)}</span>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
            Choose package
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
