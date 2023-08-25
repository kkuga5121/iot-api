/*
  Warnings:

  - You are about to drop the column `dp_Id` on the `log_devices` table. All the data in the column will be lost.
  - The primary key for the `product_properties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[code]` on the table `catagories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dp_id` to the `log_devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStamp` to the `log_devices` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `product_properties` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "log_devices" DROP CONSTRAINT "log_devices_dp_Id_fkey";

-- AlterTable
ALTER TABLE "log_devices" DROP COLUMN "dp_Id",
ADD COLUMN     "dp_id" TEXT NOT NULL,
ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_properties" DROP CONSTRAINT "product_properties_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "product_properties_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "catagories_code_key" ON "catagories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");
