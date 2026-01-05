import { AnimatePresence, motion } from 'framer-motion';
import { Theme } from '../_types';
import { ThemeCard } from './theme-card';

interface ThemeGridProps {
  themes: Theme[];
}

export function ThemeGrid({ themes }: ThemeGridProps) {
  return (
    <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {themes.map((theme, index) => (
          <ThemeCard key={theme.slug} theme={theme} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
