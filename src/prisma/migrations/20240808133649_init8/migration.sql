/*
  Warnings:

  - You are about to drop the column `userId` on the `Otps` table. All the data in the column will be lost.
  - Added the required column `email` to the `Otps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Otps" DROP CONSTRAINT "Otps_userId_fkey";

-- AlterTable
ALTER TABLE "Otps" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;
