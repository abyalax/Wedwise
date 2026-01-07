import { AnimatePresence, motion } from 'framer-motion';
import { useGetFeatures } from '../_hooks/use-get-features';
import { FeatureCategory } from '../_types';
import { FeatureCard } from './feature-card';

interface FeatureGridProps {
  selectedCategory: FeatureCategory;
}

export function FeatureGrid({ selectedCategory }: FeatureGridProps) {
  const { data: features } = useGetFeatures();

  const filteredFeatures = selectedCategory === 'all' ? features : features?.filter((feature) => feature.category === selectedCategory);

  return (
    <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {filteredFeatures?.map((feature, index) => (
          <motion.div
            key={feature.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureCard feature={feature} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
