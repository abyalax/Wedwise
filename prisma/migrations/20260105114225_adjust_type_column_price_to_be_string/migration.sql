-- AlterTable
ALTER TABLE "order_items" ALTER COLUMN "featurePrice" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "totalPrice" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE TEXT;
