/*
  Warnings:

  - You are about to drop the column `category` on the `charities` table. All the data in the column will be lost.
  - You are about to drop the column `links` on the `charities` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `charities` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `charities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charities" DROP COLUMN "category",
DROP COLUMN "links",
DROP COLUMN "location",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "cityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_links" (
    "id" SERIAL NOT NULL,
    "charityId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "featured_links" ADD FOREIGN KEY ("charityId") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charities" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charities" ADD FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
