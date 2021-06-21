/*
  Warnings:

  - You are about to drop the column `amount` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `charity_id` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `donationId` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `donation_frequency` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `checkout_sessions` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[payment_intent_id]` on the table `donations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payment_intent_id]` on the table `checkout_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscription_id]` on the table `checkout_sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_intent_id` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_customer_id` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "charities" DROP CONSTRAINT "charities_category_id_fkey";

-- DropForeignKey
ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_charity_id_fkey";

-- DropForeignKey
ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_donationId_fkey";

-- DropForeignKey
ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_country_id_fkey";

-- DropIndex
DROP INDEX "checkout_sessions_donationId_unique";

-- AlterTable
ALTER TABLE "checkout_sessions" DROP COLUMN "amount",
DROP COLUMN "charity_id",
DROP COLUMN "completed",
DROP COLUMN "donationId",
DROP COLUMN "donation_frequency",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "user_id",
ADD COLUMN     "payment_intent_id" TEXT,
ADD COLUMN     "subscription_id" TEXT;

-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payment_intent_id" TEXT NOT NULL,
ADD COLUMN     "stripe_customer_id" TEXT NOT NULL,
ADD COLUMN     "subscription_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_customer_id" TEXT;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Country";

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "subscription_id" TEXT NOT NULL,
    "frequency" "DonationFrequency" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "charity_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("subscription_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donations.payment_intent_id_unique" ON "donations"("payment_intent_id");

-- CreateIndex
CREATE UNIQUE INDEX "countries.name_unique" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_payment_intent_id_unique" ON "checkout_sessions"("payment_intent_id");

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_subscription_id_unique" ON "checkout_sessions"("subscription_id");

-- AddForeignKey
ALTER TABLE "charities" ADD FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("subscription_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD FOREIGN KEY ("payment_intent_id") REFERENCES "donations"("payment_intent_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("subscription_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
