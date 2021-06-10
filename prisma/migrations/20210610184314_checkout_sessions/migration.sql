/*
  Warnings:

  - You are about to drop the column `categoryId` on the `charities` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `charities` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `charityId` on the `featured_links` table. All the data in the column will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_id` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `charity_id` to the `featured_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_countryId_fkey";

-- DropForeignKey
ALTER TABLE "charities" DROP CONSTRAINT "charities_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "charities" DROP CONSTRAINT "charities_cityId_fkey";

-- DropForeignKey
ALTER TABLE "featured_links" DROP CONSTRAINT "featured_links_charityId_fkey";

-- AlterTable
ALTER TABLE "charities" DROP COLUMN "categoryId",
DROP COLUMN "cityId",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "city_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cities" DROP COLUMN "countryId",
ADD COLUMN     "country_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "featured_links" DROP COLUMN "charityId",
ADD COLUMN     "charity_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Transaction";

-- CreateTable
CREATE TABLE "checkout_sessions" (
    "session_id" TEXT NOT NULL,
    "user_id" INTEGER,
    "charity_id" TEXT NOT NULL,
    "donationId" INTEGER,
    "amount" DECIMAL(65,30) NOT NULL,
    "donation_frequency" "DonationFrequency" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripe_customer_id" TEXT,

    PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_donationId_unique" ON "checkout_sessions"("donationId");

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD FOREIGN KEY ("donationId") REFERENCES "donations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charities" ADD FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charities" ADD FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_links" ADD FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
