import { Prisma } from '~/generated/prisma/client';
import { prisma } from '../prisma/client';

export async function paymentSeeder() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "payments"
    RESTART IDENTITY CASCADE;
  `);

  const payments: Prisma.PaymentCreateManyInput[] = [
    {
      orderId: 1,
      provider: 'SHOPEE',
      method: 'Credit Card',
      amount: '100.00',
      status: 'Pending',
      payload: JSON.stringify({
        transaction_id: 'bca-123456',
        order_id: 'ORDER-2024-0001',
        gross_amount: 1500000,
        payment_type: 'bank_transfer',
        bank: 'bca',
        va_number: '1234567890',
        transaction_status: 'pending',
        expiry_time: '2024-02-20T10:00:00Z',
      }),
    },
  ];

  await prisma.payment.createMany({
    data: payments,
  });
  console.log('✅ Seeding payments success');
}
