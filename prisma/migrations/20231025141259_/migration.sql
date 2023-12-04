/*
  Warnings:

  - You are about to drop the `Gateway` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gateway" DROP CONSTRAINT "Gateway_siteId_fkey";

-- DropForeignKey
ALTER TABLE "devicesOwon" DROP CONSTRAINT "devicesOwon_gateway_ieee_fkey";

-- DropTable
DROP TABLE "Gateway";

-- CreateTable
CREATE TABLE "gateway" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "siteId" TEXT,

    CONSTRAINT "gateway_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gateway_id_key" ON "gateway"("id");

-- AddForeignKey
ALTER TABLE "devicesOwon" ADD CONSTRAINT "devicesOwon_gateway_ieee_fkey" FOREIGN KEY ("gateway_ieee") REFERENCES "gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway" ADD CONSTRAINT "gateway_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
