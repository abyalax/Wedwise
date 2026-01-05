import { ReactNode } from 'react';
import { Footer } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';
import { navigationGuest } from '../navigation';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navigation={navigationGuest} />
      {children}
      <Footer />
    </div>
  );
}
