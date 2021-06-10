/*
  Warnings:

  - A unique constraint covering the columns `[charity_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Charity');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "charity_id" TEXT,
ADD COLUMN     "user_role" "UserRole" NOT NULL DEFAULT E'User';

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_charity_id_unique" ON "users"("charity_id");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
