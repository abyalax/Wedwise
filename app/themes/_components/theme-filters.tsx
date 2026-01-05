import { motion } from 'framer-motion';
import { useGetCategoryThemes } from '../_hooks/use-get-categories.';
import { ThemeCategory } from '../_types';

interface ThemeFiltersProps {
  activeCategory: ThemeCategory;
  onCategoryChange: (category: ThemeCategory) => void;
}

export function ThemeFilters({ activeCategory, onCategoryChange }: ThemeFiltersProps) {
  const { data: categories } = useGetCategoryThemes();
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className="cursor-pointer relative px-4 py-2 text-sm font-medium transition-colors"
        >
          {activeCategory === category.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${activeCategory === category.value ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {category.label}
          </span>
        </button>
      ))}
    </div>
  );
}
