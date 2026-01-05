import { motion } from 'framer-motion';
import { Bot, CheckCircle, Clock, Crown, Heart, Image, LucideIcon, Mail, MessageCircle, Music } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent } from '~/components/ui/card';
import { Feature } from '../_types';

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Clock,
  Music,
  Image,
  Heart,
  CheckCircle,
  Bot,
  MessageCircle,
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] || Mail;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
      <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-card-hover">
        {feature.isPremium && (
          <div className="absolute right-3 top-3">
            <Badge className="gap-1 bg-rose-gold border-0 text-primary-foreground shadow-lg">
              <Crown className="h-3 w-3" />
              Premium
            </Badge>
          </div>
        )}
        <CardContent className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-card-foreground">{feature.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
