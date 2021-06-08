-- CreateEnum
CREATE TYPE "DonationFrequency" AS ENUM ('Single', 'Monthly', 'Annually');

-- CreateTable
CREATE TABLE "donations" (
    "id" SERIAL NOT NULL,
    "frequency" "DonationFrequency" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "charity_id" TEXT NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "donations" ADD FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
