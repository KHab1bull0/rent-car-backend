/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_userId_key" ON "RefreshTokens"("userId");
