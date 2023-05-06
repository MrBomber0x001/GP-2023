/*
  Warnings:

  - You are about to drop the column `experiance` on the `ContractorService` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `ContractorService` table. All the data in the column will be lost.
  - You are about to drop the column `numOfHours` on the `ContractorService` table. All the data in the column will be lost.
  - You are about to drop the column `rateCost` on the `ContractorService` table. All the data in the column will be lost.
  - You are about to drop the column `rateTimeRange` on the `ContractorService` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `ContractorService` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `LaborService` table. All the data in the column will be lost.
  - You are about to drop the column `timeRange` on the `LaborService` table. All the data in the column will be lost.
  - The `rating` column on the `StoreService` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `availableDays` on the `StoreService` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(250)`.
  - Added the required column `availabilityRange` to the `ContractorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateRange` to the `ContractorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateRange` to the `LaborService` table without a default value. This is not possible if the table is not empty.
  - Made the column `locLat` on table `StoreService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locLng` on table `StoreService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `from` on table `StoreService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `to` on table `StoreService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContractorService" DROP COLUMN "experiance",
DROP COLUMN "from",
DROP COLUMN "numOfHours",
DROP COLUMN "rateCost",
DROP COLUMN "rateTimeRange",
DROP COLUMN "to",
ADD COLUMN     "availabilityHours" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "availabilityRange" VARCHAR(150) NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rateRange" VARCHAR(150) NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LaborService" DROP COLUMN "cost",
DROP COLUMN "timeRange",
ADD COLUMN     "rate" INTEGER DEFAULT 0,
ADD COLUMN     "rateRange" VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE "PropertyService" ALTER COLUMN "isNegotiable" SET DEFAULT true;

-- AlterTable
ALTER TABLE "StoreService" DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL,
ALTER COLUMN "locLat" SET NOT NULL,
ALTER COLUMN "locLng" SET NOT NULL,
ALTER COLUMN "availableDays" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "from" SET NOT NULL,
ALTER COLUMN "from" SET DEFAULT 8,
ALTER COLUMN "to" SET NOT NULL,
ALTER COLUMN "to" SET DEFAULT 10;
