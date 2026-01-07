'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Fragment, useState } from 'react';
import { FeatureCategory } from '../_types';
import { FeatureFilters } from './feature-filters';
import { FeatureGrid } from './feature-grid';

export function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('all');

  return (
    <Fragment>
      <section className="relative overflow-hidden bg-gradient-elegant text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Complete Features
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">Everything You Need Here</h1>
          <p className="mt-4 text-lg text-muted-foreground">Complete features to create a perfect and impactful digital invitation</p>
        </motion.div>
      </section>
      <section className="border-b bg-background/80 py-6 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl">
          <FeatureFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl">
          <FeatureGrid selectedCategory={selectedCategory} />
        </div>
      </section>
    </Fragment>
  );
}
