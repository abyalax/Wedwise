'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, Crown, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useGetPricing } from '~/app/pricing/_hooks/use-get-pricing';
import { useGetThemes } from '~/app/themes/_hooks/use-get-themes';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';

type Props = {
  slug: string;
};

export const PageOrder: FC<Props> = ({ slug }) => {
  const { data: themes } = useGetThemes();
  const { data: pricingPlans } = useGetPricing();

  const theme = themes?.find((t) => t.slug === slug);

  if (!theme) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Tema tidak ditemukan</h1>
          <p className="mt-2 text-muted-foreground">Tema yang Anda cari tidak tersedia.</p>
          <Button asChild className="mt-6">
            <Link href="/themes">Kembali ke Tema</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/themes">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Tema
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Theme Preview */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <Image src={theme.image} alt={theme.name} className="aspect-[3/4] w-full object-cover" />
              {theme.isPremium && (
                <div className="absolute left-4 top-4">
                  <Badge className="gap-1 bg-romantic border-0 text-primary-foreground shadow-lg">
                    <Crown className="h-3 w-3" />
                    Premium
                  </Badge>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">{theme.name}</h2>
              <p className="mt-2 text-muted-foreground">{theme.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {theme.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Form Pemesanan
                </CardTitle>
                <CardDescription>Lengkapi data berikut untuk memesan undangan digital</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="groomName">Nama Mempelai Pria</Label>
                    <Input id="groomName" placeholder="Masukkan nama" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brideName">Nama Mempelai Wanita</Label>
                    <Input id="brideName" placeholder="Masukkan nama" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor WhatsApp</Label>
                  <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Tanggal Acara</Label>
                  <Input id="eventDate" type="date" />
                </div>
              </CardContent>
            </Card>

            {/* Pricing Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Pilih Paket</CardTitle>
                <CardDescription>Pilih paket yang sesuai dengan kebutuhan Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricingPlans?.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary ${
                      plan.isPopular ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    {plan.isPopular && <Badge className="absolute -top-2.5 right-4 bg-primary text-primary-foreground">Populer</Badge>}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{plan.name}</h4>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-primary">{plan.price}</span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <ul className="space-y-1">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button size="lg" className="w-full gap-2 bg-romantic text-primary-foreground shadow-lg hover:opacity-90">
              <ShoppingCart className="h-5 w-5" />
              Pesan Sekarang
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 WedWise. All rights reserved.</p>
      </footer>
    </div>
  );
};
