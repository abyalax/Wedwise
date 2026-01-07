'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGetThemes } from '../_hooks/use-get-themes';
import { ThemeCategory } from '../_types';
import { ThemeFilters } from './theme-filters';
import { ThemeGrid } from './theme-grid';

export const PageThemes = () => {
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('all');

  const { data: themes } = useGetThemes();

  const filteredThemes = useMemo(() => {
    if (activeCategory === 'all') return themes;
    return themes?.filter((theme) => theme.category === activeCategory);
  }, [activeCategory, themes]);
  return (
    <div className="min-h-screen bg-gradient-soft">
      <main className="p-12">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Template Selection</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Discover Themes
            <span className="block bg-rose-gold bg-clip-text text-transparent">Your Dream Wedding Invitation</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A collection of elegant and modern digital wedding invitation templates. Tailor them to your wedding style.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10">
          <ThemeFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </motion.div>

        {/* Results Count */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 text-sm text-muted-foreground">
          Menampilkan {filteredThemes?.length} tema
        </motion.p>

        {/* Theme Grid */}
        <ThemeGrid themes={filteredThemes ?? []} />
      </main>
    </div>
  );
};
