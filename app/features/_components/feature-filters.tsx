import { motion } from 'framer-motion';
import { useGetFeatureCategories } from '../_hooks/use-get-features';
import { FeatureCategory } from '../_types';

interface FeatureFiltersProps {
  selectedCategory: FeatureCategory;
  onCategoryChange: (category: FeatureCategory) => void;
}

export function FeatureFilters({ selectedCategory, onCategoryChange }: FeatureFiltersProps) {
  const { data: categories } = useGetFeatureCategories();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className="cursor-pointer relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
        >
          {selectedCategory === category.value && (
            <motion.div
              layoutId="feature-filter-active"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className={`relative z-10 ${selectedCategory === category.value ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
