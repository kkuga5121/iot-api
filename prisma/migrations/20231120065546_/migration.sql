/*
  Warnings:

  - You are about to drop the column `powergen_id` on the `rcfsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rcfsite" DROP COLUMN "powergen_id",
ADD COLUMN     "powerats_id" TEXT;

-- AddForeignKey
ALTER TABLE "rcfsite" ADD CONSTRAINT "rcfsite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
