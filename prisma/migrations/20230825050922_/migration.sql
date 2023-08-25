/*
  Warnings:

  - A unique constraint covering the columns `[productId,dp_id]` on the table `product_properties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_properties_productId_dp_id_key" ON "product_properties"("productId", "dp_id");
