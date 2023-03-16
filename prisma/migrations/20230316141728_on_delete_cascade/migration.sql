-- DropForeignKey
ALTER TABLE "ContractorService" DROP CONSTRAINT "ContractorService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "LaborService" DROP CONSTRAINT "LaborService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_catId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_subCatId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShopService" DROP CONSTRAINT "ShopService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Sub_Category" DROP CONSTRAINT "Sub_Category_catId_fkey";

-- AddForeignKey
ALTER TABLE "Sub_Category" ADD CONSTRAINT "Sub_Category_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_subCatId_fkey" FOREIGN KEY ("subCatId") REFERENCES "Sub_Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopService" ADD CONSTRAINT "ShopService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorService" ADD CONSTRAINT "ContractorService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaborService" ADD CONSTRAINT "LaborService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
