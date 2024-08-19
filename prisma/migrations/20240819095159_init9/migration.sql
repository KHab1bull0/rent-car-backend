-- CreateTable
CREATE TABLE "Users2" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'inactive',

    CONSTRAINT "Users2_pkey" PRIMARY KEY ("id")
);
