/*
  Warnings:

  - You are about to drop the column `basePrice` on the `features` table. All the data in the column will be lost.
  - Added the required column `price` to the `features` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "features" DROP COLUMN "basePrice",
ADD COLUMN     "price" TEXT NOT NULL;
