import { PropsWithChildren } from 'react';
import { FaAddressCard } from 'react-icons/fa';
import { SidebarProvider } from '~/components/ui/sidebar';
import { AppFooter } from '../_components/ui/app-footer';
import { AppSidebar } from '../_components/ui/app-sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar appName="Wedwise" appDescription="Admin Panel" appLogo={<FaAddressCard />} />
      <main style={{ width: '100%' }}>
        {children}
        <AppFooter />
      </main>
    </SidebarProvider>
  );
}
