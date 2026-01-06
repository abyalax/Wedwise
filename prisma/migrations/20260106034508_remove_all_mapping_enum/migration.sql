/*
  Warnings:

  - The values [Draft,In Progress,Waiting Payment,Paid,Cancelled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending,Success,Failed,Expired] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Confirmed,Attended,Represented,Declined,Pending,Not Available] on the enum `RSVPStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Active,In Active] on the enum `StatusActivation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('DRAFT', 'INPROGRESS', 'WAITINGPAYMENT', 'PAID', 'CANCELLED');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED');
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RSVPStatus_new" AS ENUM ('CONFIRMED', 'ATTENDED', 'REPRESENTED', 'DECLINED', 'PENDING', 'NOTAVAILABLE');
ALTER TABLE "guests" ALTER COLUMN "rsvpStatus" TYPE "RSVPStatus_new" USING ("rsvpStatus"::text::"RSVPStatus_new");
ALTER TYPE "RSVPStatus" RENAME TO "RSVPStatus_old";
ALTER TYPE "RSVPStatus_new" RENAME TO "RSVPStatus";
DROP TYPE "public"."RSVPStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StatusActivation_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "public"."customers" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "customers" ALTER COLUMN "status" TYPE "StatusActivation_new" USING ("status"::text::"StatusActivation_new");
ALTER TABLE "features" ALTER COLUMN "status" TYPE "StatusActivation_new" USING ("status"::text::"StatusActivation_new");
ALTER TABLE "packages" ALTER COLUMN "status" TYPE "StatusActivation_new" USING ("status"::text::"StatusActivation_new");
ALTER TABLE "themes" ALTER COLUMN "status" TYPE "StatusActivation_new" USING ("status"::text::"StatusActivation_new");
ALTER TYPE "StatusActivation" RENAME TO "StatusActivation_old";
ALTER TYPE "StatusActivation_new" RENAME TO "StatusActivation";
DROP TYPE "public"."StatusActivation_old";
ALTER TABLE "customers" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
