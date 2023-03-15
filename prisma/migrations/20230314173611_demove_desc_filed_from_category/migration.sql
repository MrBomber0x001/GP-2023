/*
  Warnings:

  - You are about to drop the column `desc` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Sub_Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "desc";

-- AlterTable
ALTER TABLE "Sub_Category" DROP COLUMN "desc";
