/*
  Warnings:

  - Added the required column `brideName` to the `invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contents` to the `invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groomName` to the `invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeCode` to the `invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invitations" ADD COLUMN     "brideName" TEXT NOT NULL,
ADD COLUMN     "contents" JSONB NOT NULL,
ADD COLUMN     "groomName" TEXT NOT NULL,
ADD COLUMN     "themeCode" TEXT NOT NULL;
