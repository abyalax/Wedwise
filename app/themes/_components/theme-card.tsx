import { motion } from 'framer-motion';
import { Crown, Eye, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Theme } from '../_types';

interface ThemeCardProps {
  theme: Theme;
  index: number;
}

export function ThemeCard({ theme, index }: ThemeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image src={theme.image} alt={theme.name} fill />

        {/* Premium Badge */}
        {theme.isPremium && (
          <div className="absolute left-3 top-3">
            <Badge className="gap-1 bg-romantic border-0 text-primary-foreground shadow-lg">
              <Crown className="h-3 w-3" />
              Premium
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Button variant="secondary" className="gap-2 shadow-float">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-card-foreground">{theme.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{theme.description}</p>

        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {theme.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs font-normal">
              {feature}
            </Badge>
          ))}
          {theme.features.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{theme.features.length - 3}
            </Badge>
          )}
        </div>

        {/* Order Button */}
        <Button asChild className="mt-4 w-full gap-2 bg-rose-gold text-primary-foreground hover:opacity-90">
          <Link href={`/order/${theme.slug}`}>
            <ShoppingCart className="h-4 w-4" />
            Pesan Sekarang
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
