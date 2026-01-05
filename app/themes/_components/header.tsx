import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={'/'} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">WedWise</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/themes" className="text-sm font-medium text-foreground">
            Tema
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Harga
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Masuk
          </Button>
          <Button size="sm">Mulai Sekarang</Button>
        </div>
      </div>
    </header>
  );
}
