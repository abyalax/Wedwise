import z from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, { message: 'Customer name is required' }),
  email: z.string().min(1, { message: 'Customer email is required' }),
  phone: z.string().min(1, { message: 'Customer phone is required' }).max(15, { message: 'Customer phone is too long' }),
  password: z.string().min(1, { message: 'Customer password is required' }),
});

export type FormDataCustomer = z.infer<typeof customerSchema>;
