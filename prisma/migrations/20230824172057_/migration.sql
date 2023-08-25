/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_properties" DROP CONSTRAINT "product_properties_productId_fkey";

-- DropIndex
DROP INDEX "products_id_key";

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
DROP COLUMN "id",
DROP COLUMN "product",
ADD COLUMN     "product_custom_name" TEXT,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_product_id_key" ON "products"("product_id");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_properties" ADD CONSTRAINT "product_properties_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;
