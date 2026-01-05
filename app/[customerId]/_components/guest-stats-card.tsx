import { Check, Clock, UserCheck, Users, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Guest } from '../guests/_types';

interface GuestStatsCardProps {
  guests: Guest[];
}

export function GuestStatsCard({ guests }: GuestStatsCardProps) {
  const confirmed = guests.filter((g) => g.rsvpStatus === 'confirmed');
  const pending = guests.filter((g) => g.rsvpStatus === 'pending');
  const declined = guests.filter((g) => g.rsvpStatus === 'declined');

  const totalAttendees = confirmed.reduce((acc, g) => acc + g.numberOfGuests, 0);

  const stats = [
    {
      label: 'Total Tamu',
      value: guests.length,
      icon: Users,
      color: 'text-foreground',
      bgColor: 'bg-muted',
    },
    {
      label: 'Hadir',
      value: confirmed.length,
      subValue: `(${totalAttendees} orang)`,
      icon: Check,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'Menunggu',
      value: pending.length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      label: 'Tidak Hadir',
      value: declined.length,
      icon: X,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserCheck className="h-5 w-5 text-primary" />
          Statistik Tamu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-lg ${stat.bgColor} p-3 text-center`}>
              <stat.icon className={`mx-auto h-5 w-5 ${stat.color}`} />
              <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              {stat.subValue && <p className="text-xs text-muted-foreground">{stat.subValue}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
