/*
  Warnings:

  - You are about to alter the column `rating` on the `StoreService` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "StoreService" ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "rating" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "from" DROP NOT NULL,
ALTER COLUMN "to" DROP NOT NULL;
