import { RSVPStatus } from '~/generated/prisma/browser';

export const statusConfig: Record<RSVPStatus, { label: string; className: string }> = {
  CONFIRMED: {
    label: 'Hanya Konfirmasi',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  ATTENDED: {
    label: 'Hadir',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  PENDING: {
    label: 'Menunggu',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  NOTAVAILABLE: {
    label: 'Tidak Hadir',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  DECLINED: {
    label: 'Menolak Hadir',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  REPRESENTED: {
    label: 'Diwakilkan',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
};
