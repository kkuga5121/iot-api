/*
  Warnings:

  - You are about to drop the column `rcfId` on the `line_RCF` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "line_RCF" DROP CONSTRAINT "line_RCF_rcfId_fkey";

-- AlterTable
ALTER TABLE "line_RCF" DROP COLUMN "rcfId";

-- CreateTable
CREATE TABLE "_RCFSiteTolineRCF" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RCFSiteTolineRCF_AB_unique" ON "_RCFSiteTolineRCF"("A", "B");

-- CreateIndex
CREATE INDEX "_RCFSiteTolineRCF_B_index" ON "_RCFSiteTolineRCF"("B");

-- AddForeignKey
ALTER TABLE "_RCFSiteTolineRCF" ADD CONSTRAINT "_RCFSiteTolineRCF_A_fkey" FOREIGN KEY ("A") REFERENCES "rcfsite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RCFSiteTolineRCF" ADD CONSTRAINT "_RCFSiteTolineRCF_B_fkey" FOREIGN KEY ("B") REFERENCES "line_RCF"("id") ON DELETE CASCADE ON UPDATE CASCADE;
