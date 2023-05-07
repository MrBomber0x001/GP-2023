/*
  Warnings:

  - You are about to drop the column `location` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `ShopService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `ContractorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ContractorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experiance` to the `ContractorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ContractorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `LaborService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableDays` to the `LaborService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `LaborService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `LaborService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShopService" DROP CONSTRAINT "ShopService_serviceId_fkey";

-- AlterTable
ALTER TABLE "ContractorService" ADD COLUMN     "city" VARCHAR(150) NOT NULL,
ADD COLUMN     "email" VARCHAR(150) NOT NULL,
ADD COLUMN     "experiance" VARCHAR(150) NOT NULL,
ADD COLUMN     "from" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numOfHours" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phone" VARCHAR(150) NOT NULL,
ADD COLUMN     "rateCost" INTEGER DEFAULT 0,
ADD COLUMN     "rateTimeRange" INTEGER DEFAULT 0,
ADD COLUMN     "to" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "LaborService" ADD COLUMN     "area" VARCHAR(150) NOT NULL,
ADD COLUMN     "availableDays" VARCHAR(500) NOT NULL,
ADD COLUMN     "city" VARCHAR(150) NOT NULL,
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "phone" VARCHAR(150) NOT NULL,
ADD COLUMN     "timeRange" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "location",
DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "ShopService";

-- CreateTable
CREATE TABLE "StoreService" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(150),
    "rating" DOUBLE PRECISION DEFAULT 0,
    "websitePage" VARCHAR(150),
    "city" VARCHAR(150) NOT NULL,
    "area" VARCHAR(150) NOT NULL,
    "street" VARCHAR(150),
    "locLat" VARCHAR(50),
    "locLng" VARCHAR(50),
    "availableDays" VARCHAR(500) NOT NULL,
    "from" INTEGER NOT NULL DEFAULT 0,
    "to" INTEGER NOT NULL DEFAULT 0,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "StoreService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyService" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "image" VARCHAR(150) NOT NULL,
    "isNegotiable" BOOLEAN NOT NULL DEFAULT false,
    "sellerCity" VARCHAR(150) NOT NULL,
    "sellerArea" VARCHAR(150) NOT NULL,
    "sellerStreet" VARCHAR(150),
    "locLat" VARCHAR(50),
    "locLng" VARCHAR(50),
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "PropertyService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoreService" ADD CONSTRAINT "StoreService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyService" ADD CONSTRAINT "PropertyService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
