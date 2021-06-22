/*
  Warnings:

  - The `subscription_id` column on the `checkout_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subscription_id` column on the `donations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[subscription_id]` on the table `checkout_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscription_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_subscription_id_fkey";

-- AlterTable
ALTER TABLE "checkout_sessions" DROP COLUMN "subscription_id",
ADD COLUMN     "subscription_id" INTEGER;

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "subscription_id",
ADD COLUMN     "subscription_id" INTEGER;

-- AlterTable
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "subscription_id" DROP NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_subscription_id_unique" ON "checkout_sessions"("subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions.subscription_id_unique" ON "subscriptions"("subscription_id");

-- AddForeignKey
ALTER TABLE "donations" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
