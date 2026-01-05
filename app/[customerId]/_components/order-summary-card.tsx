import dayjs from 'dayjs';
import { Calendar, Crown, Package } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Order } from '../orders/_types';

interface OrderSummaryCardProps {
  order: Order;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const statusLabels = {
  pending: 'Menunggu',
  processing: 'Diproses',
  completed: 'Selesai',
};

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-primary" />
              Detail Pesanan
            </CardTitle>
            <CardDescription>#{order.id}</CardDescription>
          </div>
          <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme Preview */}
        <div className="flex gap-4">
          <Image src={order.themeImage} alt={order.themeName} width={64} height={80} className="h-20 w-16 rounded-lg object-cover shadow-sm" />
          <div className="flex-1">
            <p className="font-medium text-foreground">{order.themeName}</p>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Crown className="h-3.5 w-3.5 text-primary" />
              Paket {order.packageName}
            </div>
          </div>
        </div>

        {/* Couple Names */}
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-center font-serif text-lg font-medium text-foreground">
            {order.groomName} & {order.brideName}
          </p>
        </div>

        {/* Event Date */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Tanggal Acara:</span>
          <span className="font-medium text-foreground">{dayjs(new Date(order.eventDate)).format('EEEE, d MMMM yyyy')}</span>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm text-muted-foreground">Total Pembayaran</span>
          <span className="text-lg font-semibold text-primary">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </CardContent>
    </Card>
  );
}
