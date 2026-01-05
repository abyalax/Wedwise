'use client';

import { ArrowRight, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { useGetGuests } from '../guests/_hooks/use-get-guests';
import { useGetOrder } from '../orders/_hooks/use-get-order';
import { GuestStatsCard } from './guest-stats-card';
import { OrderSummaryCard } from './order-summary-card';

export default function DashboardPage() {
  const customerId = '1'; // In real app, get from auth

  const { data: order, isLoading: orderLoading } = useGetOrder();
  const { data: guests = [], isLoading: guestsLoading } = useGetGuests();

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-romantic p-6 text-primary-foreground">
        <h2 className="font-serif text-2xl font-semibold">Welcome! 👋</h2>
        <p className="mt-1 opacity-90">Manage your digital invitations and guest list easily.</p>
      </div>

      {/* Order & Stats Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Summary */}
        {orderLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ) : order ? (
          <OrderSummaryCard order={order} />
        ) : null}

        {/* Guest Stats */}
        {guestsLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <GuestStatsCard guests={guests} />
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link href={`/${customerId}/guests`}>
                <Users className="h-6 w-6 text-primary" />
                <span>Kelola Tamu</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link href={`/${customerId}/invitations`}>
                <ExternalLink className="h-6 w-6 text-primary" />
                <span>Lihat Undangan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
