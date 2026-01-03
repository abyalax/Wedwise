import { z } from 'zod';
import { GuestStatus } from '~/generated/prisma/enums';

export const guestSchema = z.object({
  name: z.string().min(1, { message: 'Guest name is required' }),
  phone: z.string().min(1, { message: 'Guest phone is required' }).max(15, { message: 'Guest phone is too long' }),
  participant: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().min(1, { message: 'Participant must be at least 1' }))
    .transform((val) => val.toString()),
  note: z.string().max(255, { message: 'Guest note is too long' }),
  invitationId: z.number().min(1, { message: 'Guest invitation is required' }),
  status: z.enum(['Invited', 'Attending', 'NotAttending', 'Declined', 'Maybe'] as GuestStatus[]),
});

export type FormDataGuest = z.output<typeof guestSchema>;
