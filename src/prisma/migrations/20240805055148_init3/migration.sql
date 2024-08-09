/*
  Warnings:

  - You are about to drop the column `email` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Otps` table. All the data in the column will be lost.
  - Added the required column `otp` to the `Otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "email",
DROP COLUMN "message";

-- AlterTable
ALTER TABLE "Otps" DROP COLUMN "code",
ADD COLUMN     "otp" TEXT NOT NULL;
