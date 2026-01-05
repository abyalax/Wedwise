'use client';

import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { Suspense } from 'react';
import { PricingGrid } from './pricing-grid';

export const PagePricing = () => {
  return (
    <div className="container mx-auto space-y-6">
      <section className="relative overflow-hidden bg-gradient-elegant px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Crown className="h-4 w-4" />
            Pricing
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">Choose the Best Package</h1>
          <p className="mt-4 text-lg text-muted-foreground">Digital wedding packages tailored to your needs and budget</p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="px-4">
        <div className="mx-auto max-w-5xl">
          <Suspense
            fallback={
              <div className="grid gap-8 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-96 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            }
          >
            <PricingGrid />
          </Suspense>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-muted/30 px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-2xl font-bold text-foreground">Have Questions?</h2>
          <p className="mt-2 text-muted-foreground">Contact us for a free consultation and help choosing the right package</p>
        </div>
      </section>
    </div>
  );
};
