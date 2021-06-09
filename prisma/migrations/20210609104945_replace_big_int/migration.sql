/*
  Warnings:

  - Added the required column `category` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagline` to the `charities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `charities` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CharityScope" AS ENUM ('Regional', 'National', 'International');

-- AlterTable
ALTER TABLE "charities" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "links" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "scope" "CharityScope" NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "tagline" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT NOT NULL;
