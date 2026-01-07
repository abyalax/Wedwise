import z from 'zod';
import { RSVPStatus } from '~/generated/prisma/enums';

export const guestSchema = z.object({
  name: z.string().min(3, { message: 'Please enter your name, at least 3 characters' }),
  phone: z.string().min(10).max(15),
  participant: z
    .any()
    .transform(Number)
    .refine((v) => v > 0, { error: 'Participant must be at least 1' }),
  email: z.email().optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
  rsvpStatus: z.enum(['CONFIRMED', 'PENDING', 'CANCELLED', 'ATTENDED', 'NOTAVAILABLE', 'REPRESENTED'] as RSVPStatus[]),
});

export type FormDataGuest = z.infer<typeof guestSchema>;
